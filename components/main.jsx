import { StatusBar, RefreshControl } from 'react-native';
import WeatherService from '../service/weather-service';
import React, { useState, useEffect, useCallback } from 'react';
import WeatherInfo from './weather-info';
import styled, { ThemeProvider } from 'styled-components/native';
import { useSelector } from 'react-redux';
import LoadingSpinner from './loading-spinner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

const { getCurrent } = new WeatherService();

export default function MainContainer() {
    const theme = useSelector((state) => state.themeReducer.theme);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [items, setItems] = useState({});
    const [city, setCity] = useState();
    const WindowHeight = Dimensions.get('window').height;

    const getData = useCallback(() => {
        setLoading(true);
        getCurrent()
            .then((data) => {
                setItems(data);
            })
            .catch((err) => {
                setError(
                    `The database is unavailable. Try restarting the app or try again later.`
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setLoading, setItems, setError]);

    useEffect(() => {
        getData();
    }, [getData, city]);

    if (error)
        return (
            <ErrorContainer WindowHeight={WindowHeight}>
                <Icon name="error-outline" size={100} color={'red'} />
                <TextError>Error</TextError>
                <ErrorDescription>{error}</ErrorDescription>
            </ErrorContainer>
        );
    if (loading) return <LoadingSpinner />;

    return (
        <ThemeProvider theme={theme}>
            <Main
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getData} />
                }
            >
                {items && <WeatherInfo items={items} setCity={setCity} />}
                <StatusBar barStyle={'default'} />
            </Main>
        </ThemeProvider>
    );
}

const Main = styled.ScrollView`
    background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;
const ErrorContainer = styled.View`
    align-items: center;
    min-height: ${(props) => `${props.WindowHeight}px`};
    justify-content: center;
`;

const TextError = styled.Text`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;

const ErrorDescription = styled.Text`
    font-size: 18px;
    margin: 15px;
    text-align: center;
`;
