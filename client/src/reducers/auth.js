import { 
  AUTH_SUCCESS, 
  AUTH_ERROR, 
  LOG_OUT, 
  AUTH_CLEAR_ERROR, 
  AUTH_SHOW_LOADING, 
  AUTH_HIDE_LOADING
} from '../constants/actionTypes';

const initialState = {
  authData: null,
  isLoading: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload })) 
      return {
        ...state, 
        authData: action.payload, 
        success: 'Connection successful!' 
      }

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    
    case LOG_OUT:
      localStorage.clear()
      return { 
        ...state, 
        authData: null
      }
    
    case AUTH_SHOW_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case AUTH_HIDE_LOADING:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}

export default authReducer
