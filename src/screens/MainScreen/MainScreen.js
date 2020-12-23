import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../../redux/ducks/postDuck'
import { THEME } from '../../styles/theme'
import Post from './components/Post'

const MainScreen = ({navigation, booked}) => {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.post)
    const isLoading = useSelector(state => state.post.isLoading)

    useEffect(() => {
        dispatch(loadPosts())
    }, [])

    const list = booked ? posts.bookedPosts : posts.allPosts

    const goToPost = (data) => {
        navigation.navigate('Post', data)
    }

    if(isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    if(!list?.length) {
       return (
       <View>
            <Text style={styles.noItemsText}>no posts</Text>
        </View>)
    }
    
    return (
        <View style={styles.root}>
            <FlatList 
                data={list}
                style={{padding: 10}}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={goToPost} />}
            />
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemsText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'open-regular',
        fontSize: 20
    }
})
