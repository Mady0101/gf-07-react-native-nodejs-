import React, {createContext, useState} from 'react';
import { addDevice , deleteDevice} from '../apiServices/DeviceApiService';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user , setUser]= useState(null)

    const updateUserDevices = (devices) =>{
        setUser({...user , devices : devices});
    }

    const addDeviceContext = (device) =>{
        addDevice(user.token, device)
        .then(result => result.json())
        .then(json => setUser({...user , devices:json}))
        .catch(err => console.log(err))
    }

    const removeDevice = (device) =>{
        deleteDevice(user.token, device)
        .then(result => result.json())
        .then(json => setUser({...user , devices:json}))
        .catch(err => console.log(err))
    }


    const updateUser = (User,token) => {
        setUser({...User,token})
    }
    return ( 
        <UserContext.Provider value={{user , updateUser , updateUserDevices, addDeviceContext,removeDevice}}>
            {props.children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;