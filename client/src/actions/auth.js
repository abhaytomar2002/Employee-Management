import { 
  AUTH_SUCCESS, 
  AUTH_ERROR, 
  AUTH_SHOW_LOADING, 
  AUTH_HIDE_LOADING 
} from '../constants/actionTypes';
import * as api from '../api';

const EXPIRY_TIME = 8 * (60 * 60 * 1000) // JWT token expiry time

// Redux action creator for user sign in
export const signin = (formData, navigate) => async (dispatch) => {
  let expiryDate = new Date(Date.now() + EXPIRY_TIME)
  dispatch({ type: AUTH_SHOW_LOADING })
  try {
    let { data } = await api.signIn(formData)
    data = {...data, expDate: expiryDate}
    dispatch({ type: AUTH_SUCCESS, payload: data })
    navigate('/', {replace: true})
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message })
  }
  dispatch({ type: AUTH_HIDE_LOADING })
}

// Redux action creator for user sign up
export const signup = (formData, navigate) => async (dispatch) => {
  let expiryDate = new Date(Date.now() + EXPIRY_TIME)
  dispatch({ type: AUTH_SHOW_LOADING })
  try {
    let { data } = await api.signUp(formData)
    data = {...data, expDate: expiryDate}
    dispatch({ type: AUTH_SUCCESS, payload: data })
    navigate('/', {replace: true})
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message })
  }
  dispatch({ type: AUTH_HIDE_LOADING })
}