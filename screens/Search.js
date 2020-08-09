import React, {useState, useCallback} from 'react'
import { View, TextInput, StyleSheet, Image } from 'react-native'
import axios from 'axios'
import {useSelector} from 'react-redux'
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';

function Search(props) {  

    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(false)

    const [userData, setUserData] = useState(null)

    const currentUsername = useSelector(state => state.auth.username)

    const fetchUserProfile = useCallback((username) => {
        axios.get(`http://127.0.0.1:8000/userprofile/${username}/`)
        .then(response=>{
            setUserData(response.data)
            setError(false)
        })
        .catch(()=>setError(true))
    },[])

    const getUserProfile = (username) => {
        props.navigation.navigate({
            routeName: username===currentUsername ? 'UserDetail' : 'UserProfile',
            params:{
                username
            }
        })
    }

    const searchHandler = async(text) => {
        setSearchTerm(text)
        fetchUserProfile(text)
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                value={searchTerm}
                onChangeText={searchHandler}
                autoCapitalize={'none'}
                placeholder={'Search...'}/>
            {!error  &&  userData  &&
            <View style={styles.profileContainer}>
                <TouchableOpacity 
                    style={styles.rowContainer} 
                    onPress={()=>getUserProfile(searchTerm)}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} resizeMode={'cover'} source={{uri: userData.image ? userData.image :'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                    </View>
                    <View style={styles.usernameContainer}>
                        <TitleText>{userData.username}</TitleText>
                        <BodyText>{userData.first_name}{' '}{userData.last_name}</BodyText>
                    </View>
                </TouchableOpacity>
            </View>}
            {error  &&
            <View style={styles.errorContainer}>
                <BodyText>User doesn't exists</BodyText>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding:20,
        marginTop: windowHeight/100,
        marginLeft:'auto',
        marginRight:'auto',
        width: containerWidth(),
    },
    input:{
        fontFamily:'open-sans',
        fontSize:windowHeight/60,
        textAlign:'center',
        borderColor: 'black',
        borderWidth:1,
        padding:10,
        alignItems: 'center',
        justifyContent:'center',
        margin:'auto'
    },
    profileContainer : {
        marginTop:windowHeight/50,
    },
    rowContainer : {
        width:'100%',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image:{
        width:windowWidth/7,
        height:windowWidth/7,
        borderRadius:windowWidth/14,
        marginRight:windowWidth/20
    },
    usernameContainer : {
        justifyContent:'center',
        alignItems:'flex-start',
    },
    errorContainer : {
        alignItems: 'center',
        justifyContent:'center',
        marginTop:windowHeight/10,
    },
})

export default React.memo(Search)