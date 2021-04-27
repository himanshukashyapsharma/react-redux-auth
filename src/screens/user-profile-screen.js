import React, {useRef} from 'react'
import { connect } from 'react-redux'


import {ChangeUserData, ChangeUserAddress, OnUserDataSubmit, UploadImage, RemoveUserErrorOnFocus} from '../actions/users-action'

function UserProfileScreen({name, DOB, mobile, address, image, errors, ChangeUserData, ChangeUserAddress, OnUserDataSubmit, UploadImage, RemoveUserErrorOnFocus}) {
    const fileRef = useRef()

    const onUploadImage = (e) => {
        UploadImage(e, fileRef)
    }

    const ClearUserImage = () => {
        fileRef.current.value = ""
        ChangeUserData('image', "")
    }

    const onEnterPress = ({charCode}) => { if(charCode == 13) OnUserDataSubmit()}

    return (
        <div className="user-profile-container">
            <div className="image-container">
                <img className="image" src={!!image ? (window.URL || window.webkitURL).createObjectURL(image) : 'default.png'} />
                {!!image ? <span className="image-delete-button" onClick={ClearUserImage}><i className="far fa-times-circle fa-2x"></i></span> : null}
            </div>
            <div className="file-input-container">
                <div className="file-input-wrap">
                    <input ref={fileRef} className="file-input" type='file' name="image" placeholder="" onChange={onUploadImage} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} accept=".jpg,.jpeg,.png" />
                    <div className="errors">{errors.image}</div>
                </div>
                
            </div>
            <div>
                <input className={`large-input WL ${errors.name ? 'input-error' : ''}`} type='text' name="name" value={name} placeholder="Enter your name" onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} required autoComplete="none" />
                <div className="errors">{errors.name}</div>
            </div>
            <div>
                <input className="large-input WL" type='date' name="DOB" value={DOB} placeholder="Enter date of birth" onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} autoComplete="none" />
            </div>
            <div>
                <input className={`large-input WL ${errors.mobile ? 'input-error' : ''}`} type='number' name="mobile" value={mobile} placeholder="Enter mobile no." onChange={(e) => ChangeUserData(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                <div className="errors">{errors.mobile}</div>
            </div>
            <div className="display-flex">
                <div>
                    <select
                        className={`medium-input WM ${errors.state ? 'input-error' : ''}`}
                        name="state"
                        onChange={(e) => ChangeUserAddress(e.target.name, e.target.value)}
                        onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} 
                        value={address.state}
                    >
                        <option value="">--State--</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>  
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                    <div className="errors">{errors.state}</div>
                </div>
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
                <input className={`large-input WL ${errors.address ? 'input-error' : ''}`} type='text' name="address" value={address.address} placeholder="Enter your address" onChange={(e) => ChangeUserAddress(e.target.name, e.target.value)} onKeyPress={onEnterPress} onFocus={(e) => RemoveUserErrorOnFocus(e.target.name)} autoComplete="none" />
                <div className="errors">{errors.address}</div>
            </div>
            <button className="input-button" onClick={OnUserDataSubmit}>Update</button>
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