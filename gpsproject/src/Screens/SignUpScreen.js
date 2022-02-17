import React from 'react';
import { SafeAreaView , StyleSheet, Text, TextInput, View , TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react/cjs/react.development';
import KeyBoardAvoidingViewWrapper from '../Wrappers/KeyBoardAvoidingViewWrapper';
import {addUser} from '../apiServices/UserServices';

const SignUpScreen = ({navigation}) => {

    /*const [query, setQuery]=useState(false);
    const [sendQuery, setSendQuery]=useState(false);

    useEffect(()=>{
        if(sendQuery === true){
        addUser({username:email.email , password:password.password});
        setSendQuery(false);
        }
    },[query]);*/

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          return false;
        }
        else {
          return true
        }
      }

      const validateConfirmedPassword =(password,confirmedPassword) =>{
          if(password === confirmedPassword)
          return true
          else
          return false
      }

    const [password, setPassword]= useState({
        password:'',
        passwordVerified: false,
        isHiddenPassword: true,
        passwordTouched: false,
        passwordBorder:0
    })

    const [email, setEmail] = useState({
        email:'',
        emailVerified: false,
        emailTouched:false,
        emailBorder:0
    })

    const[confirmedPassword, setConfirmedPassword] = useState({
        confirmedPassword:'',
        confirmedPasswordisHidden:true,
        confirmedPasswordVerified:false,
        confirmedPasswordTouched:false,
        confirmedPasswordBorder:0
    })

    const handleEmailChange = (val) =>{
        if(val.length !== 0 &&  validateEmail(email.email)){
            setEmail({...email,email:val, emailVerified:true})
        }else
        setEmail({...email, email:val})
    }

    const handlePasswordChange = (val) =>{
        if(val.length !== 0){
            setPassword({...password,password:val,passwordVerified:true})
        }else{
            setPassword({...password, passwordVerified:false})
        }
    }

    const handleConfirmedPasswordChange = (val) =>{
        if(val.length !== 0 && validateConfirmedPassword(password.password, val)){
            setConfirmedPassword({...confirmedPassword,confirmedPassword:val,confirmedPasswordVerified:true})
        }else{
            setConfirmedPassword({...confirmedPassword, confirmedPasswordVerified:false})
        }
    }

    const handleEmailFocus= () =>{
        setEmail({...email, emailBorder:1 })
    }

    const handleEmailBlur= () =>{
        setEmail({...email, emailBorder:0 ,emailTouched:true})
    }

    const handlePasswordFocus= () =>{
        setPassword({...password, passwordBorder:1 })
    }

    const handleConfirmedPasswordFocus= () =>{
        setConfirmedPassword({...confirmedPassword, confirmedPasswordBorder:1 })
    }

    const handleConfirmedPasswordBlur= () =>{
        setConfirmedPassword({...confirmedPassword, confirmedPasswordBorder:0 , confirmedPasswordTouched:true})
    }

    const handlePasswordBlur= () =>{
        setPassword({...password, passwordBorder:0 , passwordTouched:true})
    }

    const handleSignUp= () =>{
        if(email.emailVerified && password.passwordVerified && confirmedPassword.confirmedPasswordVerified){
        addUser({username:email.email , password:password.password})
        .then(result => {
            navigation.navigate('Login')})
        .catch(err => console.log(err));
        }else{
            console.log('please verify the chamsp')
        }
    }

    


    return ( 
    <KeyBoardAvoidingViewWrapper>
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textHeader}>Please fill the champs to signUp!</Text>
            <TouchableOpacity style={styles.navbutton} onPress={() => navigation.navigate('Login')}>
               <Text style={styles.textnavButton}>SignUp</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
            <Text style={styles.textFooter}>Email*</Text>
            <View style={[styles.action, {borderWidth:email.emailBorder}]}>
                <FontAwesome name='user-o' color='#05375a' size={20}/>
                <TextInput onBlur={() => handleEmailBlur()}
                 onFocus={() => handleEmailFocus()}
                 placeholder="Your Email" style={styles.textInput} onChangeText={(val)=>handleEmailChange(val)}/>
                {email.emailVerified &&
                    <FontAwesome name='check-circle' color='#05375a' size={20} style={{paddingHorizontal:10}}/>
                }
            </View>
            {email.emailVerified===false && email.emailTouched &&
                <Text style={styles.errors}>Email is incorrect</Text>
            }
            <Text style={[styles.textFooter,{marginTop: 35}]}>Password*</Text>
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
            <Text style={[styles.textFooter,{marginTop: 35}]}>Confirm Password*</Text>
            <View style={[styles.action, {borderWidth:confirmedPassword.confirmedPasswordBorder}]}>
                <FontAwesome name='lock' color='#05375a' size={20}/>
                <TextInput onTouch onBlur={() => handleConfirmedPasswordBlur()}
                 onFocus={() => handleConfirmedPasswordFocus()}
                placeholder="Your Password" style={styles.textInput} secureTextEntry={confirmedPassword.confirmedPasswordisHidden} onChangeText={(val)=>handleConfirmedPasswordChange(val)}/>
                {confirmedPassword.confirmedPasswordVerified &&
                <FontAwesome name='eye-slash' color='#05375a' size={20} style={{paddingHorizontal:10}} onPress={()=> setConfirmedPassword({...confirmedPassword,confirmedPasswordisHidden:!confirmedPassword.confirmedPasswordisHidden })}/>
                }
            </View>
            {confirmedPassword.confirmedPasswordVerified===false && confirmedPassword.confirmedPasswordTouched &&
            <Text style={styles.errors}>Please match your password</Text>
            }
            <TouchableOpacity style={styles.button} onPress={(e)=>{handleSignUp() }}>
               <Text style={styles.textButton}>SignUp</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
    </KeyBoardAvoidingViewWrapper>
     );
}
 
export default SignUpScreen;


const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#009387'
    },
    header: {
        flex : 1,
        justifyContent : 'space-between',
        paddingHorizontal : 20,
        paddingBottom : 50,
        flexDirection:'row'
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
        fontSize: 30,
        width: '60%'
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
        marginTop: 50 ,
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
        marginRight: 20,
        marginTop: 40
    },
    textnavButton:{
        color: '#009387',
        fontSize:20,
        fontWeight:'bold'
    }
});