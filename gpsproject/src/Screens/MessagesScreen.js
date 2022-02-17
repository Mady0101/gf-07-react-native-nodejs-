import React, { useContext, useEffect, useState } from 'react';
import { View, Text , Platform , PermissionsAndroid, TouchableOpacity ,StyleSheet, Modal, Pressable, ScrollView} from 'react-native';
import DeviceSms from '../Components/DeviceSms';
import MsgLabel from '../Components/MsgLabel';
import { UserContext } from '../contexts/UserContextProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Popover from 'react-native-popover-view';
var SmsAndroid = require('react-native-sms-android');

const MessagesScreen = () => {

  const {user , removeDevice}= useContext(UserContext);

  const[sms,setSms]=useState([]);
  const[modal , setModal]=useState(false);
  const[popover , setPopOver]= useState({isVisible :false , props:null});

  useEffect(()=>{
  },[sms, user.devices])

  const handleDeleteDevice = (deviceToDelete)=>{
    removeDevice(deviceToDelete)
    setPopOver({isVisible:false , props:null});
  }

  const handleClick = (number)=>{
    getSmsList(number);
  }

  var filter = {
    box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
    // the next 4 filters should NOT be used together, they are OR-ed so pick one
    address: '123456789', // sender's phone number
    // the next 2 filters can be used for pagination
    indexFrom: 0, // start from index 0
    maxCount: 10, // count of SMS to return each time
};

  async function getSmsList (number) {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.READ_SMS,
     );
     if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
      filter.address=number;
      SmsAndroid.list(JSON.stringify(filter), (fail) => {
      console.log("OH Snap: " + fail)
    },
      (count, smsList) => {
        var arr = JSON.parse(smsList);
        setSms(arr);
        setModal(true)
    });
  }
}
};

    return ( 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        {user.devices?
        user.devices.map(device=>{
          return (
            <TouchableOpacity key={device._id} onLongPress={()=>{setPopOver({isVisible:true, props:device})}}
             onPress={()=>handleClick(device.number)}>
                <DeviceSms  device={device}/>
            </TouchableOpacity>
          )
        }) : <Text>no devices exist</Text>
      }
        </ScrollView>
        <TouchableOpacity style={styles.buttonIcon}>
            <FontAwesome name='plus' color='#fff' size={30} />
        </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={false}
      visible={modal}
      onRequestClose={() => {
      setModal(!modal)}}>
          <ScrollView>
            {sms.map(sm =>{return <MsgLabel key={sm._id} text={sm.body} read={sm.read}/>})}
            <Pressable style={styles.button} onPress={() => setModal(!modal)}>
              <Text style={styles.text}>Hide chat</Text>
            </Pressable> 
          </ScrollView>    
      </Modal>
      <Popover 
             popoverStyle={styles.popoverContainer} isVisible={popover.isVisible}
              onRequestClose={()=>setPopOver(false)}>
             
            <Text style={styles.popoverTextName}>Delete Device</Text>
            <Text style={styles.popoverTextDescription}>Would you like to delete the device with the name {popover.props? popover.props.name:'****'} and 
            with the number {popover.props? popover.props.number:'****'}</Text>
            <View style={styles.popoverButtonContainer}>
            <Pressable style={styles.popoverButton} onPress={() => handleDeleteDevice(popover.props)}>
              <Text style={styles.text}>Delete</Text>
            </Pressable> 
            <Pressable style={styles.popoverButton} onPress={() => {setPopOver({isVisible:false, props:null})}}>
              <Text style={styles.text}>Cancel</Text>
            </Pressable>
            </View> 
            
      </Popover>
    </View>
     );
}
 
export default MessagesScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 20 ,
    backgroundColor : '#009387',
    height:40,
    width : '50%',
    marginLeft: '25%',
    borderRadius: 80
    
},
  text:{
    fontSize:25,
    color:'black'
},
  buttonIcon:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor : '#009387',
    height:40,
    width:'10%',
    borderRadius: 80,
  },
  popoverContainer : {
    flex : 1,
    width:'80%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 20,
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
popoverButtonContainer : {
  display : 'flex',
  flexDirection: 'row',
  justifyContent:'space-between'
}
});