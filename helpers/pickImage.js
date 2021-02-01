import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native'

export const pickImage = async (setMedia) => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        if (!result.cancelled) {
            if (result.uri.match(/\.(mp4|mov|3gp|jpg|jpeg|png)$/) != null){
                setMedia(result)
            }
            else{
                Alert.alert('Choose Right Media', 'Media should only be of mp4, 3gp, mov, png, jpg or jpeg extension',[{text:'Ok'}])
            }
        }
    }
}