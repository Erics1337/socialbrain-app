import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Navbar from '../components/home/Navbar';
import Stories from '../components/home/Stories';
import Posts from '../components/home/posts/Posts';
import BottomTabs from '../components/home/BottomTabs';


const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Navbar navigation={navigation} />
            <Stories />
            <ScrollView>
                {/* <Posts /> */}
            </ScrollView>
            <BottomTabs />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
})

export default HomeScreen
