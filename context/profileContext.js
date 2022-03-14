import { createContext, useReducer } from "react"
import ProfileReducer from "./profileReducer"

const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
	const initialState = {
		postsView: "grid",
		modalState: false,
		postData: {
			postData: {
				postId: "",
				image: "",
				caption: "",
			},
			userData: {
				username: "",
				userImg: "",
			},
		},
	}
	const [state, dispatch] = useReducer(ProfileReducer, initialState)

	const setPostsView = (payload) => {
		dispatch({ type: "SET_POSTS_VIEW", payload })
	}

	const setModalState = (payload) => {
		dispatch({ type: "SET_MODAL_STATE", payload })
	}

	const setPostData = (payload) => {
		dispatch({ type: "SET_POST_DATA", payload })
	}

	return (
		<ProfileContext.Provider
			value={{
				...state,
				setPostsView,
				setModalState,
				setPostData,
			}}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContext
