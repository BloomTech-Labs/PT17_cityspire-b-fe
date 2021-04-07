import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCityData } from '../../state/actions';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import topCities from './TopCitiesMockData';

const ColStyle = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  zIndex: 99999,
};

const SearchStyle = {
  width: '55vw',
  minWidth: '24rem',
  maxWidth: '80rem',
  padding: '1rem',
};

const SearchForm = ({ fetchCityData }) => {
  const { push } = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [topCitiesData, setTopCitiesData] = useState([]);
  useEffect(() => {
    setTopCitiesData(topCities);
  }, []);

  // Split search value right by the comma
  const splitSearchValue = searchValue.toLowerCase().split(', ');

  // Set the split value to city and state
  const cityAndState = {
    city: splitSearchValue[0],
    state: splitSearchValue[1],
  };

  const { Search } = Input;

  const handleChange = value => {
    setSearchValue(value);
    console.log(value);
  };
  console.log('searchValue: ', searchValue);
  const onSubmit = () => {
    localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    fetchCityData(cityAndState);
    push(`/${cityAndState.state}/${cityAndState.city}`);
    setSearchValue('');
  };

  const menu = (
    <Menu>
      {topCities.map(menu => {
        return (
          <Menu.Item
            key={menu.city}
            onClick={handleChange}
            value={`${menu.city}, ${menu.state}`}
          >
            <p>
              {menu.city}, {menu.state}
            </p>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Row>
      <Col span={12} offset={6} style={ColStyle}>
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <span
              style={{
                backgroundColor: '#FFF',
                padding: '4px 16px',
                color: '#000',
                borderRadius: '4px',
              }}
            >
              Search a city and state <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default connect(null, { fetchCityData })(SearchForm);
