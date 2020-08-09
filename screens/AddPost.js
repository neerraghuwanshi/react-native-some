import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, TextInput } from 'react-native'
import { useDispatch } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import { CreatePost } from '../store/actions/postFunctions'

import Card from '../components/Card'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { containerWidth, windowHeight } from '../constants/screenSize';
import Button from '../components/Button'


function AddPost(props) {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState(null);
    const dispatch = useDispatch()

    const inputChangeHandler = (text) => {
      if (text.length < 80){
        setCaption(text)
        console.log(text.length)
      }
    }

    useEffect(() => {
        (async () => {
          if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });

        if (!result.cancelled) {
          setImage(result);
        }
    };

    const postButton = image || caption

    return (
        <View style={styles.container}>
            <Card style={styles.postContainer}>
                {image ? 
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        style={styles.image}
                        resizeMode={'cover'}
                        source={{uri: image && image.uri}}/> 
                </TouchableOpacity> :
                <View style={styles.imageButtonContainer}>
                    <Button title="Choose Image" onPress={pickImage} style={styles.button}/>
                </View>}
                <TextInput
                    style={styles.input}w
                    keyboardType='default'
                    autoCapitalize='none'
                    onChangeText={inputChangeHandler}
                    value={caption}
                    placeholder='Caption'/>
            </Card>
            {postButton ?
              <View style={styles.buttonContainer}>
                  <Button
                      title={'Post'}
                      onPress={
                          ()=>dispatch(CreatePost(image,caption, props.navigation))
                      }/>
              </View> :
            null}
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
        width:containerWidth(),
    },
    postContainer: {
      width: containerWidth()/1.25,
      paddingBottom: 10,
      borderRadius:0,
    },
    buttonContainer: {
      marginTop: windowHeight >= 750 ? windowHeight/40 : 15,
    },
    imageButtonContainer: {
      marginBottom: windowHeight >= 750 ? windowHeight/100 : 10,
    },
    image:{
        width:containerWidth()/1.25,
        height:containerWidth()/1.25,
        marginBottom: windowHeight >= 750 ? windowHeight/100 : 10,
    },
    input:{
      textAlign:"center",
      fontFamily:'open-sans',
      fontSize:windowHeight/60,
      color:'black',
    },
    button:{
      borderRadius:0
    }
})

export default AddPost
