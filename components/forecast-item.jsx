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

const ForecastItem = ({ item }) => {
    const { time, conditionImage, temperature } = item;
    const timeText = time.slice(11);

    return (
        <ForecastItemContainer>
            <Text>{timeText}</Text>
            <Image
                source={{ uri: 'https:' + conditionImage }}
                style={{ width: 60, height: 60, alignItems: 'center' }}
            />
            <Text>{getTemperature(Math.round(temperature))}</Text>
        </ForecastItemContainer>
    );
};

const ForecastItemContainer = styled.View`
    width: 65px;
    justify-content: center;
    align-items: center;
`;
const Text = styled.Text`
    color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

export default ForecastItem;
