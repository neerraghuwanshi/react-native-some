import React from 'react'
import { Text } from 'react-native' 
import { windowHeight } from '../constants/screenSize' 

const BodyText = (props) => {
    return (
        <Text style={{
            fontFamily:'open-sans',
            fontSize:windowHeight/60
    }}>
        {props.children}
    </Text>
    )
}
export default BodyText