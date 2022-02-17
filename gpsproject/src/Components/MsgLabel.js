import React, { useState , useEffect } from 'react';
import { View , Text , StyleSheet, Linking, Pressable } from "react-native";



const MsgLabel = ({text , read}) => {
 
    const linkDetector = new RegExp(/\bhttps?:\/\/\S+/gi);
    const [textList , setTextList]=useState([]);
    useEffect(()=>{
        const list = text.split(/(\bhttps?:\/\/\S+)/gi)
        setTextList(list)
    },[])
       // const matches = string.match(/\bhttps?:\/\/\S+/gi);

    return (
    <View style={[styles.container , {justifyContent: read ? 'flex-end' : 'flex-start',}]}>
        <View style={[styles.textWrapper,{backgroundColor: read? '#009387' : 'gray',}]}>
            {textList.map((text , index)=>{
                if(linkDetector.test(text))
                    return (
                        <Pressable key={index} onPress={()=>{Linking.openURL(text)}}>
                            <Text style={[styles.text,{color:'blue',textDecorationLine:'underline'}]}>{text}</Text>
                        </Pressable>
                        ) 
                else
                    return (
                            <Text key={index} style={[styles.text,{color:'black'}]}>{text}</Text>
                         )
            })}
        </View>
    </View> );
}
 
export default MsgLabel;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginVertical: 10
    },
    textWrapper:{
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        justifyContent:'center'
    },
    text:{
        fontSize:25,
    }
});