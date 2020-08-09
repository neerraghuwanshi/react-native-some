import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import TitleText  from "./TitleText";
import BodyText  from "./BodyText";
import { containerWidth, windowHeight, windowWidth } from '../constants/screenSize';


const UserDescription = (props) => {

    const {first_name, last_name, following_count, follower_count, username, bio, posts, image} = props.data

    return(
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                <TitleText>{username}</TitleText>
            </View>
            <View style={styles.rowContainer}>
                <Image style={styles.image} resizeMode={'cover'} source={{uri: image ? image : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}}/>
                <View style={styles.columnContainer}>
                    <TitleText>{posts ? posts : 0}</TitleText>
                    <BodyText>{'Posts'}</BodyText>
                </View>
                <View style={styles.columnContainer}>
                    <TitleText>{follower_count ? follower_count : 0}</TitleText>
                    <BodyText>{'Followers'}</BodyText>
                </View>
                <View style={styles.columnContainer}>
                    <TitleText>{following_count ? following_count : 0}</TitleText>
                    <BodyText>{'Following'}</BodyText>
                </View>
            </View>
            <View style={styles.rowContainer}>
            <TitleText>{first_name}{' '}{last_name}</TitleText>
            </View>
            <View style={styles.rowContainer}>
                <BodyText>{bio}</BodyText>
            </View>
            <View style={styles.buttonContainer}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        padding:windowHeight/45,
        width:containerWidth()
    },
    rowContainer : {
        flex:1,
        flexDirection:'row',
        justifyContent: windowWidth > 515 ? 'space-evenly' : 'space-between',
        alignItems: 'center',
        paddingTop:windowHeight/80
    },
    columnContainer : {
        alignItems: 'center',
        justifyContent:'center'
    },
    image:{
        width:windowWidth/4,
        height:windowWidth/4,
        borderRadius:windowWidth/2,
        marginBottom:windowHeight/80,
    },
    buttonContainer:{
        marginTop:windowWidth/40,
        marginBottom:windowWidth/100
    }
})


export default React.memo(UserDescription)
            