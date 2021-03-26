import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSavedCity, unpinCity } from '../../../state/actions';

import { Spin, notification } from 'antd';
import { Header, Footer } from '../../common/';
import RenderPinnedCities from './RenderPinnedCities';

const spinStyle = {
  textAlign: 'center',
  position: 'absolute',
  top: '46%',
  width: '100%',
  margin: 'auto',
};

function PinnedCitiesContainer({
  fetchSavedCity,
  savedCities,
  unpinCity,
  isFetching,
}) {
  const { push } = useHistory();

  const [cityAndState, setCityAndState] = useState(
    JSON.parse(localStorage.getItem('cityAndState'))
  );

  useEffect(() => {
    fetchSavedCity(localStorage.getItem('token'));
  }, [fetchSavedCity]);

  const deleteNotification = () => {
    notification.open({
      message: 'City Removed',
      description: `${cityAndState.city}, ${cityAndState.state} has been has been removed from Pinned Cities.`,
    });
  };

  const handleRemoveCity = id => {
    unpinCity(localStorage.getItem('token'), id);
    deleteNotification();
    fetchSavedCity(localStorage.getItem('token'));
    window.location.reload();
  };

  const handleOnCityClick = cityAndState => {
    localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    setCityAndState(localStorage.getItem('cityAndState'));
    push(`/pinned/${cityAndState.state}/${cityAndState.city}`);
  };

  return (
    <>
      <Header />
      {isFetching ? (
        <div style={spinStyle}>
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      ) : (
        <>
          <h1>Here are your Pinned Cities!</h1>
          <RenderPinnedCities
            savedCities={savedCities}
            handleRemoveCity={handleRemoveCity}
            handleOnCityClick={handleOnCityClick}
            id={localStorage.getItem('token')}
          />
        </>
      )}
      <Footer />
    </>
  );
}

const mapStateToProps = state => {
  return {
    isFetching: state.cityOperations.isFetching,
    error: state.cityOperations.error,
    savedCities: state.cityOperations.savedCities,
    isSaved: state.cityOperations.isSaved,
  };
};
export default connect(mapStateToProps, {
  fetchSavedCity,
  unpinCity,
})(PinnedCitiesContainer);
