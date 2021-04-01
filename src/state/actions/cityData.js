import axios from 'axios';

export const FETCHING_CITY_START = 'FETCHING_CITY_START';
export const FETCHING_CITY_SUCCESS = 'FETCHING_CITY_SUCCESS';
// export const FETCHING_CITY_ERROR = 'FETCHING_CITY_ERROR';

export const fetchCityData = (cityInfo, history) => dispatch => {
  dispatch({ type: FETCHING_CITY_START });

  axios
    .post('https://localhost:8000/api/get_data', cityInfo)

    .then(res => {
      console.log('Action creater fetchCityData successful: ', res.data);

      dispatch({
        type: FETCHING_CITY_SUCCESS,
        payload: res.data,
      });

      history.push('/${res.data.city.state}/${res.data.city.city}');
    })

    .catch(err => {
      console.log('Action creator fetchCityData failed', err.message);
    });
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
