import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCityData } from '../../state/actions';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ColStyle = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  top: '20rem',
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

  // Split search value right by the common
  const splitSearchValue = searchValue.toLowerCase().split(', ');

  // Set the split value to city and state
  const cityAndState = {
    city: splitSearchValue[0],
    state: splitSearchValue[1],
  };

  const { Search } = Input;

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const onSubmit = () => {
    localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    fetchCityData(cityAndState);
    push(`/${cityAndState.state}/${cityAndState.city}`);
    setSearchValue('');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="">San Francisco, CA</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/${cityAndState.state}/${cityAndState.city}">Honolulu, HI</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Col span={12} offset={6} style={ColStyle}>
        <div>
          {/* <Search
            placeholder="Ex. New York, NY"
            allowClear
            onSearch={() => onSubmit()}
            size="large"
            style={SearchStyle}
            value={searchValue.city}
            onChange={handleChange}
          /> */}
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={
                e => e.preventDefault()
                // onSubmit()
              }
            >
              Click me to search a city and state <DownOutlined />
            </a>
          </Dropdown>
          {/* <p
            style={{
              fontSize: '2.5rem',
              fontFamily: 'Hachi Maru Pop, cursive',
              fontStyle: 'italic',
              marginTop: '-8%',
              backgroundColor: '#5946B2',
              paddingTop: '2rem',
              color: 'white',
              border: '2px outset lightgrey',
              textShadow: '1px 1px 10px #FFCC33',
            }}
          >
            Search Your Desires
          </p> */}
        </div>
      </Col>
    </Row>
  );
};

export default connect(null, { fetchCityData })(SearchForm);
