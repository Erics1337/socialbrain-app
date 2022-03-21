import React, { useContext, useState, useEffect } from "react"
import UserContext from "../../context/userContext"
import tw from "twrnc"
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable, ScrollView } from "react-native"
import { TabView, SceneMap } from "react-native-tab-view"
import { NativeBaseProvider, Box, Text, Center, useColorModeValue } from "native-base"
import Stories from './Stories'
import Posts from "./posts/Posts";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
	limit,
	get,
	getDocs,
	getDoc,
	doc
} from "@firebase/firestore"
import { db, auth } from "../../firebase"

function Tabs() {
	const [index, setIndex] = useState(0)
	const [posts, setPosts] = useState([])
	const [stories, setStories] = useState([])

	const {currentGroup, setCurrentGroup, currentUser} = useContext(UserContext)
	// const [routes] = useState([Object.keys(groups).map(group => ({ key: group, title: group })), { key: "all", title: "All" }])
	const [routes] = useState([{
		key: "all",
		title: "All"
	}, {
		key: "loved",
		title: "Loved"
	}, {
		key: "family",
		title: "Family"
	}, {
		key: "friends",
		title: "Friends"
	},{
		key: "connections",
		title: "Connections"
	},{
		key: "acquaintances",
		title: "Acquaintances"
	},{
		key: "recognizable",
		title: "Recognizable"
	}
])



	useEffect(() => {
		// console.log('currentGroup: ', currentGroup, 'currentUser: ', currentUser)
		const unsubscribe = onSnapshot(
			query(
				collection(db, "posts"),
				where("uid", 'in', [...Object.values(currentUser.following).flat(), currentUser.uid]),
				orderBy("timestamp", "desc")
			),
			(postsSnapshot) => {
				setPosts([])
					postsSnapshot.docs.forEach((postSnap) => {
						getDoc(doc(db, "users", postSnap.data().uid))
						.then((userSnap) => {
							setPosts((prevPosts) => [
								...prevPosts,
								{
									id: postSnap.id,
									...postSnap.data(),
									user: {
										username: userSnap.data().username,
										userImg: userSnap.data().profilePic,
									}
								},
							])
						})
					})
			}
		)
		return () => unsubscribe()
	}, [db])

	// Get user's following from all groups w/ snapshot
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(
				collection(db, "users"),
				where("uid", "in", Object.values(currentUser.following).flat()),
				where("uid", "!=", currentUser.uid)
			),
			(snapshot) => {
				setStories(snapshot.docs.map((user) => user.data()))
			}
		)
		return () => unsubscribe()
	}, [db])


	const AllRoute = () => (
		<View>
			<Stories stories={stories}/>
			<ScrollView>
				<Posts posts={posts}/>
			</ScrollView>
		</View>
	)

	const LovedRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.loved.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.loved.includes(post.uid))}/>
			</ScrollView>
		</View>
	)

	const FamilyRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.family.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.family.includes(post.uid))}/>
			</ScrollView>
		</View>
	)

	const FriendsRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.friends.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.friends.includes(post.uid))}/>
			</ScrollView>
		</View>
	)
	const ConnectionsRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.connections.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.connections.includes(post.uid))}/>
			</ScrollView>
		</View>
	)
	const AcquaintancesRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.acquaintances.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.acquaintances.includes(post.uid))}/>
			</ScrollView>
		</View>
	)
	const RecognizableRoute = () => (
		<View>
			<Stories stories={stories.filter(story => currentUser.following.recognizable.includes(story.uid))}/>
			<ScrollView>
				<Posts posts={posts.filter(post => currentUser.following.recognizable.includes(post.uid))}/>
			</ScrollView>
		</View>
	)

	const renderScene = SceneMap({
		all: AllRoute,
		loved: LovedRoute,
		family: FamilyRoute,
		friends: FriendsRoute,
		connections: ConnectionsRoute,
		acquaintances: AcquaintancesRoute,
		recognizable: RecognizableRoute,
	})
	
	const initialLayout = {
		width: Dimensions.get("window").width,
	}
	
		const renderTabBar = props => {
			const inputRange = props.navigationState.routes.map((x, i) => i);
			return <Box flexDirection="row">
				{props.navigationState.routes.map((route, i) => {
				const opacity = props.position.interpolate({
				  inputRange,
				  outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
				});
				const color = index === i ? useColorModeValue("#000", "#e5e5e5") : useColorModeValue("#1f2937", "#a1a1aa");
				const borderColor = index === i ? "cyan.500" : useColorModeValue("coolGray.200", "gray.400");
				return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3"  key={i}>
					  <Pressable onPress={() => {
						  setIndex(i);
						  setCurrentGroup(routes[i].key)
				  }}>
						<Animated.Text style={{
					  color
					}}>{route.title}</Animated.Text>
					  </Pressable>
					</Box>;
			  })}
			  </Box>;
		}

		return (
			<NativeBaseProvider
			initialWindowMetrics={{
			  frame: {x: 0, y: 0, width: 0, height: 0},
			  insets: {top: 0, left: 0, right: 0, bottom: 0},
			}}>
			<TabView
				navigationState={{
					index,
					routes,
				}}
				renderScene={renderScene}
				renderTabBar={renderTabBar}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				style={{
					marginTop: StatusBar.currentHeight,
				}}
			/>
			</NativeBaseProvider>
		)
	}

export default Tabs
