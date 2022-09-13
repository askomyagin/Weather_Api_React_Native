import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_KEY, REACT_APP_API_BASE } from '@env';

export default class WeatherService {
    constructor() {
        this.cityNameFromStorage = 'bogorodsk-nizhegorod-russia';
        this._apiKey = REACT_APP_API_KEY;
        this._apiBase = REACT_APP_API_BASE;
    }

    getCityFromStorage = async () => {
        await AsyncStorage.getItem('cityStorage').then((el) => {
            if (el !== null) {
                this.cityNameFromStorage = el;
            }
        });
    };

    getCurrent = async () => {
        await this.getCityFromStorage();

        const url = new URL('v1/current.json', this._apiBase);
        url.searchParams.append('key', this._apiKey);
        url.searchParams.append('q', this.cityNameFromStorage);

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
        }
        const data = await res.json();
        return this._transformWeather(data);
    };

    getCurrentDay = async () => {
        await this.getCityFromStorage();
        var time = new Date().getHours();
        var dayIsNow = new Date().getDate();
        const countPage = parseInt(time) + 12 >= 24 ? 2 : 1;

        const url = new URL('v1/forecast.json', this._apiBase);
        url.searchParams.append('key', this._apiKey);
        url.searchParams.append('q', this.cityNameFromStorage);
        url.searchParams.append('days', countPage);

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
        }
        const data = await res.json();
        return this._transformWeatherDay(data, time, dayIsNow);
    };

    getSearchCity = async (city) => {
        if (city === '') {
            return [];
        }
        const url = new URL('v1/search.json', this._apiBase);
        url.searchParams.append('key', this._apiKey);
        url.searchParams.append('q', city);

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
        }
        const data = await res.json();
        return this._transformSearchCity(data);
    };

    _transformSearchCity = (res) => {
        const result = [];
        var object = {};
        var count = 100;
        res.map((el) => {
            if (count > 0) {
                object.country = el.country;
                object.region = el.region;
                object.name = el.name;
                object.url = el.url;
                result.push(object);
                object = {};
                count -= 1;
            }
        });
        return result;
    };

    _transformWeather = (res) => {
        return {
            cloudcover: res.current.cloud,
            humidity: res.current.humidity,
            temperature: res.current.temp_c,
            visibility: res.current.vis_km,
            uvIndex: res.current.uv,
            pressure: res.current.pressure_mb,
            feelslike: res.current.feelslike_c,
            windSpeed: res.current.wind_kph,
            isDay: res.current.is_day === 1 ? true : false,
            conditionText: res.current.condition.text,
            conditionImage: res.current.condition.icon,
            city: res.location.name,
            conditionCode: res.current.condition.code,
        };
    };
    _transformWeatherDay = (res, time, dayIsNow) => {
        var result = [];
        var object = {};
        var count = 12;
        res.forecast.forecastday.map((el) =>
            el.hour.map((elem) => {
                if (
                    dayIsNow === parseInt(elem.time.slice(8, -6)) &&
                    count > 0
                ) {
                    if (time < parseInt(elem.time.slice(11, -3))) {
                        count = count - 1;
                        object.time = elem.time;
                        object.temperature = elem.temp_c;
                        object.conditionImage = elem.condition.icon;
                        result[count] = object;
                    }
                } else {
                    if (count > 0) {
                        count = count - 1;
                        object.time = elem.time;
                        object.temperature = elem.temp_c;
                        object.conditionImage = elem.condition.icon;
                        result[count] = object;
                    }
                }
                object = {};
            })
        );
        return result;
    };
}
