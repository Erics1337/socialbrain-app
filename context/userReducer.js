/* Actions */

export const setCurrentUser = (payload) => {
	return {
		type: "SET_CURRENT_USER",
		payload,
	}
}
export const setLoading = (loading) => {
	return {
		type: "LOADING",
		loading,
	}
}
export const setModal = (modalState) => {
	return {
		type: "SET_MODAL_STATE",
		modalState,
	}
}
export const setGroup = (group) => {
	return {
		type: "SET_CURRANT_GROUP",
		group,
	}
}

/* Reducer */
const UserReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				...state,
				loading: true,
			}
		case "SET_CURRENT_USER":
			return {
				...state,
				currentUser: action.payload,
				loading: false,
			}
		case "SET_MODAL_STATE":
			return {
				...state,
				modalState: action.modalState,
			}
		case "SET_CURRANT_GROUP":
			console.log('setting group from reducer', action.group)
			return {
				...state,
				currentGroup: action.group,
			}
		default:
			return state
	}
}

export default UserReducer
