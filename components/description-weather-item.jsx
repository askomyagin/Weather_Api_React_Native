import styled, { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DescriptionWeatherItem = ({ icon, value, title }) => {
    const theme = useTheme();
    return (
        <DescriptionContainer>
            <MaterialCommunityIcons
                name={icon}
                size={48}
                color={theme.PRIMARY_ICON_COLOR}
                style={{ margin: '6%' }}
            />
            <Description>
                <Text>{value}</Text>
                <Text>{title}</Text>
            </Description>
        </DescriptionContainer>
    );
};

const DescriptionContainer = styled.View`
    width: 160px;
    flex-direction: row;
    align-items: center;
`;

const Description = styled.View``;
const Text = styled.Text`
    color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

export default DescriptionWeatherItem;
