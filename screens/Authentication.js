import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, AsyncStorage, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux' 

import Card from '../components/Card'
import Input from '../components/Input'
import { Login, SignUp, authSuccess } from '../store/actions/auth'
import { containerWidth, windowHeight } from '../constants/screenSize'
import Button from '../components/Button'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

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
        if(formState.formIsValid)
        dispatch(Login(username,password))
    }

    const signUp = async() => {
        setTouched(true)
        if(formState.formIsValid)
        dispatch(SignUp(username,email,password,password,firstName,lastName))
    }

    useEffect(() => {
        const tryLogin = async() => {
            let key = await AsyncStorage.getItem('token');
            let currentUsername = await AsyncStorage.getItem('username');
            dispatch(authSuccess(key, currentUsername))
            if (key === null) setTriedAutoLogin(true)
            else {
                props.navigation.navigate('MainNavigator')
            }
        }
        tryLogin()
    })

    const switchTo = () => {
        setTouched(false)
        if(isLogin){
            inputChangeHandler('email',email,false)
            inputChangeHandler('firstName',firstName,false)
            inputChangeHandler('lastName',lastName,false)
        }else{
            inputChangeHandler('email',email,true)
            inputChangeHandler('firstName',firstName,true)
            inputChangeHandler('lastName',lastName,true)
        }
        setIsLogin(prevText=>!prevText)
    }

    return ( triedAutoLogin ?
        <KeyboardAvoidingView behavior="position"
        keyboardVerticalOffset={25}
        style={styles.container}>
            <Card style={styles.authContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        style={styles.input}
                        id='username'
                        label='Username'
                        keyboardType='default'
                        required
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
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    loginContainer: {
      marginTop: windowHeight >= 750 ? windowHeight/30 : 10,
      marginBottom:windowHeight >= 750 ? windowHeight/100 : 10
    },
    signUpContainer: {
      marginTop: windowHeight >= 750 ? windowHeight/100 : 10,
      marginBottom: windowHeight >= 750 ? windowHeight/100 : 10
    },
    input:{
        paddingVertical: windowHeight >= 750 ? windowHeight/150 : 0,
    }
})

export default Authentication
