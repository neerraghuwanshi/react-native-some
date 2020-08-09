import React, {useState, useEffect, useCallback} from 'react'
import { View, StyleSheet, AsyncStorage, Alert, RefreshControl, FlatList, Image } from 'react-native'
import TitleText from '../components/TitleText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HOST_URL } from "../settings";
import { useSelector } from "react-redux";
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';
import WebSocketInstance from '../websocket/chatListWebsocket'
import BodyText from '../components/BodyText';


function Chats(props) {  

    const currentUsername = useSelector(state => state.auth.username)
    const [chats, setChats] = useState([])
    let loading = true
    let loadingMore = false
    let moreChatsAvailable= false
    let chatIndex = 0

    const waitForSocketConnection = (callback) => {
        setTimeout(function() {
          if (WebSocketInstance.state() === 1) {
            console.log("Connection is made");
            callback();
            return;
          } else {
            console.log("waiting for connection...");
            waitForSocketConnection(callback);
          }
        }, 100);
    }

    const initializeChatList = () => {
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(setChatList, moreChats, updateChats)
            WebSocketInstance.fetchChats(
            currentUsername,
            chatIndex
            );
        });
        WebSocketInstance.connect(currentUsername)
    }

    const moreChats = (chats) => {
        if (chats.length===21){
            setChats(prevChats=>[...prevChats,...chats.slice(0,20)])
            chatIndex = chatIndex + chats.length-1
            moreChatsAvailable = true
        }
        else if (chats.length<21){
            setChats(prevChats=>[...prevChats,...chats])
            chatIndex = chatIndex + chats.length
            moreChatsAvailable = false
        }
        loadingMore = false
    }

    const updateChats = (chat) => {
        setChats(prevChats=>prevChats.filter(item=>item.id!==chat.id))
        setChats(prevChats=>[chat,...prevChats])
    }

    const setChatList = (chats) => {
        if (chats.length===21){
            setChats(chats.slice(0,20))
            chatIndex = chatIndex + chats.length - 1
            moreChatsAvailable = true
            
        }
        else if (chats.length<21){
            setChats(chats)
            chatIndex = chatIndex + chats.length
            moreChatsAvailable = false
        }
        loading = false
    }

    const fetchMoreChats = useCallback(() => {
        if (moreChatsAvailable){
            loadingMore = true
            moreChatsAvailable = false
            WebSocketInstance.fetchMoreChats(currentUsername,chatIndex)
        }
    },[moreChatsAvailable, chatIndex])

    useEffect(() => {
        initializeChatList()
        return () => {
            WebSocketInstance.disconnect(currentUsername)
        }
    }, [])

    const chatList = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.rowContainer} 
                onPress={()=>{
                    props.navigation.navigate({
                    routeName:'Chat',
                    params: {
                        chatId: item.id,
                        currentUsername: currentUsername,
                        username: item.username.find(participant=>participant!==currentUsername)
                    }
                })}}>
                <Image style={styles.image} resizeMode={'cover'} source={{uri:item.user_image ? HOST_URL+item.user_image : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                <View>
                    <TitleText>{item.username.find(participant=>participant!==currentUsername)}</TitleText>
                    <BodyText>{item.last_message.length>20 ? item.last_message.slice(0,20)+"..." : item.last_message}</BodyText>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        loading ? 
        <View style={styles.container}>
            {loadingMore && 
                    <View style={{marginTop:windowHeight/80}}>
                        <ActivityIndicator size="large"/>
                    </View>}
            <FlatList
                data={chats} 
                renderItem={chatList}
                keyExtractor={(item,index)=>item.id.toString()}
                onEndReached={fetchMoreChats}
                onEndReachedThreshold={0} 
                initialNumToRender={15}
                contentConatainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            />
        </View> :
        <View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>

    )
}

export default Chats


const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        borderColor:'grey',
        width:containerWidth(),
        marginLeft:'auto',
        marginRight:'auto',
    },
    rowContainer : {
        flexDirection:'row',
        alignItems: 'center',
        padding:windowHeight/80,
        borderColor:'black',
        borderBottomWidth: 1,
    },
    image:{
        width:windowWidth/10,
        height:windowWidth/10,
        borderRadius:windowWidth/5,
        marginRight:windowWidth/20
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
