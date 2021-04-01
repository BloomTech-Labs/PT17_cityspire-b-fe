import * as actions from '../actions';

const initialState = {
  searchValue: '',
  user: '',
  isFetching: '',
  error: '',
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

    // case actions.FETCHING_CITY_ERROR:

    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};
