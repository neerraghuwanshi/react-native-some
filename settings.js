import { Platform } from 'react-native';

let DEBUG = true;
let HOST_URL = 'https://justdjango-chat.herokuapp.com';
let SOCKET_URL = 'wss://justdjango-chat.herokuapp.com';

if (DEBUG) {
    HOST_URL =  Platform.OS === 'android' ? 
                    'http://10.0.2.2:8000' :
                    'http://127.0.0.1:8000'
    SOCKET_URL = Platform.OS === 'android' ? 
                    'ws://10.0.2.2' :
                    'ws://127.0.0.1:8000'
}


export { HOST_URL, SOCKET_URL };