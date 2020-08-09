import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../constants/screenSize'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Button = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress}>
                <View style={{...styles.container, ...props.style}}>
                    <Text style={{ ...styles.text, ...props.textStyle }}>
                        {props.title}
                    </Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'blue',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:20
    },
    text:{
        fontSize: windowHeight/50,
        fontFamily: 'open-sans-bold',
        color:'white',
        textAlign:"center"
    }
})