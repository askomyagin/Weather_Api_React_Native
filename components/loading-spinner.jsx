import styled from 'styled-components/native';

const LoadingSpinner = () => {
    return <Spinner size={'large'} color="#0000ff" />;
};

const Spinner = styled.ActivityIndicator`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default LoadingSpinner;
