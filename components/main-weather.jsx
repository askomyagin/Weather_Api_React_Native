import { Image } from 'react-native';
import styled from 'styled-components/native';

const getTemperature = (temperature) => {
    if (temperature > 0) {
        return `+${temperature}°`;
    }
    if (temperature < 0) {
        return `-${temperature}°`;
    }
    if (temperature == 0) {
        return `${temperature}°`;
    }
};

const MainWeather = ({
    feelslike,
    temperature,
    conditionText,
    conditionImage,
}) => {
    return (
        <Body>
            <MainWeatherInfo>
                <Temperature>
                    {getTemperature(Math.round(temperature))}
                </Temperature>
                <Image
                    source={{
                        uri: 'https:' + conditionImage,
                    }}
                    style={{ width: 80, height: 80, left: -5 }}
                />
            </MainWeatherInfo>
            <DecriptionWeather>{conditionText}</DecriptionWeather>
            <FeelsLike>
                Feels like: {getTemperature(Math.round(feelslike))}
            </FeelsLike>
        </Body>
    );
};

const Body = styled.View`
    width: 100%;
    height: 65%;
    justify-content: center;
    align-items: center;
`;
const MainWeatherInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Temperature = styled.Text`
    font-size: 45px;
    font-weight: 700;
    color: white;
`;

const DecriptionWeather = styled.Text`
    font-size: 20px;
    color: white;
`;

const FeelsLike = styled.Text`
    font-size: 15px;
    color: #c7c5c5;
    font-weight: 500;
`;
export default MainWeather;
