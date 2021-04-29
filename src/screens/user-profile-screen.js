import React, {useRef} from 'react'
import { connect } from 'react-redux'

import StateSelector from '../components/state-selector'
import CountryCodeSelector from '../components/country-code-selector'

import {ChangeUserData, ChangeUserAddress, OnUserDataSubmit, UploadImage, RemoveUserErrorOnFocus} from '../actions/users-action'

function UserProfileScreen({name, DOB, mobile, address, image, errors, ChangeUserData, ChangeUserAddress, OnUserDataSubmit, UploadImage, RemoveUserErrorOnFocus}) {
    const fileRef = useRef()
    const dateInputRef = useRef()

    const onUploadImage = (e) => {
        UploadImage(e, fileRef)
    }

    const ClearUserImage = () => {
        fileRef.current.value = ""
        ChangeUserData('image', "")
    }

    const onDateInputFocus = () => {
        dateInputRef.current.type = 'date'
        dateInputRef.current.focus()
    }

    const onDateInputBlur = () => dateInputRef.current.type = 'text'


    const onEnterPress = ({charCode}) => { if(charCode == 13) OnUserDataSubmit()}

    return (
        <div className="user-profile-container">
            <div className="image-container">
                <img className="image" src={!!image ? (window.URL || window.webkitURL).createObjectURL(image) : 'default.png'} alt="user profile" />
                {!!image ? <span className="image-delete-button" onClick={ClearUserImage}><i className="far fa-times-circle fa-2x"></i></span> : null}
            </div>
            <div className="file-input-container">
                <div className="file-input-wrap">
                    <input ref={fileRef} className="file-input" type='file' name="image" placeholder="" onChange={onUploadImage} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} accept=".jpg,.jpeg,.png" />
                    <div className="errors">{errors.image}</div>
                </div>
                
            </div>
            <div>
                <input className={`large-input WXL ${errors.name ? 'input-error' : ''}`} type='text' name="name" value={name} placeholder="Enter your name" onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} required autoComplete="none" />
                <div className="errors">{errors.name}</div>
            </div>
            <div>
                <input ref={dateInputRef} className="large-input WXL" type='text' name="DOB" value={DOB} placeholder="Select date of birth" onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={onDateInputFocus} onBlur={onDateInputBlur} autoComplete="none" />
            </div>
            <div className="display-flex">
                <CountryCodeSelector />
                <div>
                    <input className={`large-input WL ${errors.mobile ? 'input-error' : ''}`} type='number' name="mobile" value={mobile} placeholder="Enter mobile no." onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                    <div className="errors">{errors.mobile}</div>
                </div>
            </div>
            <div className="display-flex">
                <StateSelector />
                <div>
                    <input className={`medium-input WS ${errors.city ? 'input-error' : ''}`} type='text' name="city" value={address.city} placeholder="city" onChange={(e) => ChangeUserAddress(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                    <div className="errors">{errors.city}</div>
                </div>
                <div>
                    <input className={`medium-input WS ${errors.pincode ? 'input-error' : ''}`} type='number' name="pincode" value={address.pincode} placeholder="pincode" onChange={(e) => ChangeUserAddress(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                    <div className="errors">{errors.pincode}</div>
                </div>
            </div>
            <div>
                <input className={`large-input WXL ${errors.address ? 'input-error' : ''}`} type='text' name="address" value={address.address} placeholder="Enter your address" onChange={(e) => ChangeUserAddress(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                <div className="errors">{errors.address}</div>
            </div>
            <button className="input-button WXL" onClick={OnUserDataSubmit}>Update</button>
        </div>
    )
}

const mapStateToProps = state => ({
    name: state.users_store.name,
    DOB: state.users_store.DOB,
    mobile: state.users_store.mobile,
    address: state.users_store.address,
    image: state.users_store.image,
    errors: state.users_store.errors,
})

const mapDispatchToProps = dispatch => ({
    OnUserDataSubmit: () => dispatch(OnUserDataSubmit()),
    UploadImage: (e, fileRef) => dispatch(UploadImage(e, fileRef)),
    ChangeUserData: (key, value) => dispatch(ChangeUserData(key, value)),
    RemoveUserErrorOnFocus: (key) => dispatch(RemoveUserErrorOnFocus(key)),
    ChangeUserAddress: (key, value) => dispatch(ChangeUserAddress(key, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)