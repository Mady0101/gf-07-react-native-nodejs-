import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessagesScreen from '../Screens/MessagesScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return ( 
        <Tab.Navigator initialRouteName="Home" backBehavior='initialRoute' screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = 'home'
                  } else if (route.name === 'Messages') {
                    iconName = 'envelope-o'
                  } else if (route.name ==='Profile'){
                    iconName = 'user-o'
                  }
      
                  // You can return any component that you like here!
                  return <FontAwesome name={iconName} size={50} color={color} />;
                },
                tabBarActiveTintColor: '#009387',
                tabBarInactiveTintColor: 'gray',
                headerShown:false,
                tabBarStyle: { height:80 },
                tabBarLabelStyle:{fontSize:15}
              })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Messages" component={MessagesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        
         );
}
 
export default AppStack;