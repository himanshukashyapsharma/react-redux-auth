import {
    RESET_AUTHENTICATION_DATA,
    CHANGE_AUTHENTICATION_DATA,
    CHANGE_AUTHENTICATION_MODE,
    REMOVE_AUTH_ERROR_ON_FOCUS
} from "../actions/types";

const AUTHENTICATION_STATE = {
    mode: 'loggedIn',
	isValidMobile: false,
	userID: "",
	name: "",
	password: "",
	confirmPassword: "",
    errors: {},
	loader: false,
};

export const AuthenticationReducer = (state = AUTHENTICATION_STATE, action) => {
	let newState = Object.assign({}, state);

    if(action.type === CHANGE_AUTHENTICATION_DATA) {
        console.log(action.key, action.value)
        newState[action.key] = action.value
        return newState
    }

    if(action.type === RESET_AUTHENTICATION_DATA) {
        newState = AUTHENTICATION_STATE
        return newState
    }

    if(action.type === CHANGE_AUTHENTICATION_MODE) {
        newState.password = ""
        newState.errors = {}
        newState.mode = action.mode

        if(action.mode == 'login') {
            newState.confirmPassword = ""
            newState.name = ""
        }
        
        return newState
    }

    if(action.type === REMOVE_AUTH_ERROR_ON_FOCUS) {
        console.log(action)
        let errors = newState.errors
        delete errors[action.key]
        console.log(errors)
        return {...newState, errors: {...errors}}
    }
	return state;
};