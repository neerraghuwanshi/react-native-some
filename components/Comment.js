import React, { memo } from 'react'
import { View, StyleSheet, Image } from 'react-native'

import {  
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';
import TitleText from './TitleText'
import BodyText from './BodyText'


function Comment(props) {

    const { commentor, comment, commentor_image } = props.data

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.authorImage} 
                    resizeMode={'cover'} 
                    source={{
                        uri: commentor_image ? 
                                commentor_image : 
                                'media'
                    }}/>
            </View>
            <View style={styles.verticalContainer}>
                <TitleText>
                    {commentor}
                </TitleText>
                <BodyText>
                    {comment}
                </BodyText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: windowWidth - windowWidth/15,
        flexDirection: 'row',
        alignItems: 'center',
        margin: windowWidth/50,
        marginBottom: 0,
    },
    verticalContainer:{
        paddingRight: windowWidth/15 + windowHeight/20,
    },
    authorImage:{
        width: windowHeight/20,
        height: windowHeight/20,
        borderRadius: windowHeight/40,
        marginRight: windowWidth/40,
        backgroundColor: 'black',
    },
    imageContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
    }
})


export default memo(Comment)