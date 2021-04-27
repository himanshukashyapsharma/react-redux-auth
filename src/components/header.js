import React from 'react'
import {connect } from 'react-redux'
import {GoToAuthFromProfile} from '../actions/authentication-action'

function Header({isLoggedIn, GoToAuthFromProfile}) {
    return (
        <div className="header">
        <div>
            <button className="header-buttons" >Home</button>
            <button className="header-buttons" onClick={() => GoToAuthFromProfile('register')}>Sign-up</button>
            <button className="header-buttons" >Contact Us</button>
            <button className="header-buttons" >Help</button>
        </div>
        <div>
            <button className="header-buttons" onClick={() => GoToAuthFromProfile('login')}>Sign in</button>
            <button className="header-buttons" onClick={() => GoToAuthFromProfile('register')}>Register</button>
            <button className="header-buttons" onClick={() => GoToAuthFromProfile('login')}>{isLoggedIn ? 'Log Out' : 'Log In' }</button>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn : state.authentication_store.mode == 'loggedIn'
})

const mapDispatchToProps = dispatch => ({
    GoToAuthFromProfile: (mode) => dispatch(GoToAuthFromProfile(mode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
