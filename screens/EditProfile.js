import React, { 
    useState, 
    useCallback, 
    useReducer 
} from 'react'
import { useDispatch } from "react-redux";
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { pickImage } from '../helpers/pickImage'
import { UpdateProfile } from '../store/actions/profileFunctions'
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';
import { 
    formReducer, 
    FORM_INPUT_UPDATE 
} from '../store/reducers/formReducer'


function EditProfile(props) {

    const initialState = {
        inputValues: {
            bio: props.navigation.getParam('Bio'),
            first_name: props.navigation.getParam('first_name'),
            last_name: props.navigation.getParam('last_name'),
        },
        inputValidities: {
            first_name: true,
            last_name: true,
            bio: true,
        },
        formIsValid: true,
    }

    const [
        formState, 
        dispatchFormState
    ] = useReducer(formReducer, initialState);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]
    )

    const { bio, first_name, last_name } = formState.inputValues

    const image = props.navigation.getParam('image')

    const [photo, setPhoto] = useState(null)
    const [touched, setTouched] = useState(false)

    const dispatch = useDispatch()

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
                    onPress={()=>pickImage(setPhoto)}>
                    <Image 
                        style={styles.image} 
                        resizeMode={'cover'} 
                        source={{
                            uri: photo ? 
                                    photo.uri : 
                                    image ? 
                                        image :
                                        'image'
                        }}/>
                </TouchableOpacity>
                <Input
                    required
                    id='first_name'
                    label='First Name'
                    autoCapitalize='none'
                    keyboardType='default'
                    style={styles.input}
                    touched={touched}
                    initiallyValid={true}
                    onInputChange={inputChangeHandler}
                    maxLength={20}
                    initialValue={
                        props.navigation.getParam('firstName')
                    }/>
                <Input
                    id='last_name'
                    label='Last Name'
                    keyboardType='default'
                    style={styles.input}
                    required
                    maxLength={20}
                    autoCapitalize='none'
                    onInputChange={inputChangeHandler}
                    touched={touched}
                    initiallyValid={true}
                    initialValue={
                        props.navigation.getParam('lastName')
                    } />
                <Input
                    id='bio'
                    label='Bio'
                    autoCapitalize='none'
                    keyboardType='default'
                    style={styles.input}
                    maxLength={100}
                    multiline={true}
                    initiallyValid={true}
                    onInputChange={inputChangeHandler}
                    initialValue={
                        props.navigation.getParam('Bio')
                    }/>
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
        backgroundColor: 'black',
    },
    buttonContainer: {
        width:'100%',
        margin:windowHeight/20,
    },
    input:{
        paddingVertical: windowHeight >= 750 ? windowHeight/150 : 0,
    },
})


export default EditProfile
