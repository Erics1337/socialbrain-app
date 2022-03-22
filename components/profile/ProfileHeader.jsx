import React, {useContext} from 'react'
import tw from 'twrnc'
import { View, Text, Image } from 'react-native';
import UnfollowButton from './UnfollowButton';
import FollowButton from './FollowButton';
import DeleteButton from './DeleteButton';

function ProfileHeader({currentUser, userData, postCount}) {
  const {username, uid, profilePic} = userData

  // console.log('currentUser', currentUser)

  	// Anonymous function to assign value to followers w/gaurd clause to prevent error if no followers
	const followersCount = (function () {
		if (userData.followers.length) return userData.followers.length
		else return 0
	})()

	// Get number of following
	const followingCount = Object.values(userData?.following)
		.map((element) => element.length)
		.reduce((a, b) => a + b, 0)

	// Check if user whose page it is is being followed by currentUser in any of their groups
	const userIsFollowed = () => {
		if (currentUser.following == undefined) return
		return Object.values(currentUser?.following).some((a) =>
			a.includes(userData.uid)
		)
	}

  const userIsCurrentUser = () => currentUser.uid === userData.uid
	const userIsLoggedIn = () => currentUser.uid != undefined


  return (
    <View style={tw`flex-row justify-around mx-2`}>
      <View style={tw`flex m-3`}>
        <Image source={{ uri: profilePic }} style={tw`h-20 w-20 rounded-full p-[1.5px] border-red-500 border-2`} />
        <Text style={tw`text-l font-semibold w-15 text-center mx-auto`}>
        {username}
        </Text>
      </View>
      <View style={tw`flex m-3`}>
        <View style={tw`p-1 mx-auto`}>
          {userIsLoggedIn() &&
                !userIsCurrentUser() ? (
                (!userIsFollowed() ? (
                  <FollowButton
                    follower={currentUser.uid}
                    followee={userData.uid}
                  />
                ) : (
                    <UnfollowButton
                      follower={currentUser.uid}
                      followee={userData.uid}
                    />
                )))
              : 
                <DeleteButton currentUser={currentUser}/>
              }
        </View>
        <View style={tw`flex-row m-auto`}>
          <View style={tw`p-2`}>
            <Text style={tw`mx-auto font-semibold`}>{postCount}</Text>
            <Text>post{postCount != 1 && "s"}</Text>
          </View>
          <View style={tw`p-2`}>
            <Text style={tw`mx-auto font-semibold`}>{followersCount}</Text>
            <Text>follower{followersCount != 1 && "s"}</Text>
          </View>
          <View style={tw`p-2`}>
            <Text style={tw`mx-auto font-semibold`}>{followingCount}</Text>
            <Text>following</Text>
          </View>
        </View>
        <View style={tw`p-1`}>
          <Text>{userData.subName}</Text>
        </View>
        <View style={tw`p-1`}>
          <Text>{userData.bio}</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileHeader