import { ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ForecastItem from './forecast-item';
import WeatherService from '../service/weather-service';
import LoadingSpinner from './loading-spinner';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { getCurrentDay } = new WeatherService();

const Forecast = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCurrentDay()
            .then((data) => {
                setItems(data.reverse());
            })
            .catch((err) => {
                setError(`Data could not be retrieved.`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (error)
        return (
            <ErrorContainer>
                <Icon name="error-outline" size={50} color={'red'} />
                <TextError>Error</TextError>
                <ErrorDescription>{error}</ErrorDescription>
            </ErrorContainer>
        );
    if (loading) return <LoadingSpinner />;

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {items.map((el) => (
                <ForecastItem key={el.time} item={el} />
            ))}
        </ScrollView>
    );
};

const ErrorContainer = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;
const TextError = styled.Text`
    font-size: 18px;
    font-weight: 700;
    text-align: center;
`;

const ErrorDescription = styled.Text`
    font-size: 16px;
    margin: 15px;
    text-align: center;
`;

export default Forecast;
