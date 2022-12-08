import { 
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_ERROR,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_SUCCESS, 
  UPDATE_EMPLOYEE_ERROR, 
  DELETE_EMPLOYEE_SUCCESS, 
  DELETE_EMPLOYEE_ERROR, 
  DELETE_ABSENCE_SUCCESS, 
  DELETE_ABSENCE_ERROR, 
  ADD_ABSENCE_SUCCESS,
  ADD_ABSENCE_ERROR, 
  UPDATE_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_ERROR,
  SHOW_LOADER, 
  HIDE_LOADER, 
} from '../constants/actionTypes';
import * as api from '../api';

// Redux action creator for getting all employees
export const getEmployees = () => async (dispatch) => {
  try {
    dispatch(showLoader())
    const { data } = await api.fetchEmployees()
    dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: data })
    dispatch(hideLoader())
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEES_ERROR, payload: error.response.data.message })
  }
}

//Redux action creator for getting specific employee
export const getEmployee = (id) => async (dispatch) => {
  try {
    dispatch(showLoader())
    const { data } = await api.fetchEmployee(id)
    dispatch({ type: FETCH_EMPLOYEE_SUCCESS, payload: data })
    dispatch(hideLoader())
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for employee delete
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id)
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: id })
  } catch (error) {
    dispatch({ type: DELETE_EMPLOYEE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for employee creation
export const createEmployee = (employee) => async (dispatch) => {
  try {
    const { data } = await api.createEmployee(employee)
    dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_EMPLOYEE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for employee update
export const updateEmployee = (id, employee) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployee(id, employee)
    dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_EMPLOYEE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for employee absence creation
export const createAbsence = (id, absence) => async (dispatch) => {
  try {
    const { data } = await api.createAbsence(id, absence)
    
    dispatch({ type: ADD_ABSENCE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_ABSENCE_ERROR, payload: error.response.data.message})
  }
}

export const updateAbsence = (id, empId, newData) => async (dispatch) => {
  try {
    const { data } = await api.updateAbsence(id, empId, newData)
    dispatch({ type: UPDATE_ABSENCE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: UPDATE_ABSENCE_ERROR, payload: error.response.data.message})
  }
}

// Redux action creator for employee absence deletion
export const deleteAbsence = (id, empId) => async (dispatch) => {
  try {
    await api.deleteAbsence(id, empId)
    dispatch({ type: DELETE_ABSENCE_SUCCESS, payload: id })
  } catch (error) {
    dispatch({ type: DELETE_ABSENCE_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for loader display
export const showLoader = () => async (dispatch) => {
    dispatch({ type: SHOW_LOADER })
}

// Redux action creator for loader hide
export const hideLoader = () => async (dispatch) => {
    dispatch({ type: HIDE_LOADER })
}