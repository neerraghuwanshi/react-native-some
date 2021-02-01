import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux' 

import Card from '../components/Card'
import Input from '../components/Input'
import { Login, SignUp, authSuccess } from '../store/actions/auth'
import { containerWidth, windowHeight } from '../constants/screenSize'
import AsyncStorage from '@react-native-community/async-storage'
import Button from '../components/Button'
import { 
    formReducer, 
    FORM_INPUT_UPDATE 
} from '../store/reducers/formReducer'
import { Platform } from 'react-native'


function Authentication(props) {

    const [triedAutoLogin, setTriedAutoLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [touched, setTouched] = useState(false);     
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            username:'',
            password: '',
            email: '',
            firstName:'',
            lastName:'',
        },
        inputValidities: {
            username:false,
            password: false,
            email: true,
            firstName: true,
            lastName: true,
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },[dispatchFormState]);

    const { username, password, email, firstName, lastName } = formState.inputValues

    const login = async() => {
        setTouched(true)
        if(formState.formIsValid){
            dispatch(Login(
                username, 
                password, 
                props.navigation,
            ))
        }
    }

    const signUp = async() => {
        setTouched(true)
        if(formState.formIsValid){
            dispatch(SignUp(
                username,
                email,
                password,
                firstName,
                lastName, 
                props.navigation,
            ))
        }
    }

    useEffect(() => {
        const tryLogin = async() => {
            let key = await AsyncStorage.getItem('token');
            let currentUsername = await AsyncStorage.getItem('username');
            dispatch(authSuccess(key, currentUsername))
            if (key === null){
                setTriedAutoLogin(true)
            }
            else {
                props.navigation.navigate('DrawerNavigator')
            }
        }
        tryLogin()
    },[])

    const switchTo = () => {
        setTouched(false)
        if(isLogin){
            inputChangeHandler('email',email,false)
            inputChangeHandler('firstName',firstName,false)
            inputChangeHandler('lastName',lastName,false)
        }
        else{
            inputChangeHandler('email',email,true)
            inputChangeHandler('firstName',firstName,true)
            inputChangeHandler('lastName',lastName,true)
        }
        setIsLogin(prevText=>!prevText)
    }

    return ( triedAutoLogin ?
        <KeyboardAvoidingView 
            behavior={
                Platform.OS === 'ios' ?
                    'padding' : 
                    ''
            }
            style={styles.container}>
            <Card style={styles.authContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        style={styles.input}
                        id='username'
                        label='Username'
                        keyboardType='default'
                        required
                        maxLength={20}
                        autoCapitalize='none'
                        onInputChange={inputChangeHandler}
                        touched={touched}
                        />
                    <Input
                        style={styles.input}
                        id='password'
                        label='Password'
                        keyboardType='default'
                        required
                        maxLength={20}
                        secureTextEntry
                        autoCapitalize='none'
                        minLength={8}
                        onInputChange={inputChangeHandler}
                        touched={touched}
                        />
                {!isLogin &&
                <View>
                    <Input
                        style={styles.input}
                        id='email'
                        label='E-mail'
                        keyboardType='default'
                        required
                        email
                        maxLength={20}
                        autoCapitalize='none'
                        onInputChange={inputChangeHandler}
                        touched={touched}
                        />
                    <Input
                        style={styles.input}
                        id='firstName'
                        label='First Name'
                        keyboardType='default'
                        required
                        maxLength={20}
                        autoCapitalize='none'
                        onInputChange={inputChangeHandler}
                        touched={touched}
                        />
                    <Input
                        style={styles.input}
                        id='lastName'
                        label='Last Name'
                        keyboardType='default'
                        required
                        maxLength={20}
                        autoCapitalize='none'
                        onInputChange={inputChangeHandler}
                        touched={touched}
                        />
                </View>}
                    {!state.loading ?
                    <View>
                        <View style={styles.loginContainer}>
                            <Button
                                title={
                                    isLogin ? 'Login' : 'Sign Up'
                                }
                                onPress={isLogin ? login : signUp}
                                style={{borderRadius:0}}/>
                        </View>
                        <View style={styles.signUpContainer}>
                            <Button 
                                title={
                                    `Switch to ${
                                        isLogin ?
                                        'Sign Up' :
                                        'Login'
                                    }`
                                } 
                                onPress={switchTo}
                                style={{borderRadius:0}}/>
                        </View>
                    </View> :
                    <View style={styles.buttonContainer}>
                        <ActivityIndicator size="small"/>
                    </View>}
                </ScrollView> 
            </Card>
        </KeyboardAvoidingView> :
        <View></View>
    ) 
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        width:containerWidth(),
        backgroundColor: 'whitesmoke'
    },
    authContainer: {
        width: containerWidth()/1.5,
        paddingVertical: windowHeight/160,
        paddingHorizontal: windowHeight/40,
    },
    loginContainer: {
      marginTop: windowHeight >= 750 ? windowHeight/30 : windowHeight/60,
    },
    signUpContainer: {
      marginTop: windowHeight >= 750 ? windowHeight/100 : windowHeight/60,
      marginBottom: windowHeight >= 750 ? windowHeight/100 : windowHeight/60
    },
    input:{
        paddingVertical: windowHeight >= 750 ? windowHeight/150 : 0,
    }
})


export default Authentication
