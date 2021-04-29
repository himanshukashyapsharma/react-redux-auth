import {connect} from 'react-redux'
import React, {useState, useRef} from 'react'

import {ChangeAuthenticationData, OnSubmit, ChangeAuthenticationMode, RemoveAuthErrorOnFocus} from '../actions/authentication-action'

function AuthenticationScreen({userID, name, password, confirmPassword, mode, errors, ChangeAuthenticationData, OnSubmit, ChangeAuthenticationMode, RemoveAuthErrorOnFocus}) {

    const [isPasswordVisible, setIsPasswordVisibile] = useState(false)

    const passwordInputRef = useRef()

    const togglePasswordVisibility = () => {
        setIsPasswordVisibile(!isPasswordVisible)
        passwordInputRef.current.focus()
    }

    const onEnterPress = ({charCode}) => {
        if(charCode == 13) OnSubmit()
    }

    return (
        <div className="auth-wrap">
        <div className="auth-banner-container">
            <div className="auth-text-container">
                <div><h1 className="auth-text-big">Sign In to Recharge Direct</h1></div>
                <div>
                    <h4 className="auth-text-small">If you don't have an account</h4>
                <div><h4 className="auth-text-small">You can&nbsp;  <span className='blue-text' onClick={() => ChangeAuthenticationMode('register')}>Register here!</span></h4></div>
                </div>
            </div>
        </div>
        <div className="auth-form-container">
        
            <div className="auth-input-wrap">
                <input className={`auth-input ${errors.userID ? 'input-error' : ''}`} type='text' name="userID" value={userID} placeholder="Enter email or phone number" onChange={(e) => ChangeAuthenticationData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveAuthErrorOnFocus(e.target.name)} required autoComplete="none" />
                <div className="errors">{errors.userID}</div>
            </div>
            {mode == 'register' ? <div className="auth-input-wrap">
                <input className={`auth-input ${errors.name ? 'input-error' : ''}`} type='text' name="name" value={name} placeholder="Enter full name" onChange={(e) => ChangeAuthenticationData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveAuthErrorOnFocus(e.target.name)} required autoComplete="none" />
                <div className="errors">{errors.name}</div>
            </div> : null }
            <div className="auth-input-wrap">
                <div className="toggle-pass-container">
                    <input ref={passwordInputRef} className={`auth-input ${errors.password ? 'input-error' : ''}`}type={isPasswordVisible ? 'text' : 'password'}  name="password" value={password} placeholder="Password" onChange={(e) => ChangeAuthenticationData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveAuthErrorOnFocus(e.target.name)} required autoComplete="none" />
                    <span className="eye-button" onClick={togglePasswordVisibility}>{isPasswordVisible ? <i className="far fa-eye 2x"></i> : <i className="far fa-eye-slash"></i> }</span>
                </div>
                <div className="errors">{errors.password}</div>
            </div>
            {mode == 'register' ? <div className="auth-input-wrap">
                <input className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`} type='password' name="confirmPassword" value={confirmPassword} placeholder="Confirm password" onChange={(e) => ChangeAuthenticationData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveAuthErrorOnFocus(e.target.name)} required autoComplete="none" />
                <div className="errors">{errors.confirmPassword}</div>
            </div> : null }
            <div className="errors">{errors.authenticationError}</div>
            <div><button className="input-button" onClick={OnSubmit} >{mode == 'register' ? 'Register' : 'Sign In'}</button></div>
            {mode == 'register' ? <a className="blue-text" onClick={() => ChangeAuthenticationMode('login')}>already a user?</a> : <a className="blue-text" onClick={() => ChangeAuthenticationMode('register')}>register?</a>}
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    name: state.authentication_store.name,
    mode: state.authentication_store.mode,
    errors: state.authentication_store.errors,
    userID: state.authentication_store.userID,
    password: state.authentication_store.password,
    confirmPassword: state.authentication_store.confirmPassword
})

const mapDispatchToProps = dispatch => ({
    OnSubmit : () => dispatch(OnSubmit()),
    ChangeAuthenticationMode : (mode) => dispatch(ChangeAuthenticationMode(mode)),
    ChangeAuthenticationData : (key, value) => dispatch(ChangeAuthenticationData(key, value)),
    RemoveAuthErrorOnFocus : (key) => dispatch(RemoveAuthErrorOnFocus(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen)
