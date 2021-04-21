import axios from 'axios';

export const FETCHING_CITY_START = 'FETCHING_CITY_START';
export const FETCHING_CITY_SUCCESS = 'FETCHING_CITY_SUCCESS';
// export const FETCHING_CITY_ERROR = 'FETCHING_CITY_ERROR';

<<<<<<< HEAD
export const fetchCityData = (cityInfo, history) => dispatch => {
  dispatch({ type: FETCHING_CITY_START });
||||||| merged common ancestors
export const fetchCityData = cityInfo => {
  return async dispatch => {
    dispatch({ type: FETCHING_CITY_START });
=======
export const FETCHING_ALL_START = 'FETCHING_ALL_START';
export const FETCHING_ALL_SUCCESS = 'FETCHING_ALL_SUCCESS';
export const FETCHING_ALL_ERROR = 'FETCHING_ALL_ERROR';

const dsApi = `${process.env.REACT_APP_DS_BASE_URL}`;

export const fetchCityData = cityInfo => {
  return async dispatch => {
    dispatch({ type: FETCHING_CITY_START });
>>>>>>> 9df58ba5859f6c089fdf573cbebca1207e76dd97

<<<<<<< HEAD
  axios
    .post('https://localhost:8000/api/get_data', cityInfo)

    .then(res => {
      console.log('Action creater fetchCityData successful: ', res.data);
||||||| merged common ancestors
    try {
      const res = await axios.post(
        `https://localhost:8000/api/get_data`,
        cityInfo
      );
=======
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
>>>>>>> 9df58ba5859f6c089fdf573cbebca1207e76dd97

      dispatch({
        type: FETCHING_ALL_SUCCESS,
        payload: res.data,
      });
<<<<<<< HEAD

      history.push('/${res.data.city.state}/${res.data.city.city}');
    })

    .catch(err => {
      console.log('Action creator fetchCityData failed', err.message);
    });
||||||| merged common ancestors
    } catch (err) {
      dispatch({ type: FETCHING_CITY_ERROR, payload: err.detail });
    }
  };
=======
    } catch (err) {
      dispatch({ type: FETCHING_ALL_ERROR, payload: err.detail });
    }
  };
>>>>>>> 9df58ba5859f6c089fdf573cbebca1207e76dd97
};

// return async dispatch => {
//   dispatch({ type: FETCHING_CITY_START });

//   try {
//     const res = await axios.post(
//       `https://localhost:8000/api/get_data`,
//       cityInfo
//     );

//     dispatch({
//       type: FETCHING_CITY_SUCCESS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({ type: FETCHING_CITY_ERROR, payload: err.detail });
//   }
// };
