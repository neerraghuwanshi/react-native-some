import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";

import {UpdateProfile} from '../store/actions/profileFunctions'
import Input from '../components/Input'
import Card from '../components/Card'
import Constants from 'expo-constants'
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';
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
      ...state,
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

function EditProfile(props) {
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            bio: props.navigation.getParam('Bio'),
            first_name: props.navigation.getParam('first_name'),
            last_name: props.navigation.getParam('last_name')
        },
        inputValidities: {
          first_name: true,
          last_name: true,
          bio: true
        },
        formIsValid: true,
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          })
        },[dispatchFormState])

    const { bio, first_name, last_name } = formState.inputValues
    const image = props.navigation.getParam('image')
    const [photo, setPhoto] = useState(null);
    const [touched, setTouched] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
          if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera permissions to make this work!');
            }
          }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1
        });

        if (!result.cancelled) {
          setPhoto(result);
        }
    };

    const save = () => {
      setTouched(true)
      if(formState.formIsValid){
        dispatch(UpdateProfile(photo,{bio, first_name, last_name},props.navigation))
      }
    }

    return (
        <View style={styles.container}>
            <Card style={styles.postContainer}>
                <TouchableOpacity
                    onPress={pickImage}>
                    <Image style={styles.image} resizeMode={'cover'} source={{uri: photo ? photo.uri : image}}/>
                </TouchableOpacity>
                <Input
                    id='first_name'
                    label='First Name'
                    keyboardType='default'
                    required
                    autoCapitalize='none'
                    onInputChange={inputChangeHandler}
                    initialValue={props.navigation.getParam('firstName')}
                    initiallyValid={true}
                    touched={touched}
                    />
                <Input
                    id='last_name'
                    label='Last Name'
                    keyboardType='default'
                    required
                    autoCapitalize='none'
                    onInputChange={inputChangeHandler}
                    initialValue={props.navigation.getParam('lastName')}
                    touched={touched}
                    initiallyValid={true}
                    />
                <Input
                    id='bio'
                    label='Bio'
                    keyboardType='default'
                    autoCapitalize='none'
                    onInputChange={inputChangeHandler}
                    initialValue={props.navigation.getParam('Bio')}
                    initiallyValid={true}/>
                <View style={styles.buttonContainer}>
                    <Button
                      title={'Save'}
                      onPress={save}/>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke',
      marginLeft:'auto',
      marginRight:'auto',
      width:containerWidth()
    },
    postContainer: {
        flex: 1,
        width: containerWidth()/1.2,
        alignItems:'center',
        justifyContent:'space-between',
        padding: 20,
        borderRadius:0
    },
    image:{
        width:windowWidth/1.6,
        height:windowWidth/1.6,
        borderRadius:windowWidth/3.2,
        marginBottom:10,
    },
    buttonContainer: {
      width:'100%',
      margin:windowHeight/20,
    },
})

export default EditProfile
