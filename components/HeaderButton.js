import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { windowWidth } from '../constants/screenSize'
import { HeaderButton } from 'react-navigation-header-buttons';


const iconSize = windowWidth/18


const CustomHeaderButton = props => {

    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            color={'black'} 
            iconSize={iconSize}/>
    );
};


export default CustomHeaderButton;