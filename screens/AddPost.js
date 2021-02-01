import React, { useState } from 'react'
import { View, StyleSheet, Image, TextInput } from 'react-native'
import { useDispatch } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Video } from 'expo-av';

import Card from '../components/Card'
import Button from '../components/Button'
import { pickImage } from '../helpers/pickImage'
import { CreatePost } from '../store/actions/postFunctions'
import { 
    containerWidth, 
    windowHeight 
} from '../constants/screenSize';


function AddPost(props) {

    const [media, setMedia] = useState(null);
    const [caption, setCaption] = useState(null);

    const dispatch = useDispatch()

    const inputChangeHandler = (text) => {
        if (text.length < 80){
            setCaption(text)
        }
    }

    const postButton = media || caption

    return (
        <View style={styles.container}>
            <Card style={styles.postContainer}>
                {media ? 
                <TouchableOpacity 
                    onPress={()=>pickImage(setMedia)}>
                    {media.type === 'image' ?
                    <Image
                        style={styles.image}
                        source={{uri: media.uri}}
                        resizeMode='cover'/> :
                    <Video
                        style={styles.image}
                        source={{ uri: media.uri }}
                        resizeMode='cover'
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        shouldPlay/>}
                </TouchableOpacity> :
                <View style={styles.imageButtonContainer}>
                    <Button 
                        title="Choose From Gallery" 
                        onPress={()=>pickImage(setMedia)} 
                        style={styles.button}/>
                </View>}
                <TextInput
                    style={styles.input}
                    multiline
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
                    onPress={()=>{
                        dispatch(CreatePost(media, caption, props.navigation))
                    }}/>
            </View> : null}
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
        paddingHorizontal: 10,
        fontSize:windowHeight/60,
        color:'black',
    },
    button:{
        borderRadius:0
    }
})


export default AddPost
