import React from 'react'
import { Text } from 'react-native' 
import { windowHeight } from '../constants/screenSize' 


const BodyText = (props) => {

    return (
        <Text 
            style={{
                fontFamily: props.fontFamily ?
                                props.fontFamily : 
                                'open-sans',
                fontSize: props.fontSize ?  
                            props.fontSize : 
                            windowHeight/60,
            }}>
            {props.children}
        </Text>
    )
}


export default BodyText