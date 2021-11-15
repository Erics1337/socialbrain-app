import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import Header from '../components/home/Header';
import Post from "../components/home/Post";
import Stories from '../components/home/Stories';
import { POSTS } from '../data/posts';
import { db } from '../firebase';
import { collectionGroup, onSnapshot, getDocs, querySnapshot, orderBy, query, collection } from "@firebase/firestore"


const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState([])

    // Gets all posts
    useEffect(() => {
        onSnapshot(collectionGroup(db, 'posts'), snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    },[db])
    

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, i) => (
                    <Post post={post} key={i}/>
                ))}
                
            </ScrollView>
            <BottomTabs icons={bottomTabIcons} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
})

export default HomeScreen
