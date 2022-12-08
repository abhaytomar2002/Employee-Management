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
  SHOW_LOADER, 
  HIDE_LOADER,
  CLEAR_EMPLOYEES_MESSAGE,
  UPDATE_ABSENCE_SUCCESS,
  UPDATE_ABSENCE_ERROR
 } from '../constants/actionTypes';

let initialState = { 
  isLoading: true,
  data: [],
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        employee: null
      }

    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload
      }
    
    case FETCH_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((i) => i._id !== action.payload),
        employee: null,
        success: 'User deleted!'
      }
    
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_EMPLOYEE_SUCCESS:
      return {
        data: [...state.data, action.payload],
        success: 'User added successfully!'
      }

    case ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        data: state.data.map((employee)=> {
          if(employee._id === action.payload._id) {
            return {...employee, ...action.payload}
          } else {
            return employee
          }
        }),
        employee: action.payload,
        success: 'User data restored!'
      }

    case UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_ABSENCE_SUCCESS:
      return {
         ...state,
        employee: {...state.employee, absences: [...state.employee.absences, action.payload]},
        success: 'Employee absence added!'
      }
      
    case ADD_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_ABSENCE_SUCCESS:
      return {
        ...state,
        success: "Employee's absence restored!"
     }
    
    case UPDATE_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_ABSENCE_SUCCESS:
      return {
        ...state,
        employee:{
          ...state.employee,
          absences: state.employee.absences.filter((i) => i._id !== action.payload),
        },
        success: 'Absence deleted!'
      }

    case DELETE_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      }

    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      }

    case CLEAR_EMPLOYEES_MESSAGE:
      return {
        ...state,
        success: null,
        error: null
      }

    default:
      return state;
  }
}