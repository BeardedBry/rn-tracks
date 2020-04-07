import createDataContext from './createDataContext';

const authReducer = (state, action) => {
    switch (action.type){
        default:
            return state;
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {}, // functions we will make
    { isSignedIn: false } // initial state, (placeholder isSignedIn: false)
)