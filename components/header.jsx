import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../redux/theme-actions';
import { lightTheme, darkTheme } from '../service/Theme';

const Header = ({ cityName, setChooseCity, chooseCity, isDay }) => {
    const theme = useSelector((state) => state.themeReducer.theme);
    const dispatch = useDispatch();
    const colorButton = isDay == 0 ? '#A8A8A8' : 'black';

    const onPressMenu = () => setChooseCity(!chooseCity);
    const onPressTheme = () =>
        dispatch(switchTheme(theme.mode === 'light' ? darkTheme : lightTheme));
    return (
        <HeaderConatiner>
            <TouchableOpacity onPress={onPressMenu}>
                <Icon name="menu" size={30} color={colorButton} />
            </TouchableOpacity>
            <NameCity>{cityName}</NameCity>
            <TouchableOpacity onPress={onPressTheme}>
                <Icon name="light-up" size={30} color={colorButton} />
            </TouchableOpacity>
        </HeaderConatiner>
    );
};

const HeaderConatiner = styled.View`
    padding-top: 10px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 15px;
    padding-right: 15px;
`;

const NameCity = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: white;
`;

export default Header;
