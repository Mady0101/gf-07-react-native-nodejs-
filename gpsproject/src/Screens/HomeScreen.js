import React, { useEffect, useState } from 'react';
import { TouchableOpacity , Text , Platform , PermissionsAndroid, View , StyleSheet} from 'react-native';
import SmsService from '../Components/SmsService';
import { getSms } from '../apiServices/SmsApiService';




const HomeScreen = () => {

  const [sms , setSms] = useState([])

  useEffect(()=>{
    getSms()
    .then(result => result.json())
    .then(json => {setSms(json);})
    .catch(err => console.log(err))
  },[])

    return ( 
        <View style={styles.container}>
          {sms.map(sm => {
             return <SmsService key={sm._id} icon={sm.icon}
             number={sm.number} description={sm.description} name={sm.name}/>
          })}
       </View>
     
        );
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});