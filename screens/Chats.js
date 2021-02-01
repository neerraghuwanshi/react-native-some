import React, { useState, useEffect, useCallback } from 'react'
import { 
    View, 
    StyleSheet, 
    FlatList, 
    Image,
    ActivityIndicator,
} from 'react-native'
import { useSelector } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HOST_URL } from "../settings";
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import WebSocketInstance from '../websocket/chatListWebsocket'
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';


function Chats(props) {  

    const currentUsername = useSelector(
        state => state.auth.username
    )

    const [chats, setChats] = useState([])
    
    const [loading, setLoading] = useState(true)
    // const [loadingMore, setLoadingMore] = useState(false)
    
    // let moreChatsAvailable= false
    let chatIndex = 0

    const fetchChats = () => {
        WebSocketInstance.fetchChats(
            currentUsername,
            chatIndex,
        )
    }

    const waitForSocketConnection = (callback) => {
        setTimeout(function() {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made")
                callback()
                return
            } 
            else {
                console.log("waiting for connection...")
                waitForSocketConnection(callback)
            }
        }, 100);
    }

    const initializeChatList = () => {
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                setChatList, 
                updateChats,
                moreChats,
            )
        })
        WebSocketInstance.connect(currentUsername)
    }

    const setChatList = (receivedChat) => {
        // if (receivedChat.length === 20){
        //     moreChatsAvailable = true
        // }
        // else {
        //     moreChatsAvailable = false
        // }
        setChats(receivedChat)
        // chatIndex = chatIndex + receivedChat.length
        setLoading(false)
    }

    const updateChats = (receivedChat) => {
        // setChats(
        //     prevChats => prevChats.filter(
        //         item => item.id !== receivedChat.id
        //     )
        // )
        // setChats(
        //     prevChats => [
        //         receivedChat,
        //         ...prevChats
        //     ]
        // )
    }

    const moreChats = (receivedChat) => {
        // if (receivedChat.length === 20){
        //     moreChatsAvailable = true
        // }
        // else {
        //     moreChatsAvailable = false
        // }
        // setChats(
        //     prevChats=>[
        //         ...prevChats,
        //         ...receivedChat
        //     ]
        //     )
        // chatIndex = chatIndex + receivedChat.length
        // setLoadingMore(false)
    }

    // const fetchMoreChats = useCallback(() => {
        // if (moreChatsAvailable){
        //     setLoadingMore(true)
        //     moreChatsAvailable = false
        //     WebSocketInstance.fetchMoreChats(
        //         currentUsername,
        //         chatIndex,
        //     )
        // }
    // }, [moreChatsAvailable, chatIndex])

    useEffect(() => {
        const fetchInterval = setInterval(() => {
            fetchChats()
        }, 1000)
        initializeChatList()
        return () => {
            WebSocketInstance.disconnect(currentUsername)
            clearInterval(fetchInterval)
        }
    }, [])

    const chatList = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.rowContainer} 
                onPress={() => {
                    props.navigation.navigate({
                        routeName:'Chat',
                        params: {
                            chatId: item.id,
                            username: item.username.find(
                                participant=>{
                                    participant!==currentUsername
                                }
                            )
                        }
                    })
                }}>
                <Image 
                    style={styles.image} 
                    resizeMode={'cover'} 
                    source={{
                        uri: item.user_image ? 
                                HOST_URL+item.user_image : 
                                'image'
                    }}/>
                <View>
                    <TitleText>
                        {item.username.find(participant => participant !== currentUsername)}
                    </TitleText>
                    {item.visited ?
                    <BodyText fontSize={windowHeight/70}>
                        {item.last_message.length > 20 ?
                            item.last_message.slice(0,20) + "..." :
                            item.last_message}
                    </BodyText> :
                    <TitleText fontSize={windowHeight/70}>
                        {item.last_message.length > 20 ?
                            item.last_message.slice(0,20) + "..." :
                            item.last_message}
                    </TitleText>}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        !loading ? 
        <View style={styles.container}>
            {/* {loadingMore && 
            <View style={{marginTop:windowHeight/80}}>
                <ActivityIndicator size="large"/>
            </View>} */}
            <FlatList
                data={chats} 
                renderItem={chatList}
                keyExtractor={(item, index)=>item.id.toString()}
                // onEndReached={fetchMoreChats}
                // onEndReachedThreshold={0} 
                initialNumToRender={15}
                contentConatainerStyle={styles.container}
                showsVerticalScrollIndicator={false}/>
        </View> :
        <View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        borderColor:'grey',
        width:containerWidth(),
        marginLeft:'auto',
        marginRight:'auto',
    },
    rowContainer: {
        flexDirection:'row',
        alignItems: 'center',
        padding:windowHeight/80,
        borderColor:'black',
        borderBottomWidth: 1,
    },
    image: {
        width:windowWidth/10,
        height:windowWidth/10,
        borderRadius:windowWidth/5,
        marginRight:windowWidth/20,
        backgroundColor: 'black',
    },
    loading: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
})


export default Chats