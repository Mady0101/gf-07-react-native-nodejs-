import React, { useEffect, useState } from 'react';
import { View , Text , StyleSheet , TouchableOpacity, Modal, Platform , PermissionsAndroid } from 'react-native';
var SmsAndroid = require('react-native-sms-android');

const DeviceSms = ({device}) => {




   


    return ( 
        
        <View style={styles.container}>
            <Text style={styles.textName}>{device.name}</Text>
            <Text style={styles.textNumber}>{device.number}</Text>
        </View>
     );
}
 
export default DeviceSms;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        borderRadius: 10,
        borderWidth : 5,
        marginVertical:10
    },
    textName :{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign:'center'
    },
    textNumber :{
        fontSize: 20,
        textAlign:'center'
    }
});