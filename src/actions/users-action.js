import { batch } from "react-redux";
import {
    LOGIN_USER,
    UPLOAD_IMAGE,
    CHANGE_USER_DATA,
    UPDATE_USER_DATA,
    CHANGE_USER_ADDRESS,
    REMOVE_USER_ERROR_ON_FOCUS
} from "../actions/types";


export const UpdateUserDataOnLogin = (user) => ({type: LOGIN_USER, user})

export const ChangeUserData = (key,value) => ({type: CHANGE_USER_DATA, key, value})

export const ChangeUserAddress = (key,value) => ({type: CHANGE_USER_ADDRESS, key, value})

export const OnUserDataSubmit = () => (dispatch, getState) => {
    const {userID, name, mobile, address,countryCode, DOB, image} = getState().users_store

    const mobile_validator = /^[6-9][0-9]{9}$/;
    const valid_mobile = mobile_validator.test(mobile);
    const errors = {}

    if(name == "") {
        errors.name = 'Name cannot be empty!'
        
    } else if (name.length < 3) {
        errors.name = 'Name too short!'
    }

    if(mobile != "" && !valid_mobile && countryCode == '91') {
        errors.mobile = 'Invalid Mobile No!'
    }
    if(countryCode != "" && mobile == "") {
        errors.mobile = 'Please Select Mobile No!'
    }
    if(mobile != "" && countryCode == "") {
        errors.countryCode = 'Select Country Code!'
    }


    if(areAllAddressFilled(address)) {
        if(address.pincode.length < 6 || address.pincode.length > 6) errors.pincode = 'Invalid pincode!'
        if(address.address.length < 10) errors.address = 'Address Too Short!'
    } else if(!areAllAddressEmpty(address)) {
        for (let key in address) {
            if(!address[key]) errors[key] = "Can't be Empty!"
        }
    }
    if(Object.keys(errors).length > 0) {
        dispatch(ChangeUserData('errors', errors))
    } else {
        runAfterLoader(() => dispatch({type: UPDATE_USER_DATA, userID, name, mobile, address, countryCode, DOB, image}) ,dispatch)
    }
}

const areAllAddressFilled = address => (!!address.state && !!address.city && !!address.pincode && !!address.address)

const areAllAddressEmpty = address => (!address.state && !address.city && !address.pincode && !address.address)

export const UploadImage = (event, fileRef) => (dispatch) => {
	const file = event.target.files[0];
	if (!file) {
        batch(() => {
            dispatch(ChangeUserData('loader',false))
            dispatch(ChangeUserData('errors', {image: 'Error Uploading Image'}))
            fileRef.current.value = ""
        })
		return;
	}
	const fileName = file.name.toLowerCase();
    if (!(fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg"))) {
        batch(() => {
            dispatch(ChangeUserData('loader',false))
            dispatch(ChangeUserData('errors', {image: 'Invalid File Type!'}))
            fileRef.current.value = ""
        })
    } else {
        // const _URL = window.URL || window.webkitURL;
        // const img = new Image();
        // img.src = _URL.createObjectURL(file);
        // img.onload = function () {   
        //         batch(() => {
        //             dispatch(ChangeUserData('loader',false))
        //             dispatch({ type: UPLOAD_IMAGE, file: img.src });
        //         })
        //     }
        const reader = new FileReader()

        reader.onload = function () {
            batch(() => {
                            dispatch(ChangeUserData('loader',false))
                            dispatch({ type: UPLOAD_IMAGE, file: reader.result });
                        })
        }

        reader.readAsDataURL(file)
    }
};

export const RemoveUserErrorOnFocus = (key) => ({type: REMOVE_USER_ERROR_ON_FOCUS, key})

export const runAfterLoader = (callbackFunction, dispatch, time = 500) => {
    dispatch(ChangeUserData('loader', true))
    setTimeout(() => {
        callbackFunction?.()
        dispatch(ChangeUserData('loader', false))
    }, time);
}