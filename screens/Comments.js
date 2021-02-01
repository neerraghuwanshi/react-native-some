import React, { useEffect, useState, memo } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import Comment from '../components/Comment'
import Colors from '../constants/Colors'
import { FetchComments, CreateComment } from '../store/actions/postFunctions'
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';


function Comments(props) {

    const blogId = props.navigation.getParam('id')

    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [page, setPage] = useState(1)

    const createComment = () => {
        setComment('')
        dispatch(CreateComment(blogId, comment, setComments))
    }

    const fetchComments = () => {
        setIsRefreshing(true)
        dispatch(FetchComments(blogId, setComments, page, setPage, setIsRefreshing))
    }

    const fetchMoreComments = () => {
        if (!isRefreshing && page){
            dispatch(FetchComments(blogId, setComments, page,setPage))
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const sendSize = windowWidth/40 < 30 ? 30 : windowHeight/40

    return (
        <View style={styles.container}>
            {comments ?
            <FlatList
                data={comments}
                renderItem={
                    ({item}) => (
                        <Comment {...props} data={item} />
                    )
                }
                keyExtractor={(item, index)=>item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={fetchComments}/>
                }
                extraData={comments}
                initialNumToRender={15}
                onEndReached={fetchMoreComments}
                onEndReachedThreshold={0}
                showsVerticalScrollIndicator={false}/> :
            <ActivityIndicator 
                size="large" 
                color={Colors.primary}/>}
            <View style={styles.textInputContainer}>
                <TextInput 
                    style={styles.input}
                    value={comment}
                    onChangeText={text=>setComment(text)}
                    autoCapitalize={'none'}/>
                    <TouchableOpacity
                        onPress={createComment}>
                        <View style={styles.sendContainer}>
                            <Ionicons 
                                name={'md-send'} 
                                size={sendSize} 
                                color={'blue'} />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingBottom: windowHeight/40,
        marginLeft:'auto',
        marginRight:'auto',
        width: containerWidth(),
        backgroundColor:'white',
    },
    input:{
        flex:1,
        borderColor: 'black',
        borderWidth:1,
        textAlign:'center',
        marginRight:windowWidth/20,
        fontFamily:'open-sans',
        fontSize:windowHeight/50,
        paddingVertical:windowHeight/160,
    },
    textInputContainer:{
        flexDirection:'row',
        paddingHorizontal:windowWidth/50,
        height:windowHeight/25,
        minHeight:30,
        marginTop:windowHeight/80
    },
    sendContainer:{
        justifyContent:'center',
        alignItems:'center',
        minHeight:30
    },
    authorImage:{
        width: windowHeight/20,
        height: windowHeight/20,
        borderRadius: windowHeight/40,
        marginRight: windowWidth/40,
        backgroundColor: 'black',
    },
})


export default memo(Comments)
