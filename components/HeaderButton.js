import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { windowWidth } from '../constants/screenSize'

const iconSize = windowWidth/18

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={iconSize}
      color={'black'}
    />
  );
};

export default CustomHeaderButton;