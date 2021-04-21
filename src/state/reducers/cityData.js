import {
  FETCHING_CITY_START,
  FETCHING_CITY_SUCCESS,
  FETCHING_CITY_ERROR,
  FETCHING_ALL_START,
  FETCHING_ALL_SUCCESS,
  FETCHING_ALL_ERROR,
} from '../actions';

const initialState = {
  searchValue: '',
  user: '',
  isFetching: '',
  error: '',
  city: {},
  allCitiesAndStates: {},
  allCities: [],
  allStates: [],
};

export const cityDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCHING_CITY_START:
      console.log('fetchCityData start: reducer');

      return {
        ...state,
        searchValue: action.payload,
        isFetching: true,
      };

    case actions.FETCHING_CITY_SUCCESS:
      console.log('fetchCityData successful: reducer');

      return {
        ...state,
        searchValue: action.payload,
        isFetching: false,
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
