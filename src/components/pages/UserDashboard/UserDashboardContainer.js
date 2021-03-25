import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSavedCity, unpinCity } from '../../../state/actions';
import { Spin, notification } from 'antd';
import { Header, Footer } from '../../common/';
import RenderUserDashboard from './RenderUserDashboard';

const spinStyle = {
  textAlign: 'center',
  position: 'absolute',
  top: '46%',
  width: '100%',
  margin: 'auto',
};

const UserDashboardContainer = ({
  fetchSavedCity,
  savedCities,
  unpinCity,
  isFetching,
}) => {
  const { authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);
  const { push } = useHistory();
  const [cityAndState, setCityAndState] = useState(
    JSON.parse(localStorage.getItem('cityAndState'))
  );
  const [userName, setUserName] = useState();

  console.log('userName: ', userName);

  useEffect(() => {
    fetchSavedCity(localStorage.getItem('token'));
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
          setUserName(info.name);
          localStorage.setItem('token', info.sub);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [fetchSavedCity, memoAuthService]);

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
        <RenderUserDashboard
          savedCities={savedCities}
          handleRemoveCity={handleRemoveCity}
          handleOnCityClick={handleOnCityClick}
          id={localStorage.getItem('token')}
          name={userName}
        />
      )}
      <Footer />
    </>
  );
};

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
})(UserDashboardContainer);
