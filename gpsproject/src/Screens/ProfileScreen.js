import React , {useContext, useEffect, useState} from 'react';
import { SafeAreaView , StyleSheet, Text, TextInput, View , TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../contexts/UserContextProvider';
import KeyBoardAvoidingViewWrapper from '../Wrappers/KeyBoardAvoidingViewWrapper';

const ProfileScreen = () => {

    const {addDeviceContext} = useContext(UserContext)

    useEffect(()=>{

    },[buttonAffichage])

    const [buttonAffichage , setButtonAffichage]= useState({
        resetButton: 0.2,
        addDeviceButton : 0.2
    })

    const [password, setPassword]= useState({
        password:'',
        passwordVerified: false,
        isHiddenPassword: true,
        passwordTouched: false,
        passwordBorder:0
    })

    const [currentPassword, setCurrentPassword]= useState({
        currentPassword:'',
        currentPasswordVerified: false,
        isHiddenCurrentPassword: true,
        currentPasswordTouched: false,
        currentPasswordBorder:0
    })

    const [deviceName, setDeviceName]= useState({
        deviceName:'',
        deviceNameVerified: false,
        deviceNameTouched: false,
        deviceNameBorder:0
    })

    const [deviceNumber, setDeviceNumber]= useState({
        deviceNumber:'',
        deviceNumberVerified: false,
        deviceNumberTouched: false,
        deviceNumberBorder:0
    })

    const handlePasswordChange = (val) =>{
        if(val.length !== 0){
            setPassword({...password,password:val,passwordVerified:true})
            if(currentPassword.currentPasswordVerified)
             setButtonAffichage({...buttonAffichage,resetButton:1})
        }else{
            setPassword({...password, passwordVerified:false})
            setButtonAffichage({...buttonAffichage,resetButton:0.2})
        }
    }

    const handlePasswordFocus= () =>{
        setPassword({...password, passwordBorder:1 })
    }

    const handlePasswordBlur= () =>{
        setPassword({...password, passwordBorder:0 , passwordTouched:true})
    }

    const handleCurrentPasswordChange = (val) =>{
        if(val.length !== 0){
            setCurrentPassword({...currentPassword,currentPassword:val,currentPasswordVerified:true})
            if(password.passwordVerified)
            setButtonAffichage({...buttonAffichage,resetButton:1})
        }else{
            setCurrentPassword({...currentPassword, currentPasswordVerified:false})
            setButtonAffichage({...buttonAffichage,resetButton:0.2})
        }
    }

    const handleCurrentPasswordFocus= () =>{
        setCurrentPassword({...currentPassword, currentPasswordBorder:1 })
    }

    const handleCurrentPasswordBlur= () =>{
        setCurrentPassword({...currentPassword, currentPasswordBorder:0 , currentPasswordTouched:true})
    }

    const handleDeviceNameChange = (val) =>{
        if(val.length !== 0){
            setDeviceName({...deviceName,deviceName:val,deviceNameVerified:true})
            if(deviceNumber.deviceNumberVerified)
            setButtonAffichage({...buttonAffichage,addDeviceButton:1})
        }else{
            setDeviceName({...deviceName, deviceNameVerified:false})
            setButtonAffichage({...buttonAffichage,addDeviceButton:0.2})
        }
    }

    const handleDeviceNameFocus= () =>{
        setDeviceName({...deviceName, deviceNameBorder:1 })
    }

    const handleDeviceNameBlur= () =>{
        setDeviceName({...deviceName, deviceNameBorder:0 , deviceNameTouched:true})
    }

    const handleDeviceNumberChange = (val) =>{
        if(val.length !== 0){
            if(!isNaN(val)){
            setDeviceNumber({...deviceNumber,deviceNumber:val,deviceNumberVerified:true})
            if(deviceName.deviceNameVerified)
            setButtonAffichage({...buttonAffichage,addDeviceButton:1})
            }else{
            setDeviceNumber({...deviceNumber, deviceNumberVerified:false})
            setButtonAffichage({...buttonAffichage,addDeviceButton:0.2})
            }
        }else{
            setDeviceNumber({...deviceNumber, deviceNumberVerified:false})
            setButtonAffichage({...buttonAffichage,addDeviceButton:0.2})
        }
    }

    const handleDeviceNumberFocus= () =>{
        setDeviceNumber({...deviceNumber, deviceNumberBorder:1 })
    }

    const handleDeviceNumberBlur= () =>{
        setDeviceNumber({...deviceNumber, deviceNumberBorder:0 , deviceNumberTouched:true})
    }

    const handleAddDevice= ()=>{
        console.log(deviceNumber.deviceNumberVerified)
        console.log(deviceName.deviceNameVerified)
        addDeviceContext({name:deviceName.deviceName , number:deviceNumber.deviceNumber})
    }

    return ( 
        <KeyBoardAvoidingViewWrapper>
            <SafeAreaView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTextHeader}>Reset Password</Text>
                    <Text style={[styles.labelText,{marginTop: 15}]}>New Password*</Text>
                    <View style={[styles.action, {borderWidth:password.passwordBorder}]}>
                    <FontAwesome name='lock' color='#05375a' size={20}/>
                    <TextInput onTouch onBlur={() => handlePasswordBlur()}
                    onFocus={() => handlePasswordFocus()}
                    placeholder="Your Password" style={styles.textInput} secureTextEntry={password.isHiddenPassword} onChangeText={(val)=>handlePasswordChange(val)}/>
                    {password.passwordVerified &&
                    <FontAwesome name='eye-slash' color='#05375a' size={20} style={{paddingHorizontal:10}} onPress={()=> setPassword({...password,isHiddenPassword:!password.isHiddenPassword })}/>
                    }
                    </View>
                    {password.passwordVerified===false && password.passwordTouched &&
                    <Text style={styles.errors}>Password is required</Text>
                    }

                    <Text style={[styles.labelText,{marginTop: 15}]}>Current Password*</Text>
                    <View style={[styles.action, {borderWidth:currentPassword.currentPasswordBorder}]}>
                    <FontAwesome name='lock' color='#05375a' size={20}/>
                    <TextInput onTouch onBlur={() => handleCurrentPasswordBlur()}
                    onFocus={() => handleCurrentPasswordFocus()}
                    placeholder="Your Password" style={styles.textInput} secureTextEntry={currentPassword.isHiddenCurrentPassword} onChangeText={(val)=>handleCurrentPasswordChange(val)}/>
                    {currentPassword.currentPasswordVerified &&
                    <FontAwesome name='eye-slash' color='#05375a' size={20} style={{paddingHorizontal:10}} onPress={()=> setCurrentPassword({...currentPassword,isHiddenCurrentPassword:!currentPassword.isHiddenCurrentPassword })}/>
                    }
                    </View>
                    {currentPassword.currentPasswordVerified===false && currentPassword.currentPasswordTouched &&
                    <Text style={styles.errors}>Your Current Password is required</Text>
                    }
                    <TouchableOpacity style={[styles.button,{opacity: buttonAffichage.resetButton,}]}
                     disabled={!(password.passwordVerified&&currentPassword.currentPasswordVerified)} >
                        <Text>Reset Password</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTextHeader}>Add device</Text>

                    <Text style={[styles.labelText,{marginTop: 15}]}>Device Name</Text>
                    <View style={[styles.action, {borderWidth:deviceName.deviceNameBorder}]}>
                    <FontAwesome name='font' color='#05375a' size={20}/>
                    <TextInput onTouch onBlur={() => handleDeviceNameBlur()}
                    onFocus={() => handleDeviceNameFocus()}
                    placeholder="Device Name" style={styles.textInput}  onChangeText={(val)=>handleDeviceNameChange(val)}/>
                    {deviceName.deviceNameVerified &&
                <FontAwesome name='check-circle' color='#05375a' size={18} style={{paddingHorizontal:20}}/>
                }
                    </View>
                    {deviceName.deviceNameVerified===false && deviceName.deviceNameTouched &&
                    <Text style={styles.errors}>The device Name is required</Text>
                    }

                    <Text style={[styles.labelText,{marginTop: 15}]}>Device Number</Text>
                    <View style={[styles.action, {borderWidth:deviceNumber.deviceNumberBorder}]}>
                    <FontAwesome name='phone' color='#05375a' size={20}/>
                    <TextInput onTouch onBlur={() => handleDeviceNumberBlur()}
                    onFocus={() => handleDeviceNumberFocus()}
                    placeholder="Device Name" style={styles.textInput}  onChangeText={(val)=>handleDeviceNumberChange(val)}/>
                    {deviceNumber.deviceNumberVerified &&
                <FontAwesome name='check-circle' color='#05375a' size={18} style={{paddingHorizontal:20}}/>
                }
                    </View>
                    {deviceNumber.deviceNumberVerified===false && deviceNumber.deviceNumberTouched &&
                    <Text style={styles.errors}>The device Number is required as digits</Text>
                    }
                    
                    <TouchableOpacity disabled={!(deviceName.deviceNameVerified && deviceNumber.deviceNumberVerified)}
                    style={[styles.button,{opacity:buttonAffichage.addDeviceButton}]} onPress={()=>handleAddDevice()}>
                        <Text>Add device</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyBoardAvoidingViewWrapper>
     );
}
 
export default ProfileScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    section :{
        marginVertical:10,
        borderColor:'#009387',
        borderWidth:5,
        width:'100%',
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    errors:{
        fontSize: 15,
        paddingLeft: 12,
        color:'red'
    },
    
    sectionTextHeader : {
        fontSize: 30,
        fontWeight:'bold'
    },

    labelText:{
        fontSize:20
    },

    action: {
        flexDirection: 'row',
        marginHorizontal:20,
        marginTop: 13,
        marginBottom:13,
        paddingLeft: 15,
        color: '#05375a',
        borderColor: 'black',
        paddingTop: 10,
        borderRadius: 100
    },

    textInput: {
        flex:1,
        marginTop: -12,
        fontSize:20,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: 20 ,
        backgroundColor : '#009387',
        height:40,
        width : '50%',
        borderRadius: 80
        
    },
});