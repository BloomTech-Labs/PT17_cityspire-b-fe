import topCities from './TopCitiesMockData';
import React, { useState, useEffect } from 'react';
import { cityDataReducer } from '../../state/reducers/cityData';

const TopCities = () => {
  const [topCitiesData, setTopCitiesData] = useState([]);
  useEffect(() => {
    setTopCitiesData(topCities);
  }, []);

  return (
    <div>
      <h2>Top Cities to Live In</h2>
      {topCities.map(item => (
        <div>
          <p>City: {item.city}</p>
          <p>State: {item.state}</p>
        </div>
      ))}
    </div>
  );
};

export default TopCities;
