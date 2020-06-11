import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

// first screen
const ResolveAuthScreen = () => {
  const {tryLocalSignin} = useContext(AuthContext);

  // check for token.
  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
