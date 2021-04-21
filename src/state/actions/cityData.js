import axios from 'axios';

export const FETCHING_CITY_START = 'FETCHING_CITY_START';
export const FETCHING_CITY_SUCCESS = 'FETCHING_CITY_SUCCESS';
export const FETCHING_CITY_ERROR = 'FETCHING_CITY_ERROR';

export const FETCHING_ALL_START = 'FETCHING_ALL_START';
export const FETCHING_ALL_SUCCESS = 'FETCHING_ALL_SUCCESS';
export const FETCHING_ALL_ERROR = 'FETCHING_ALL_ERROR';

const dsApi = `${process.env.REACT_APP_DS_BASE_URL}`;

export const fetchCityData = cityInfo => {
  return async dispatch => {
    dispatch({ type: FETCHING_CITY_START });

    try {
      const res = await axios
        .post(`${dsApi}api/get_data`, cityInfo)
        .then(res => {
          dispatch({
            type: FETCHING_CITY_SUCCESS,
            payload: res.data,
          });
        });
    } catch (err) {
      dispatch({ type: FETCHING_CITY_ERROR, payload: err.detail });
    }
  };
};

export const fetchAllCities = cityInfo => {
  return async dispatch => {
    dispatch({ type: FETCHING_ALL_START });

    try {
      const res = await axios.get(`${dsApi}all_cities`);

      dispatch({
        type: FETCHING_ALL_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: FETCHING_ALL_ERROR, payload: err.detail });
    }
  };
};
