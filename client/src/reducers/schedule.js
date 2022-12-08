import {
  ADD_SCHEDULE_SUCCESS, 
  ADD_SCHEDULE_ERROR, 
  FETCH_SCHEDULE_SUCCESS, 
  FETCH_SCHEDULE_ERROR, 
  FETCH_SCHEDULES_SUCCESS, 
  FETCH_SCHEDULES_ERROR, 
  UPDATE_SCHEDULE_SUCCESS, 
  UPDATE_SCHEDULE_ERROR, 
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_ERROR,
  CLEAR_SCHEDULES_MESSAGE
} from '../constants/actionTypes';

let initialState = { 
  data: [],
  schedule: {
    employeeSchedules: []
  },
  error: null
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        data: action.payload
      }

    case FETCH_SCHEDULES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case FETCH_SCHEDULE_SUCCESS:
    return {
      ...state,
      schedule: action.payload
    }

    case FETCH_SCHEDULE_ERROR:
    return {
      ...state,
      error: action.payload
    }

    case ADD_SCHEDULE_SUCCESS:
      return {
          ...state,
          data: [...state.data, action.payload],
          success: 'The schedule has been created successfully!'
      }
    
    case ADD_SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: {...state.schedule,
          employeeSchedules: state.schedule.employeeSchedules.map((empSchedule)=> {
            if(empSchedule._id === action.payload.id) {
              return {
                ...empSchedule,
                days: {...empSchedule.days, ...action.payload.employeeSchedules}
              }
            } else {
              return {...empSchedule}
            }
          }),
        },
        success: 'Data renewed!'
      }
    
    case UPDATE_SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((i) => i._id !== action.payload),
        success: 'Work schedule deleted!'
      }
    
    case DELETE_SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case CLEAR_SCHEDULES_MESSAGE:
      return {
        ...state,
        error: null,
        success: null
      }

    default:
      return state
  }
}