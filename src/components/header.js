import React, {useState} from 'react'
import { connect } from 'react-redux'
import {GoToAuthFromProfile} from '../actions/authentication-action'

function Header({isLoggedIn, GoToAuthFromProfile}) {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const onHeaderButtonClick = (screen) => {
        GoToAuthFromProfile(screen)
        setIsMenuVisible(false)
    }

    return (
        <>
            <div className={`mobile-header-bar ${isMenuVisible ? 'hide' : ''}`}>
                <h3>Logo</h3>
                <span onClick={() => setIsMenuVisible(true)}><i className="fas fa-bars fa-2x"></i></span>
            </div>
            <div className={`header ${isMenuVisible ? 'show' : ''}`}>
                    <span className="header-close-button" onClick={() => setIsMenuVisible(false)}>
                        <i className="fas fa-times fa-2x"></i>
                    </span>
                <div>
                    <button className="header-buttons" >Home</button>
                    <button className="header-buttons" onClick={() => onHeaderButtonClick('register')}>Sign-up</button>
                    <button className="header-buttons" >Contact Us</button>
                    <button className="header-buttons" >Help</button>
                </div>
                <div>
                    <button className="header-buttons" onClick={() => onHeaderButtonClick('login')}>Sign in</button>
                    <button className="header-buttons" onClick={() => onHeaderButtonClick('register')}>Register</button>
                    <button className="header-buttons" onClick={() => onHeaderButtonClick('login')}>{isLoggedIn ? 'Log Out' : 'Log In' }</button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isLoggedIn : state.authentication_store.mode == 'loggedIn'
})

const mapDispatchToProps = dispatch => ({
    GoToAuthFromProfile: (mode) => dispatch(GoToAuthFromProfile(mode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
