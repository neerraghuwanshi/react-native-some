import React, { useState, useEffect, useCallback } from 'react'
import { 
    View, 
    StyleSheet, 
    RefreshControl, 
    FlatList, 
    ActivityIndicator 
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { FetchPosts, FetchMorePosts } from '../store/actions/fetch'
import PostItem from './PostItem'
import { 
    containerWidth, 
    windowHeight, 
    windowWidth 
} from '../constants/screenSize';


const PostList = (props) => {

    const { userDetail, userProfile } = props

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const dispatch = useDispatch()

    const fetchPosts = useCallback(() => {
        setIsRefreshing(true);
        dispatch(FetchPosts(userDetail, userProfile))
        setIsRefreshing(false);
    },[])

    const fetchMorePosts = () => {
        setLoadingMore(true)
        dispatch(FetchMorePosts(userDetail, userProfile))
        setLoadingMore(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const home = useSelector(
        state => state.home.homePosts
    )
    const user = useSelector(
        state => state.user.userPosts
    )
    const profile = useSelector(
        state => state.profile.profilePosts
    )
    
    let posts = userDetail ? 
                    user :
                    userProfile ? 
                        profile : 
                        home

    return (
        <View style={styles.container}>   
            {posts ? 
            <FlatList
                data={posts}
                renderItem={
                    ({item}) => (
                        <PostItem {...props} data={item}/>
                    )
                }
                keyExtractor={(item, index)=>item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={fetchPosts}/>
                }
                initialNumToRender={7}
                contentConatainerStyle={styles.container}
                onEndReached={fetchMorePosts}
                onEndReachedThreshold={0} 
                ListHeaderComponent={props.ListHeaderComponent}
                showsVerticalScrollIndicator={false}
                extraData={posts}
                ListFooterComponent={ 
                    loadingMore && 
                    <View style={{marginBottom:windowHeight/40}}>
                        <ActivityIndicator size="large"/>
                    </View>
                }
            /> : 
            <ActivityIndicator size="large"/>}
        </View> 
    )
}


const width = () => {
    if(windowHeight > (1.3 * windowWidth)){
        return containerWidth()
    }
    else{
        return windowWidth
    }
}


const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        marginLeft:'auto',
        marginRight:'auto',
        width:width()
    }
})


export default React.memo(PostList)