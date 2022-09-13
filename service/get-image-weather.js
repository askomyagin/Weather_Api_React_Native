export const getImageWeather = (code, isDay) => {
    const Sunny = [1000, 1003];
    const SunnyRain = [1063, 1180, 1186, 1192, 1240, 1243, 1246];
    const Clouds = [1006, 1009, 1072, 1114, 1168, 1198, 1213];
    const Fog = [1030, 1135, 1147];
    const Rain = [
        1150, 1153, 1183, 1189, 1195, 1171, 1201, 1243, 1246, 1249, 1252, 1261,
        1264,
    ];
    const Thunderstorm = [1087, 1273, 1276, 1279, 1282, 1237];
    const Snow = [
        1066, 1069, 1117, 1204, 1207, 1210, 1216, 1219, 1222, 1225, 1255, 1258,
    ];

    if (isDay) {
        if (Sunny.find((el) => el === code) !== undefined) {
            return require('../assets/sunny-day.jpg');
        }
        if (SunnyRain.find((el) => el === code) !== undefined) {
            return require('../assets/sunny-rain.jpg');
        }
        if (Clouds.find((el) => el === code) !== undefined) {
            return require('../assets/clouds-weather.jpg');
        }
        if (Fog.find((el) => el === code) !== undefined) {
            return require('../assets/fog.png');
        }
        if (Rain.find((el) => el === code) !== undefined) {
            return require('../assets/rain.jpeg');
        }
        if (Thunderstorm.find((el) => el === code) !== undefined) {
            return require('../assets/thunderstorm.jpg');
        }
        if (Snow.find((el) => el === code) !== undefined) {
            return require('../assets/snow.jpg');
        }
    } else {
        return require('../assets/night.jpg');
    }
};
