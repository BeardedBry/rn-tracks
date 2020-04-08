import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
            break;
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        // make api request to sign up with email and password.
        // if we sign up, modify state, and say we are authenticated.
        // if signup fails, send error.
        try {
            const response = await trackerApi.post('/signup', {email, password});
            console.log(response.data);
        }catch (err) {
            //console.log(err.message, err.response.data);
            dispatch({type: 'add_error', payload: 'Something went wrong with sign up.'})
        }
    };
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
    { isSignedIn: false, errorMessage: ''} // initial state, (placeholder isSignedIn: false)
)