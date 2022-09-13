import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchHint = ({ el, setCity, setChooseCity }) => {
    const address = `${el.name}, ${el.region}, ${el.country}`;

    const onPress = () => {
        AsyncStorage.setItem('cityStorage', el.url);
        setCity(el.url);
        setChooseCity(false);
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <SearchHintContainer>
                <Text>{address}</Text>
            </SearchHintContainer>
        </TouchableOpacity>
    );
};

const SearchHintContainer = styled.View`
    padding: 10px;
`;

export default SearchHint;
