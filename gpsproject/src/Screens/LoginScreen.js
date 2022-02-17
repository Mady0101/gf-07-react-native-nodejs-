import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView , StyleSheet, Text, TextInput, View , TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getUser} from '../apiServices/UserServices';
import { UserContext } from '../contexts/UserContextProvider';





const LoginScreen = ({navigation}) => {

    const {updateUser} = useContext(UserContext)

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          return false;
        }
        else {
          return true
        }
      }

    const [state, setState]=useState({
        email:'',
        password:'',
        emailVerified: false,
        emailTouched:false,
        passwordVerified: false,
        isHiddenPassword: true,
        passwordTouched: false,
        emailBorder:0,
        passwordBorder:0,
    })

    const handleEmailChange = (val) =>{
        if(val.length !== 0){
            setState({...state,email:val})
        }
    }

    const handlePasswordChange = (val) =>{
        if(val.length !== 0){
            setState({...state,password:val,passwordVerified:true})
        }else{
            setState({...state, passwordVerified:false})
        }
    }

    const handleEmailFocus= () =>{
        setState({...state, emailBorder:1 })
    }

    const handleEmailBlur= () =>{
        setState({...state, emailBorder:0, emailVerified:validateEmail(state.email) ,emailTouched:true})
    }

    const handlePasswordFocus= () =>{
        setState({...state, passwordBorder:1 })
    }

    const handlePasswordBlur= () =>{
        setState({...state, passwordBorder:0 , passwordTouched:true})
    }

    const handleLogin= ()=>{
        getUser(state.email,state.password)
        .then(result => result.json())
        .then(json => {
            if(json.token){
                updateUser(json.user , json.token)
            }else{
                console.log('password or username wrong')
            }
        })
        .catch(err => console.log(err));
    }

    


    return ( 
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textHeader}>Welcome!</Text>
            <TouchableOpacity style={styles.navbutton} onPress={() => navigation.navigate('Signup')}>
               <Text style={styles.textnavButton}>SignUp</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <Text style={styles.textFooter}>Email</Text>
            <View style={[styles.action, {borderWidth:state.emailBorder}]}>
                <FontAwesome name='user-o' color='#05375a' size={20}/>
                <TextInput onBlur={() => handleEmailBlur()}
                 onFocus={() => handleEmailFocus()}
                 placeholder="Your Email" style={styles.textInput} onChangeText={(val)=>handleEmailChange(val)}/>
                {state.emailVerified &&
                <FontAwesome name='check-circle' color='#05375a' size={20} style={{paddingHorizontal:10}}/>
                }
            </View>
            {state.emailVerified===false && state.emailTouched &&
            <Text style={styles.errors}>Email is incorrect</Text>
            }
            <Text style={[styles.textFooter,{marginTop: 35}]}>Password</Text>
            <View style={[styles.action, {borderWidth:state.passwordBorder}]}>
                <FontAwesome name='lock' color='#05375a' size={20}/>
                <TextInput onTouch onBlur={() => handlePasswordBlur()}
                 onFocus={() => handlePasswordFocus()}
                placeholder="Your Password" style={styles.textInput} secureTextEntry={state.isHiddenPassword} onChangeText={(val)=>handlePasswordChange(val)}/>
                {state.passwordVerified &&
                <FontAwesome name='eye-slash' color='#05375a' size={20} style={{paddingHorizontal:10}} onPress={()=> setState({...state,isHiddenPassword:!state.isHiddenPassword })}/>
                }
            </View>
            {state.passwordVerified===false && state.passwordTouched &&
            <Text style={styles.errors}>Password is required</Text>
            }
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
               <Text style={styles.textButton}>SignIn</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView> );
}
 
export default LoginScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#009387'
    },
    header: {
        flex : 1,
        justifyContent : 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row'
    },
    footer: {
        flex : 3,
        backgroundColor : '#fff',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30 ,
        paddingHorizontal : 20,
        paddingVertical : 30,
    },
    textHeader: {
        color: '#fff',
        fontWeight : 'bold',
        fontSize: 30
    },
    textFooter: {
        color: '#05375a',
        fontSize: 18,
        paddingLeft: 12,
    },
    errors:{
        fontSize: 15,
        paddingLeft: 12,
        color:'red'
    },
    action: {
        flexDirection: 'row',
        marginTop: 13,
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
        marginTop: 20 ,
        backgroundColor : '#009387',
        height:40,
        width : '50%',
        marginLeft: '25%',
        borderRadius: 80
        
    },
    textButton:{
        color: '#fff',
        fontSize:20,
        fontWeight:'bold'
    },
    SignIn: {
        width: '100%' ,
        height: 50 ,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    navbutton: {
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor : '#fff',
        height:40,
        width : '30%',
        borderRadius: 80,
        marginRight: 20
    },
    textnavButton:{
        color: '#009387',
        fontSize:20,
        fontWeight:'bold'
    }
});