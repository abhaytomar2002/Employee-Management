import { 
  ADD_JOBTITLE_SUCCESS, 
  ADD_JOBTITLE_ERROR, 
  FETCH_JOBTITLES_SUCCESS, 
  FETCH_JOBTITLES_ERROR, 
  UPDATE_JOBTITLE_SUCCESS, 
  UPDATE_JOBTITLE_ERROR, 
  DELETE_JOBTITLE_SUCCESS, 
  DELETE_JOBTITLE_ERROR, 
  CLEAR_JOBTITLE_MESSAGE 
} from '../constants/actionTypes';

let initialState = { 
  data: [],
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_JOBTITLES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case FETCH_JOBTITLES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_JOBTITLE_SUCCESS:
      return {
        data: [...state.data, action.payload],
        success: 'Record added successfully!'
      }
    
    case ADD_JOBTITLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_JOBTITLE_SUCCESS:
      return {
        data: state.data.map((jobTitle)=> {
          if(jobTitle._id === action.payload._id) {
            return {...jobTitle, ...action.payload}
          } else {
            return jobTitle
          }
        }),
        success: 'Job data updated!'
      }

    case UPDATE_JOBTITLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_JOBTITLE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((i) => i._id !== action.payload),
        success: 'Position and related data deleted!'
      }

    case DELETE_JOBTITLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case CLEAR_JOBTITLE_MESSAGE:
      return {
        ...state,
        success: null,
        error: null
      }

    default:
      return state
  }
}