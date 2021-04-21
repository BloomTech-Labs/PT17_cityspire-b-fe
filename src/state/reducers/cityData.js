import {
  FETCHING_CITY_START,
  FETCHING_CITY_SUCCESS,
  FETCHING_CITY_ERROR,
  FETCHING_ALL_START,
  FETCHING_ALL_SUCCESS,
  FETCHING_ALL_ERROR,
} from '../actions';

const initialState = {
  isFetching: false,
  error: '',
  city: {},
  allCitiesAndStates: {},
  allCities: [],
  allStates: [],
};

export const cityDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CITY_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_CITY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        city: action.payload,
        error: '',
      };
    case FETCHING_CITY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FETCHING_ALL_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_ALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allCitiesAndStates: action.payload,
        allCities: action.payload.map(city => {
          return city.City;
        }),
        allStates: action.payload.map(city => {
          return city.State;
        }),
        error: '',
      };
    case FETCHING_ALL_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
