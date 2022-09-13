import styled, { useTheme } from 'styled-components/native';
import { useState } from 'react';
import WeatherService from '../service/weather-service';
import Icon from 'react-native-vector-icons/EvilIcons';
import SearchHint from './search-hint';
import Modal from 'react-native-modal';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { getSearchCity } = new WeatherService();

const ChoosingCity = ({ chooseCity, setChooseCity, setCity }) => {
    const theme = useTheme();
    const onPress = () => {
        setChooseCity(!chooseCity), setSearchCity([]);
    };
    const [searchCity, setSearchCity] = useState();
    const [waitPosition, setWaitPosition] = useState(false);
    const [errorPosition, setErrorPosition] = useState(false);

    function onChange(e) {
        getSearchCity(e)
            .then((res) => {
                setSearchCity(res);
            })
            .catch((err) => {
                setSearchCity([]);
            });
    }

    const debounce = (fn, ms) => {
        let timeout;

        return function () {
            const fnCall = () => {
                fn.apply(this, arguments);
            };

            clearTimeout(timeout);
            timeout = setTimeout(fnCall, ms);
        };
    };

    onChange = debounce(onChange, 300);

    const getPosition = async () => {
        setWaitPosition(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorPosition(true);
            setWaitPosition(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        AsyncStorage.setItem(
            'cityStorage',
            `${location.coords.latitude},${location.coords.longitude}`
        );
        setCity(`${location.coords.latitude},${location.coords.longitude}`);
        setChooseCity(!chooseCity);
        setWaitPosition(false);
    };

    onChange = debounce(onChange, 300);

    return (
        <Modal
            style={{
                margin: 0,
            }}
            isVisible={chooseCity}
            onSwipeComplete={onPress}
            onBackButtonPress={onPress}
            swipeDirection={'left'}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            animationInTiming={350}
            animationOutTiming={350}
        >
            <ModalContainer>
                <HeaderContainer>
                    <ButtonExit onPress={onPress}>
                        <Icon
                            name="chevron-left"
                            size={40}
                            color={theme.PRIMARY_ICON_COLOR}
                        />
                    </ButtonExit>
                    <ChooseCityTitle>Choose a city</ChooseCityTitle>
                    <TouchableOpacity onPress={getPosition}>
                        <Icon
                            name="location"
                            size={40}
                            color={theme.PRIMARY_ICON_COLOR}
                        />
                    </TouchableOpacity>
                </HeaderContainer>
                <InputContainer>
                    <InputCity
                        placeholder={'Please type here…'}
                        onChangeText={onChange}
                    />
                    {searchCity && (
                        <CityContainer searchCity={searchCity}>
                            {searchCity.map((el) => (
                                <SearchHint
                                    key={el.url}
                                    el={el}
                                    setCity={setCity}
                                    setChooseCity={setChooseCity}
                                />
                            ))}
                        </CityContainer>
                    )}
                </InputContainer>
                <TextContainer>
                    {waitPosition && (
                        <WaitContainer>
                            <ActivityIndicator size={'small'} color="#0000ff" />
                            <WaitAndErrorText>
                                Location determination
                            </WaitAndErrorText>
                        </WaitContainer>
                    )}
                    {errorPosition && (
                        <WaitAndErrorText>
                            Location cannot be determined!
                        </WaitAndErrorText>
                    )}
                </TextContainer>
            </ModalContainer>
        </Modal>
    );
};

const WaitContainer = styled.View`
    flex-direction: row;
    width: 60%;
    justify-content: space-around;
`;

const TextContainer = styled.View`
    margin-top: 20px;
    width: 100%;
    align-items: center;
`;

const WaitAndErrorText = styled.Text`
    color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
    font-size: 16px;
`;

const ModalContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const InputContainer = styled.View`
    align-items: center;
    width: 100%;
`;

const CityContainer = styled.View`
    width: 85%;
    background-color: ${(props) => props.theme.PRIMARY_INPUT_COLOR};
    top: 2px;
    border-radius: 10px;
`;

const ButtonExit = styled.TouchableOpacity``;

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
`;

const ChooseCityTitle = styled.Text`
    width: 75%;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const InputCity = styled.TextInput`
    width: 90%;
    height: 50px;
    border-width: 1px;
    margin-top: 40px;
    padding: 10px;
    border-radius: 20px;
    border-color: black;
    background-color: ${(props) => props.theme.PRIMARY_INPUT_COLOR};
`;

export default ChoosingCity;
