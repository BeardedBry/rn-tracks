import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        // actions passed in will be an object of functions.
        // for in loop overthem to place them in boundActions. 
        const boundActions = {};
        for (let key in actions){
            boundActions[key] = actions[key](dispatch);
        }

        return (
            // react component that allows all the components underneath it to have access.
            <Context.Provider value={{ state, ...boundActions}}>
                {children}
            </Context.Provider>
        )
    };

    return { Context: Context, Provider: Provider };

}