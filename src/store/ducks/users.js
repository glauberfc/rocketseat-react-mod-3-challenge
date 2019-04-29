/**
 * Types
 */
export const UsersTypes = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE: 'users/REMOVE',
}

/**
 * Reducer
 */
const initialState = {
  loading: false,
  error: null,
  data: [],
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case UsersTypes.ADD_REQUEST:
      return { ...state, loading: true }
    case UsersTypes.ADD_SUCCESS:
      return { ...initialState, data: [...state.data, action.payload.data] }
    case UsersTypes.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case UsersTypes.REMOVE:
      return {
        ...initialState,
        data: state.data.filter(user => user.id !== action.payload.userId),
      }
    default:
      return state
  }
}

/**
 * Action creators
 */
export const UsersActions = {
  addUserRequest: (username, coordinates) => ({
    type: UsersTypes.ADD_REQUEST,
    payload: { username, coordinates },
  }),
  addUserSuccess: data => ({
    type: UsersTypes.ADD_SUCCESS,
    payload: { data },
  }),
  addUserFailure: error => ({
    type: UsersTypes.ADD_FAILURE,
    payload: { error },
  }),
  removeUser: userId => ({
    type: UsersTypes.REMOVE,
    payload: { userId },
  }),
}
