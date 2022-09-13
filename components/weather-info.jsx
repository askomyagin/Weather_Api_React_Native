import { Dimensions } from 'react-native';
import { useState } from 'react';
import styled from 'styled-components/native';
import Header from './header';
import MainWeather from './main-weather';
import DescriptionWeatherItem from './description-weather-item';
import Forecast from './forecast';
import ChoosingCity from './choosing-city';
import { getImageWeather } from '../service/get-image-weather';

const WeatherInfo = ({ items, setCity }) => {
    const {
        cloudcover,
        humidity,
        temperature,
        visibility,
        uvIndex,
        pressure,
        feelslike,
        windSpeed,
        isDay,
        conditionText,
        conditionImage,
        city,
        conditionCode,
        time,
    } = items;
    const [chooseCity, setChooseCity] = useState(false);

    const WindowHeight = Dimensions.get('window').height;

    const weatherDesc = [
        {
            id: 1,
            value: `${cloudcover} %`,
            title: 'CLOUD COVER',
            icon: 'weather-cloudy',
        },
        {
            id: 2,
            value: `${windSpeed} km/h`,
            title: 'WIND SPEED',
            icon: 'windsock',
        },
        {
            id: 3,
            value: `${pressure} mb`,
            title: 'PRESSURE',
            icon: 'format-align-middle',
        },
        {
            id: 4,
            value: `${uvIndex} of 10`,
            title: 'UV INDEX',
            icon: 'solar-power',
        },
        {
            id: 5,
            value: `${visibility} %`,
            title: 'VISIBILITY',
            icon: 'eye-outline',
        },
        {
            id: 6,
            value: `${humidity} %`,
            title: 'HUMIDITY',
            icon: 'water-outline',
        },
    ];
    return (
        <WeatherContainer WindowHeight={WindowHeight}>
            <WeatherNowInfo>
                <BackgroundImage
                    source={getImageWeather(conditionCode, isDay)}
                />
                <Header
                    cityName={city}
                    setChooseCity={setChooseCity}
                    chooseCity={chooseCity}
                    isDay={isDay}
                />
                <MainWeather
                    feelslike={feelslike}
                    temperature={temperature}
                    conditionText={conditionText}
                    conditionImage={conditionImage}
                />
            </WeatherNowInfo>
            <MoreDescriptionWeather>
                {weatherDesc.map((el) => (
                    <DescriptionWeatherItem
                        key={el.id}
                        icon={el.icon}
                        value={el.value}
                        title={el.title}
                    />
                ))}
            </MoreDescriptionWeather>
            <ForecastContainer>
                <Forecast />
            </ForecastContainer>

            <ChoosingCity
                chooseCity={chooseCity}
                setChooseCity={setChooseCity}
                setCity={setCity}
            />
        </WeatherContainer>
    );
};

const WeatherContainer = styled.View`
    align-items: center;
    min-height: ${(props) => `${props.WindowHeight}px`};
`;

const WeatherNowInfo = styled.View({
    width: '100%',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    height: Dimensions.get('window').height * 0.45,
});

const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const MoreDescriptionWeather = styled.View`
    margin-top: 15px;
    width: 95%;
    justify-content: space-around;
    border-width: 1px;
    border-radius: 20px;
    border-color: ${(props) => props.theme.PRIMARY_BORDER_COLOR};
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const ForecastContainer = styled.View`
    width: 95%;
    height: 150px;
    border-width: 1px;
    border-radius: 20px;
    border-color: ${(props) => props.theme.PRIMARY_BORDER_COLOR};
    padding: 10px;
    margin-top: 15px;
    background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

export default WeatherInfo;
