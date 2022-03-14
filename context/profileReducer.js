/* Reducer */
const ProfileReducer = (state, action) => {
	switch (action.type) {
		case "SET_POSTS_VIEW":
			return {
				...state,
				postsView: action.payload,
			}
		case "SET_MODAL_STATE":
			console.log("setting modal state to", action.payload)
			return {
				...state,
				modalState: action.payload,
			}
		case "SET_POST_DATA":
			console.log("setting post data to", action.payload)
			return {
				...state,
				postData: action.payload,
			}
		default:
			return state
	}
}

export default ProfileReducer
