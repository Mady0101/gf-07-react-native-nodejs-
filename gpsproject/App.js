import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import UserContextProvider from './src/contexts/UserContextProvider';
import Routes from './src/routes/Routes';

const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <UserContextProvider>
        <Routes/>
    </UserContextProvider>
     );
}
 
export default App;



