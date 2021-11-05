import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Header from '../components/home/Header';
import Post from "../components/home/Post";
import Stories from '../components/home/Stories';
import { POSTS } from '../data/posts';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <ScrollView>
                {POSTS.map((post, i) => (
                    <Post post={post} key={i}/>
                ))}
            </ScrollView>
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
