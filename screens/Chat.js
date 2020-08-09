import React, {useState, useEffect, useCallback} from 'react'
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import Card from '../components/Card'
import BodyText from '../components/BodyText'
import WebSocketInstance from '../websocket/chatWebsocket'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';


function Chat(props) {  

    const currentUsername = props.navigation.getParam('currentUsername')
    const chatId = props.navigation.getParam('chatId')

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    let loading = true
    let loadingMore = false
    let moreMessagesAvailable= false
    let messageIndex = 0
    
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

    const initializeChat = () => {
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(setConversation,addMessage,moreMessages)
            WebSocketInstance.fetchMessages(
            currentUsername,
            chatId,
            messageIndex
            );
        });
        WebSocketInstance.connect(chatId)
    }

    const addMessage = (chatMessage) => {
        setMessages(prevMessages=>[chatMessage,...prevMessages])
        messageIndex = messageIndex + 1
    }

    const moreMessages = (messages) => {
        if (messages.length===21){
            setMessages(prevMessages=>[...prevMessages,...messages.slice(0,20)])
            messageIndex = messageIndex + messages.length-1
            moreMessagesAvailable = true
        }
        else if (messages.length<21){
            setMessages(prevMessages=>[...prevMessages,...messages])
            messageIndex = messageIndex + messages.length
            moreMessagesAvailable = false
        }
        loadingMore = false
    }

    const setConversation = (messages) => {
        if (messages.length===21){
            setMessages(messages.slice(0,20))
            messageIndex = messageIndex + messages.length - 1
            moreMessagesAvailable = true
        }
        else if (messages.length<21){
            setMessages(messages)
            messageIndex = messageIndex + messages.length
            moreMessagesAvailable = false
        }
        loading = false
    }
    
    const sendMessageHandler = () => {
        if (message.length !== 0){
            const messageObject = {
              from: currentUsername,
              content: message,
              chatId
            };
            WebSocketInstance.newChatMessage(messageObject);
            setMessage('')
        }
    };

    useEffect(() => {
        initializeChat()
        return () => {
            WebSocketInstance.disconnect(chatId)
        }
    }, [])

    const fetchMoreMessages = useCallback(() => {
        if (moreMessagesAvailable){
            moreMessagesAvailable = false
            loadingMore = true
            WebSocketInstance.fetchMoreMessages(currentUsername,chatId,messageIndex)
        }
    },[moreMessagesAvailable, messageIndex])

    const sendSize = windowWidth/40 < 30 ? 30 : windowHeight/40

    return (
        <View style={styles.container}>
            {loadingMore && 
                    <View style={{marginTop:windowHeight/80}}>
                        <ActivityIndicator size="large"/>
                    </View>}
        {loading ?
        <View style={styles.messageContainer}>
            <FlatList
                inverted
                data={messages} 
                renderItem={({item})=>(
                    <View style={currentUsername!==item.author ? styles.leftContainer : styles.rightContainer}>
                        <Card style={styles.card}>
                            <BodyText>{item.content}</BodyText>
                        </Card>
                    </View>
                )}
                keyExtractor={(item,index)=>item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={fetchMoreMessages}
                onEndReachedThreshold={0}
                initialNumToRender={15}
                contentConatainerStyle={styles.container}
            /> 
        </View> :
        <View>
            <ActivityIndicator size={"large"}/>
        </View>}
        <View style={styles.textInputContainer}>
            <TextInput 
                style={styles.input}
                value={message}
                onChangeText={(text)=>setMessage(text)}
                autoCapitalize={'none'}/>
                <TouchableOpacity onPress={sendMessageHandler}>
                    <View style={styles.sendContainer}>
                    <Ionicons name={'md-send'} size={sendSize} color={'blue'} />
                    </View>
                </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        height:windowHeight,
        justifyContent:'flex-end',
        paddingBottom: windowHeight/40,
        marginLeft:'auto',
        marginRight:'auto',
        width: containerWidth(),
        backgroundColor:'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    messageContainer:{
        flex:1,
    },
    rowContainer : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:windowHeight/40
    },
    columnContainer : {
        width:'100%',
        justifyContent:'center'
    },
    leftContainer : {
        alignItems: 'flex-start',
        justifyContent:'center',
        marginRight:10,
    },
    rightContainer : {
        alignItems: 'flex-end',
        justifyContent:'center',
        marginLeft:containerWidth()/10,
    },
    card : {
        justifyContent: 'center',
        alignItems: 'center',
        padding:windowHeight/100,
        margin:windowHeight/80,
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
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

Chat.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('username')
}}


export default Chat