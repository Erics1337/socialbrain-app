import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import tw from 'twrnc';


const Post = ({ post }) => {
    
    return (
        <View style={tw`mb-5`}>
            <Divider style={tw`bg-white`} width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={tw`mx-1 mt-1`}>
                <PostFooter />
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}


const PostHeader = ({ post }) => (
    <View style={tw`flex-row justify-between m-5`}>
        <View style={tw`flex-row items-center`}>
            <Image source={{ uri: post.profile_picture }} style={tw`h-8 w-8 rounded-full p-[1.5px] border-red-500 border-2`}/>
            <Text style={tw`text-white ml-3 font-semibold`}>{post.user}</Text>
        </View>
        <Text style={tw`text-white font-semibold`}>...</Text>
    </View>
)


const PostImage = ({ post }) => (
    <View style={tw`w-full h-110`}>
        <Image source={{ uri: post.imageUrl }} style={tw`h-full`} />
    </View>
)


const PostFooter = () => (
    <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row w-1/3 justify-between`}>
            <Icon imgUrl={'https://img.icons8.com/nolan/64/like.png'} />
            <Icon imgUrl={'https://img.icons8.com/nolan/64/topic.png'} />
            <Icon imgUrl={'https://img.icons8.com/nolan/64/sent.png'} altStyle={styles.shareIcon}/>
        </View>
        <View>
            <Icon imgUrl={'https://img.icons8.com/nolan/64/bookmark.png'} />
        </View>
    </View>
)


const Icon = ({imgUrl, altStyle}) => (
    <TouchableOpacity>
        <Image style={[tw`w-8 h-8`, altStyle]} source={{uri: imgUrl}} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View style={tw`flex-row mt-1 justify-between`}>
        <Text style={tw`text-white font-semibold`}>
            {post.likes_by_users.length} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={tw`mt-1`}>
        <Text style={tw`text-white`}>
            <Text style={tw`font-bold`}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)


const CommentsSection = ({ post }) => (
    <View style={tw`mt-1`}>
        {/* using !! double negations will make output 'true' or 'false' instead of '1' or '0' to expose truthy value */}
        {!!post.comments.length && (
        <Text style={tw`text-gray-500`}>
            View
            {post.comments.length > 1 ? ` all ${post.comments.length} comments` : ' 1 comment'}
        </Text>
        )}
    </View>
)

const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, i) => (
            <View key={i} style={tw`flex-row mt-1`}>
                <Text style={tw`text-white`}>
                    <Text style={tw`font-semibold`}>{comment.user}</Text>
                    {' '}{comment.comment}
                </Text>

            </View>
        ))}
    </>
)


const styles = StyleSheet.create({
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -1,
    }
})


export default Post