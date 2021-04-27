import {batch} from 'react-redux'

import {
    REGISTER_NEW_USER,
    RESET_USER_STATE,
    RESET_AUTHENTICATION_DATA,
    CHANGE_AUTHENTICATION_DATA,
    CHANGE_AUTHENTICATION_MODE,
    REMOVE_AUTH_ERROR_ON_FOCUS
} from "./types";

import {UpdateUserDataOnLogin} from './users-action'

export const ChangeAuthenticationData = (key,value) => ({type: CHANGE_AUTHENTICATION_DATA, key, value})

export const OnSubmit = () => (dispatch, getState) => {
    const {userID, name, password, confirmPassword, mode} = getState().authentication_store

    const errors = {}

    const mobile_validator = /^[6-9][0-9]{9}$/;
	const email_validator = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;

	const valid_email = email_validator.test(userID);
	const valid_mobile = mobile_validator.test(userID);

    if(userID == "") {
        errors.userID = 'Unique ID cannot be empty!'
        
    } else if(!(valid_mobile || valid_email)) {
        errors.userID = 'Invalid Unique ID!'
        
    }
    if(valid_mobile) {
        dispatch(ChangeAuthenticationData('isValidMobile', valid_mobile))
    }

    if(mode == "register") {
        if(name == "") {
            errors.name = 'Name cannot be empty!'
            
        } else if (name.length < 3) {
            errors.name = 'Name too short!'
            
        }
    }

    if(password == "") {
        errors.password = 'Password cannot be empty!'
    }

    else if(password.length < 8) {
        errors.password = 'Password should be at least 8 digits!'
        
    } else if (mode == 'register'){
        if(password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match!'
        }
    } 

    if(Object.keys(errors).length > 0) {
        dispatch(ChangeAuthenticationData('errors',errors))
    } else {
        if(mode == 'register')  dispatch(RegisterNewUser())
        else if (mode == 'login') dispatch(LoginNewUser())
    }
}

export const RegisterNewUser = () => (dispatch, getState) => {
    const {userID, password, name, isValidMobile} = getState().authentication_store
    const {users} = getState().users_store

    if(users.some(user => user.userID == userID)) {
        showAuthenticationError('Unique ID already exists!', dispatch)
    } else {
        runAfterLoader(() => {
            batch(() => {
                addNewUser(userID, name, password, isValidMobile, dispatch)
                dispatch({type: RESET_AUTHENTICATION_DATA })
            })
        }, dispatch)
    }
}

export const LoginNewUser = () => (dispatch, getState) => {
    const {userID, password} = getState().authentication_store
    const {users} = getState().users_store
    const registeredUser = getRegisteredUserData(userID, users)
    if(!!registeredUser) {
        if(registeredUser.password == password) {
            runAfterLoader(() => {
                batch(() => {
                    dispatch(ChangeAuthenticationData('mode', 'loggedIn'))
                    dispatch(UpdateUserDataOnLogin(registeredUser))
                })
            }, dispatch)
        } else {
            showAuthenticationError('Invalid ID or Password!', dispatch)
        }
    } else {
        showAuthenticationError('Unique ID Does not exist!', dispatch)
    }
}

export const GoToAuthFromProfile = (mode) => dispatch => {
    runAfterLoader(() => {
        batch(() => {
            dispatch({type: RESET_USER_STATE })
            dispatch(ChangeAuthenticationMode(mode))
        })
    }, dispatch, 500)
}

export const ChangeAuthenticationMode = (mode) => ({type: CHANGE_AUTHENTICATION_MODE , mode})

export const RemoveAuthErrorOnFocus = (key) => dispatch => { 
    dispatch({type: REMOVE_AUTH_ERROR_ON_FOCUS, key})
}

const getRegisteredUserData = (userID, users) => users.find(user => user.userID == userID)

const showAuthenticationError = (error,dispatch) => dispatch(ChangeAuthenticationData('errors',{authenticationError: error}))

const addNewUser = (userID, name, password, isValidMobile, dispatch) => dispatch({type: REGISTER_NEW_USER, userID, name, password, mobile: isValidMobile ? userID : '' })

export const runAfterLoader = (callbackFunction, dispatch, time = 1500) => {
    let flag = false
    let timeOut = setInterval(() => {
        if(flag) {
           batch(() => {
               callbackFunction?.()
               dispatch(ChangeAuthenticationData('loader', false))
           })
            clearInterval(timeOut)
        } else {
            dispatch(ChangeAuthenticationData('loader', true))
            flag = !flag
        }
    }, time)
}