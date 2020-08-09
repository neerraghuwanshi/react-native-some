import {Dimensions} from 'react-native'
export const windowHeight = Dimensions.get("window").height
export const windowWidth = Dimensions.get("window").width

export const containerWidth = () => {
    if(windowWidth >= 1200){
        return 1100
    }
    else if(windowWidth >= 992){
        return 900
    }
    else if (windowWidth >= 768) {
        return 720
    }
    else{
        return windowWidth
    }
}