import {
    LOGIN_USER,
    UPLOAD_IMAGE,
    RESET_USER_STATE,
    UPDATE_USER_DATA,
    CHANGE_USER_DATA,
    REGISTER_NEW_USER,
    CHANGE_USER_ADDRESS,
    REMOVE_USER_ERROR_ON_FOCUS
} from "../actions/types";

const USERS_STATE = {
    userID: "",
    name: "",
    mobile: '',
    countryCode: '',
    DOB: '',
    address: {state: '', city: '', address: '',  pincode: ''},
    image: "",
    errors: {},
    loader: false,
    // users: [{
    //     userID: 8800626179,
    //     name: 'himanshu sharma',
    //     password: 12345678,
    //     mobile: 8800626179,
    //     countryCode: '',
    //     DOB: '1998-04-02',
    //     address: {state: '', city: '', address: '',  pincode: ''},
    //     image: ""
    // }]
};

export const UsersReducer = (state = USERS_STATE, action) => {
	let newState = Object.assign({}, state);

    if(action.type === CHANGE_USER_DATA) {
        newState[action.key] = action.value
        return newState
    }

    if(action.type === CHANGE_USER_ADDRESS) {
        newState.address = {...newState.address, [action.key]: action.value}

        return newState
    }

    // if(action.type === REGISTER_NEW_USER) {
    //     let user = {
    //         userID: action.userID,
    //         name: action.name,
    //         password: action.password,
    //         mobile: action.mobile,
    //         countryCode :'',
    //         DOB: '',
    //         address: {state: '', city: '', address: '',  pincode: ''},
    //         image: ""
    //     }
    //     newState.users = [user, ...newState.users]
    //     return newState
    // }

    if(action.type === LOGIN_USER) {
        newState.userID = action.user.userID
        newState.name = action.user.name
        newState.mobile = action.user.mobile
        newState.address = action.user.address
        newState.DOB = action.user.DOB
        newState.countryCode = action.user.countryCode
        newState.image = action.user.image
        return newState
    }

    if(action.type === UPDATE_USER_DATA) {
        // newState.users = newState.users.map(user => user.userID == newState.userID ? {
        //     ...user, 
        //     name: newState.name, 
        //     mobile: newState.mobile,
        //     DOB: newState.DOB,
        //     address: {...newState.address},
        //     image: newState.image,
        //     countryCode: newState.countryCode
        // }: user)
        newState.errors = {}
        return newState
    }

    if(action.type === UPLOAD_IMAGE) {
        newState.image = action.file
        console.log(newState.image);
        console.log(action.file);
        return newState
    }

    if(action.type === RESET_USER_STATE) {
        // return {...USERS_STATE, users: newState.users}
        return USERS_STATE
    }

    if(action.type === REMOVE_USER_ERROR_ON_FOCUS) {
        let errors = newState.errors
        delete errors[action.key]
        return {...newState, errors: {...errors}}
    }

	return state;
};

const USERS_DATA_LIST = {
    users: []
}

export const UsersDataListReducer = (state = USERS_DATA_LIST, action) => {
	let newState = Object.assign({}, state);

    if(action.type === UPDATE_USER_DATA) {
        console.log(action.image);
        newState.users = newState.users.map(user => user.userID == action.userID ? {
            ...user, 
            name: action.name, 
            mobile: action.mobile,
            DOB: action.DOB,
            address: {...action.address},
            image: action.image,
            countryCode: action.countryCode
        }: user)
        return newState
    }

    if(action.type === REGISTER_NEW_USER) {
        let user = {
            userID: action.userID,
            name: action.name,
            password: action.password,
            mobile: action.mobile,
            countryCode :'',
            DOB: '',
            address: {state: '', city: '', address: '',  pincode: ''},
            image: ""
        }
        newState.users = [user, ...newState.users]
        return newState
    }
    return newState
}