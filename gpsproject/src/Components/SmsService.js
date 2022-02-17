import React , {useContext, useEffect, useState} from 'react';
import { View , Text , StyleSheet , TouchableOpacity , Platform, PermissionsAndroid, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popover from 'react-native-popover-view';
import { UserContext } from '../contexts/UserContextProvider';
import DeviceLabelCheckBox from './DeviceLabelCheckBox';
var SmsAndroid = require('react-native-sms-android');



const SmsService = ({name , description , icon, number}) => {

    useEffect(()=>{
        return setShowPopOver(false)
    },[user])

    const {user}=useContext(UserContext)

    const [showPopOver , setShowPopOver] = useState(false);
    const [showDevicePopover , setShowDevicePopover] = useState(false);
    const [canShow , setCanShow] = useState(false);
    const [clickedDevices , setClickedDevices] = useState([])

    async function SendSms (receiverNumber) {
        if (Platform.OS === 'android') {
           await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
          );
          if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
            SmsAndroid.sms(
                receiverNumber, // phone number to send sms to
                number, // sms body
                'sendDirect', // sendDirect or sendIndirect
                (err, message) => {
                  if (err){
                    console.log(err);
                  } else {
                    setShowPopOver(false); // callback message
                  }
                }
              );
          }
        }
      }

      const handleDeviceClick = (device) =>{
            let exist=false;
            clickedDevices.map(clickedDevice =>{
                if(clickedDevice._id === device._id)
                exist = true
            })
            if(exist)
            {   
               const tab= clickedDevices.filter(clickedDevice => clickedDevice._id!==device._id)
               setClickedDevices(tab);
            }
            else
                setClickedDevices([...clickedDevices,device])
      }

      const handleSendSmsClick=()=>{
            clickedDevices.map(clickedDevice =>{
              const receiverNumber = clickedDevice.number.toString();
              SendSms(receiverNumber);
            })
      }



    return ( 
        <View style={styles.container}>
            <Icon name={icon} color='#009387' size={40}/>
            
            <View style={styles.description}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text} numberOfLines={1}>{description}</Text>
            </View>
            <TouchableOpacity  style={styles.button} onPress={()=>{ setShowPopOver(true)}}> 
                <Text style={styles.buttonText}>Discover</Text>
            </TouchableOpacity>



            <Popover 
             popoverStyle={styles.popoverContainer} isVisible={showPopOver}
              onRequestClose={()=>setShowPopOver(false)}
              onCloseComplete={()=>setCanShow(true)}>
                <Text style={styles.popoverTextName}>{name}</Text>
                <Text style={styles.popoverTextDescription}>{description}</Text>
                <Text style={styles.popoverTextDescription}>we will be sending an sms to device number that would cost you the sms fee</Text>
                <View style={styles.popoverButtonContainer}>  
                <TouchableOpacity  style={styles.popoverButton} onPress={()=>setShowPopOver(false)}> 
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.popoverButton} 
                onPress={()=>{setShowPopOver(false); setShowDevicePopover(true)}}> 
                    <Text style={styles.buttonText}>Select devices</Text>
                </TouchableOpacity>
                </View>
            </Popover>


            
            <Popover onCloseComplete={()=>{setCanShow(false);setClickedDevices([])}} 
             popoverStyle={styles.popoverContainer}
              isVisible={showDevicePopover && canShow} onRequestClose={()=>setShowDevicePopover(false)}>
                <Text style={{textAlign:'center' , fontSize:20, fontWeight:'bold', margin:10}}>
                    Select the devices you want to send an sms to !</Text>
                <ScrollView>
                    {user.devices? 
                    user.devices.map(device=>{
                        return (
                        <DeviceLabelCheckBox key={device._id} device={device} handleDeviceClick={handleDeviceClick}/>
                        )
                    }) :<Text style={{textAlign:'center' , fontSize:20, fontWeight:'bold', margin:10}}>no device exist</Text>
                }
                </ScrollView>
                <TouchableOpacity  style={styles.popoverButton} 
                onPress={()=>{handleSendSmsClick()}}> 
                    <Text style={styles.buttonText}>Send SMS</Text>
                </TouchableOpacity>
            </Popover>



        </View>
     );
}
 
export default SmsService;

const styles = StyleSheet.create({
    container :{
         display: 'flex',
         flexDirection: 'row',
         height : 80,
         width : '90%',
         alignItems: 'center',
         borderWidth: 2,
         borderColor:'gray',
         paddingHorizontal: 10,
         borderRadius: 20,
         marginVertical: 20
         
    },
    description :{
        flex : 3,
        display:'flex',
        flexDirection: 'column',
        paddingLeft: 20
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold',
        color:'black'
    },
    text : {
        fontSize: 20
    },
    button : {
        flex : 2,
        backgroundColor: '#009387',
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 35
    },
    buttonText : {
        fontSize: 20,
        color:'#fff',
        fontWeight: 'bold'
    },
    popoverContainer : {
        flex : 1,
        width:'80%',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 20,
    },
    popoverTextName:{
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical:10,
        marginHorizontal : 10
    },
    popoverTextDescription:{
        fontSize: 20,
        marginVertical:10,
        marginHorizontal : 10,
        textAlign:'center'
    },
    popoverButton : {
        backgroundColor: '#009387',
        height: 40,
        width:'40%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 35,
        marginVertical:10,
        marginHorizontal : 10
    },
    popoverButtonContainer : {
        display : 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
    }

});