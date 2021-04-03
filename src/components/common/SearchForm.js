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

  // Split search value right by the comma
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
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={
                e => e.preventDefault()
                // onSubmit()
              }
              style={{
                backgroundColor: '#FFF',
                padding: '4px 16px',
                color: '#000',
                borderRadius: '4px',
              }}
            >
              Search a city and state <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default connect(null, { fetchCityData })(SearchForm);
