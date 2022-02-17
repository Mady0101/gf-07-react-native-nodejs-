import { View , Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from 'react';


const DeviceLabelCheckBox = ({device , handleDeviceClick}) => {
    const [clicked , setClicked] = useState(false)
    return (
        <TouchableOpacity onPress={()=>{setClicked(!clicked); handleDeviceClick(device)}}>
        <View style={[styles.container ,{backgroundColor:clicked ? '#009387' : '#fff'}]}>
            <Text style={styles.textName}>{device.name}</Text>
            <Text style={styles.textNumber}>{device.number}</Text>
        </View>
        </TouchableOpacity> 
     );
}
 
export default DeviceLabelCheckBox;

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