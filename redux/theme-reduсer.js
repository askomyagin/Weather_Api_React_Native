import { lightTheme } from '../service/Theme';
import { SWITCH_THEME } from './theme-actions';

const initialState = {
    theme: lightTheme,
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_THEME:
            return { theme: action.theme };

        default:
            return state;
    }
};

export default themeReducer;
