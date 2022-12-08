import { 
  ADD_JOBTITLE_SUCCESS, 
  ADD_JOBTITLE_ERROR, 
  FETCH_JOBTITLES_SUCCESS, 
  FETCH_JOBTITLES_ERROR, 
  UPDATE_JOBTITLE_SUCCESS, 
  UPDATE_JOBTITLE_ERROR, 
  DELETE_JOBTITLE_SUCCESS, 
  DELETE_JOBTITLE_ERROR } from '../constants/actionTypes';
import * as api from '../api';

// Redux action creator for new job title creation
export const createJobTitle = (jobTitle) => async (dispatch) => {
  try {
    const { data } = await api.createJobTitle(jobTitle)
    dispatch({ type: ADD_JOBTITLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_JOBTITLE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for getting all job titles
export const getJobTitles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchJobTitles()
    dispatch({ type: FETCH_JOBTITLES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_JOBTITLES_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for job title updating
export const updateJobTitle = (id, jobTitle) => async (dispatch) => {
  try {
    const { data } = await api.updateJobTitle(id, jobTitle)
    dispatch({ type: UPDATE_JOBTITLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_JOBTITLE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for job title deletion
export const deleteJobTitle = (id) => async (dispatch) => {
  try {
    await api.deleteJobTitle(id)
    dispatch({ type: DELETE_JOBTITLE_SUCCESS, payload: id })
  } catch (error) {
    dispatch({ type: DELETE_JOBTITLE_ERROR, payload: error.response.data.message })
  }
}