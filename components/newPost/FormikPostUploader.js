import { yupToFormErrors } from "formik"
import React, { useState, useEffect } from "react"
import { Button, View, Text, Image, TextInput } from "react-native"
import tw from "twrnc"
import * as Yup from "yup"
import { Formik } from "formik"
import * as PLACEHOLDER_IMG from "../../assets/images/photo_camera.png"
import { Divider } from "react-native-elements/dist/divider/Divider"
import validUrl from "valid-url"
import { db, auth } from "../../firebase"
import { collection, limit, onSnapshot, query, where, addDoc, setDoc, getDoc, doc, serverTimestamp } from "@firebase/firestore"


// Formik validation schema
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption is too long"),
})

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = React.useState(PLACEHOLDER_IMG)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)


// On page load, queries db for user obj based on currentlyLoggedInUser and sets profilePicture to state
  useEffect(() => {
    try { 
      getDoc(doc(db, "users", auth.currentUser.email)).then(docSnap => {
      if (docSnap.exists()) {
        console.log(docSnap.data().username)
          setCurrentLoggedInUser({
            username: docSnap.data().username,
            profilePicture: docSnap.data().profile_picture,
          })
      } else {
        console.log("No such document!");
      }
    })
  } catch (error) {
    console.log(error)
  }
  }, [])

  const uploadPostToFirebase = async (imageUrl, caption) => {


    const docRef = await addDoc(collection(db, 'users', auth.currentUser.email, 'posts'), {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profilePicture,
      owner_uid: auth.currentUser.uid,
      owner_email: auth.currentUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
      likes_by_users: [],
      comments: [],
    })
      .then(() => navigation.goBack())
      .then(() => console.log("Successfully uploaded post with ID: ", docRef))
      .catch((error) => console.log(error))
  }


  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        console.log(values)
        uploadPostToFirebase(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {/* Destructure Formik properties */}
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={tw`m-10 justify-between flex-row`}>
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={tw`w-20 h-20 mr-5`}
            />
            <View style={tw`flex-1`}>
              <TextInput
                style={tw`text-white font-semibold`}
                placeholderTextColor="gray"
                placeholder="Write a caption..."
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={tw`text-white`}
            placeholderTextColor="gray"
            placeholder="Enter Image Url"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {/* Formik Error Alerts */}
          {errors.imageUrl && (
            <Text style={tw`text-red-500 font-semibold`}>
              {errors.imageUrl}
            </Text>
          )}
          {/* Formik handles validation with isValid */}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader
