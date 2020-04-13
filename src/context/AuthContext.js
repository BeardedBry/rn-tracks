import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signup':
            return {errorMessage: '', token: action.payload};
        default:
            return state;
    }
};

const signup = (dispatch) => async ({email, password}) => {
    // make api request to sign up with email and password.
    // if we sign up, modify state, and say we are authenticated.
    // if signup fails, send error.
    try {
        const response = await trackerApi.post('/signup', {email, password});
        // returns a JWT, Json Web Token
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signup', payload: response.data.token});
        // navigate to main flow
        navigate('TrackList');
    }catch (err) {
        //console.log(err.message, err.response.data);
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up.'})
    }
};


const signin = (dispatch) => {
    return ({email, password}) => {
        // Try to signin
        // Handle succes by updating state
        // Handle failure by showing error message.
    };
}

const signout = (dispatch) => {
    return () =>{
        // somehow sign out!
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup}, // functions we will make
    { token: null, errorMessage: ''} // initial state, (placeholder isSignedIn: false)
)