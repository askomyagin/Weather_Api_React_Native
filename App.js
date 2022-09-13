import MainContainer from './components/main';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/theme-reduсer';

const store = createStore(
    combineReducers({ themeReducer }),
    applyMiddleware(thunk)
);

export default function App() {
    return (
        <Provider store={store}>
            <MainContainer />
        </Provider>
    );
}
