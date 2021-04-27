
import {connect} from 'react-redux'

import Header from './components/header'
import FullLoader from './components/full-loader'
import UserProfileScreen from "./screens/user-profile-screen"
import AuthenticationScreen from "./screens/authentication-screen"


import './App.css';

function App({mode, loader}) {
  return (
    <div className="App">
      <Header />
      {mode == 'loggedIn' ? <UserProfileScreen /> : <AuthenticationScreen /> }
      <FullLoader loader={loader} />
    </div>
  );
}

const mapStateToProps = state => ({
  mode: state.authentication_store.mode,
  loader: state.authentication_store.loader || state.users_store.loader
})

export default connect(mapStateToProps)(App);
