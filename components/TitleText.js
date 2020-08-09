import React from 'react'
import { Text } from 'react-native' 
import { windowHeight } from '../constants/screenSize' 

const TitleText = (props) => {
    return (
        <Text style={{
                fontFamily:'open-sans-bold',
                fontSize:windowHeight/60
        }}>
            {props.children}
        </Text>
    )
}

export default TitleText