import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Card from './Card'
import { LikePost, DeletePost } from '../store/actions/postFunctions'
import TitleText from './TitleText'
import BodyText from './BodyText'
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';


const PostItem = (props) => {
    const {id, likes, caption, author, image, author_image, is_liked} = props.data
    const { userProfile } = props
    const currentUsername = useSelector(state=>state.auth.username)
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

    const heartSize = windowHeight/32
    const commentSize = windowHeight/30
    const delelteSize = windowHeight/40

    return (
        <Card style={styles.card}>
            <View style={styles.rowContainer}>
                <View style={styles.usernameContainer}>
                <TouchableOpacity style={styles.usernameContainer}
                    onPress={()=>{
                        props.navigation.navigate({
                            routeName: currentUsername === author ? 'UserDetail' : 'UserProfile',
                            params:{
                                username:author
                            }
                        })
                    }
                }>
                <Image style={styles.authorImage} resizeMode={'cover'} source={{uri: author_image ? author_image : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                <TitleText>{author}</TitleText>
                </TouchableOpacity>
                </View>
                {currentUsername === author &&
                <TouchableOpacity
                onPress={()=>deletePost(id)}>
                    <Ionicons name="ios-trash" size={delelteSize} color={'black'} />
                </TouchableOpacity>}
            </View>
            <View style={styles.contentContainer}>
                {image && <Image style={styles.image} resizeMode={'cover'} source={{uri:image}}/>}
            </View>
            <View style={styles.captionContainer}>
                <BodyText>{caption}</BodyText>
            </View>
            <View  style={styles.rowContainer}>
                <TouchableOpacity 
                    onPress={
                        ()=>dispatch(LikePost(id, is_liked))
                    }>
                    <AntDesign name={is_liked ? 'heart' : 'hearto'} color={'red'} size={heartSize}/> 
                </TouchableOpacity>
                    <TitleText>Liked By {likes.length}</TitleText>
                <TouchableOpacity>
                    <Feather name="message-circle" size={commentSize} color={'black'} />
                </TouchableOpacity>
            </View>
        </Card>
)}

const width = () => {
    if(windowHeight>1.3*windowWidth){
        return containerWidth()
    }
    else{
        return windowWidth
    }
}

const styles = StyleSheet.create({
    rowContainer : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:windowWidth/40,
        marginBottom:windowHeight > 900 ? 10 : 5
    },
    usernameContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    captionContainer : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:windowHeight/100,
        marginBottom:windowHeight/200
    },
    image:{
        width:width(),
        height:width()
    },
    authorImage:{
        width:windowHeight/20,
        height:windowHeight/20,
        borderRadius:windowHeight/40,
        marginRight:windowWidth/40,
    },
    card:{
        marginBottom:windowHeight/40,
        borderRadius:0,
        paddingTop:windowHeight > 900 ? 10 : 5
    }
})

export default React.memo(PostItem)