import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';

import Card from './Card'
import BodyText from './BodyText'
import TitleText from './TitleText'
import { 
    LikePost, 
    DeletePost 
} from '../store/actions/postFunctions'
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';


const PostItem = (props) => {
    
    const {
        id, 
        likes, 
        caption, 
        author, 
        media, 
        author_image, 
        is_liked
    } = props.data

    const currentUsername = useSelector(
        state=>state.auth.username
    )

    const dispatch = useDispatch()

    const deletePost = () => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete the post",
            [{
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => dispatch(DeletePost(id))
            }]
          );
    }

    const navigateToComments = () => {
        props.navigation.navigate({
            routeName: 'Comments',
            params: {
                id: id
            }
        })
    }

    const heartSize = windowHeight/32
    const commentSize = windowHeight/30
    const delelteSize = windowHeight/35

    return (
        <Card style={styles.card}>
            <View 
                style={{
                    ...styles.rowContainer, 
                    marginTop: 0,
                }}>
                <View style={styles.usernameContainer}>
                    <TouchableOpacity 
                        style={styles.usernameContainer}
                        onPress={()=>{
                            props.navigation.navigate({
                                routeName: currentUsername === author ? 
                                            'UserDetail' : 
                                            'UserProfile',
                                params: {
                                    username: author
                                }
                            })
                        }}>
                        <Image 
                            style={styles.authorImage} 
                            resizeMode={'cover'} 
                            source={{
                                uri: author_image ? 
                                        author_image : 
                                        'media'
                            }}/>
                        <TitleText>
                            {author}
                        </TitleText>
                    </TouchableOpacity>
                </View>
                {currentUsername === author &&
                <TouchableOpacity
                    onPress={()=>deletePost(id)}>
                    <Ionicons 
                        name="ios-trash" 
                        size={delelteSize} 
                        color={'black'}/>
                </TouchableOpacity>}
            </View>
            <View style={styles.contentContainer}>
                {media &&
                <>
                    {media.match(/\.(jpeg|jpg|png)$/) != null &&<Image 
                        style={styles.image} 
                        resizeMode={'cover'} 
                        source={{
                            uri: media ?
                                    media :
                                    'media'
                        }}/>}
                    {media.match(/\.(mp4|mov|3gp)$/) != null &&<Video
                        style={styles.image}
                        source={{ 
                            uri: media ? 
                                    media :
                                    'media'
                        }}
                        resizeMode='cover'
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        shouldPlay />}
                </>}
            </View>
            {caption &&
            <View 
                style={{
                    ...styles.captionContainer,
                    marginTop: media ?
                                windowHeight/100 :
                                0,
                    }}>
                <BodyText>
                    {caption}
                </BodyText>
            </View>}
            <View  style={styles.rowContainer}>
                <TouchableOpacity 
                    onPress={
                        ()=>dispatch(LikePost(id, is_liked))
                    }>
                    <AntDesign 
                        name={
                            is_liked ? 
                                'heart' : 
                                'hearto'
                        } 
                        color={'red'} 
                        size={heartSize} /> 
                </TouchableOpacity>
                    <TitleText>
                        Liked By {likes.length}
                    </TitleText>
                <TouchableOpacity
                    onPress={navigateToComments}>
                    <Feather 
                        name="message-circle" 
                        size={commentSize} 
                        color={'black'} />
                </TouchableOpacity>
            </View>
        </Card>
)}


const width = () => {
    if(windowHeight > (1.3 * windowWidth)){
        return containerWidth()
    }
    else{
        return windowWidth
    }
}


const styles = StyleSheet.create({
    rowContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: windowWidth/40,
        marginTop: windowHeight/100,
        marginBottom: windowHeight > 900 ? 10 : 5
    },
    usernameContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    captionContainer : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: width(),
        height: width(),
        backgroundColor: 'black',
    },
    authorImage:{
        width: windowHeight/20,
        height: windowHeight/20,
        borderRadius: windowHeight/40,
        marginRight: windowWidth/40,
        backgroundColor: 'black',
    },
    card:{
        marginBottom: windowHeight/40,
        borderRadius: 0,
        paddingTop: windowHeight > 900 ? 10 : 5
    }
})


export default React.memo(PostItem)