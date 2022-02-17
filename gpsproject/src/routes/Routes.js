import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContextProvider';

const Routes = () => {
    const {user} = useContext(UserContext)
    return ( 
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
     );
}
 
export default Routes;