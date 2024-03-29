import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import TitleText  from "./TitleText";
import BodyText  from "./BodyText";
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';


const UserDescription = (props) => {

    const {
        first_name, 
        last_name, 
        following_count, 
        follower_count, 
        username, 
        bio, 
        posts, 
        image
    } = props.data

    return(
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                <TitleText>
                    {username ? username : ''}
                </TitleText>
            </View>
            <View style={styles.rowContainer}>
                <Image 
                    style={styles.image} 
                    resizeMode={'cover'} 
                    source={{
                        uri: image ? image : 'image',
                    }}/>
                <View style={styles.columnContainer}>
                    <TitleText>
                        {posts ? posts : 0}
                    </TitleText>
                    <BodyText>
                        {'Posts'}
                    </BodyText>
                </View>
                <View style={styles.columnContainer}>
                    <TitleText>
                        {follower_count ? follower_count : 0}
                    </TitleText>
                    <BodyText>
                        {'Followers'}
                    </BodyText>
                </View>
                <View style={styles.columnContainer}>
                    <TitleText>
                        {following_count ? following_count : 0}
                    </TitleText>
                    <BodyText>
                        {'Following'}
                    </BodyText>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <TitleText>
                    {first_name}{' '}{last_name}
                </TitleText>
            </View>
            {bio ?
            <View style={styles.rowContainer}>
                <BodyText>
                    {bio}
                </BodyText>
            </View> :
            <View></View>}
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
        width: containerWidth(),
        justifyContent: 'center',
        padding: windowHeight/45,
        backgroundColor: 'whitesmoke',
    },
    rowContainer : {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        paddingTop:windowHeight/80,
        justifyContent: windowWidth > 515 ? 
                            'space-evenly' : 
                            'space-between',
    },
    columnContainer : {
        alignItems: 'center',
        justifyContent:'center',
    },
    image:{
        width:windowWidth/4,
        height:windowWidth/4,
        backgroundColor: 'black',
        borderRadius:windowWidth/2,
        marginBottom:windowHeight/80,
    },
    buttonContainer:{
        marginTop:windowWidth/40,
    }
})


export default React.memo(UserDescription)
            