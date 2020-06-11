import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';

// returns state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'signout':
      return {errorMessage: '', token: null};
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};
//<NavigationEvents onWillFocus={clearErrorMessage}

const signup = dispatch => async ({email, password}) => {
  // make api request to sign up with email and password.
  // if we sign up, modify state, and say we are authenticated.
  // if signup fails, send error.
  try {
    const response = await trackerApi.post('/signup', {email, password});
    // returns a JWT, Json Web Token
    // store the token, update state.
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    // navigate to main flow
    navigate('TrackList');
  } catch (err) {
    //console.log(err.message, err.response.data);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up.',
    });
  }
};

const signin = dispatch => async ({email, password}) => {
  try {
    const response = await trackerApi.post('/signin', {email, password});
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data.token});
    navigate('TrackList');
  } catch (e) {
    //console.error(e);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in.',
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('loginFlow');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {tryLocalSignin, signin, signout, signup, clearErrorMessage}, // functions we will make
  {token: null, errorMessage: ''}, // initial state, (placeholder isSignedIn: false)
);
