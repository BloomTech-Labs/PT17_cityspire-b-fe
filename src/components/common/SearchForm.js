import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCityData } from '../../state/actions';
// import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
// import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

const initialSearchValue = {
  city: '',
  state: '',
};

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

const SearchForm = props => {
  // const { push } = useHistory();

  const [newSearchValue, setNewSearchValue] = useState(initialSearchValue);

  // Split search value right by the comma
  // const splitSearchValue = searchValue.toLowerCase().split(', ');

  // Set the split value to city and state
  // const cityAndState = {
  //   city: splitSearchValue[0],
  //   state: splitSearchValue[1],
  // };

  // const { Search } = Input;

  const handleChange = e => {
    e.persist();
    setNewSearchValue({
      ...newSearchValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    // localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    props.fetchCityData(newSearchValue, props.history);
    // push(`/${cityAndState.state}/${cityAndState.city}`);
    // setSearchValue('');
  };

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="0">
  //       <a href="">San Francisco, CA</a>
  //     </Menu.Item>
  //     <Menu.Item key="1">
  //       <a href="/${cityAndState.state}/${cityAndState.city}">Honolulu, HI</a>
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <Row>
      <Col span={12} offset={6} style={ColStyle}>
        <div>
          <form onSubmit={onSubmit}>
            {/* <Search
            placeholder="Ex. New York, NY"
            allowClear
            onSearch={() => onSubmit()}
            size="large"
            style={SearchStyle}
            value={searchValue.city}
            onChange={handleChange}
          /> */}
            {/* <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={
                e => e.preventDefault()
                // onSubmit()
              }
            >
              Click me to search a city and state <DownOutlined />
            </a>
          </Dropdown> */}
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
            <label htmlFor="city_search">City:</label>
            <Select
              id="city_search"
              name="city_search"
              type="text"
              showSearch
              style={SearchStyle}
              placeholder="Select a city"
              onChange={handleChange}
              value={newSearchValue.city}
            >
              <Option value="New York">New York</Option>
              <Option value="Honolulu">Honolulu</Option>
              <Option value="Seattle">Seattle</Option>
            </Select>

            <label htmlFor="state_search">State:</label>
            <Select
              id="state_search"
              name="state_search"
              type="text"
              showSearch
              style={SearchStyle}
              placeholder="Select a state"
              onChange={handleChange}
              value={newSearchValue.state}
            >
              <Option value="NY">NY</Option>
              <Option value="HI">HI</Option>
              <Option value="WA">WA</Option>
            </Select>
          </form>
        </div>
      </Col>
    </Row>
  );
};

const mapstateToProps = state => {
  return {
    searchValue: state.searchValue,
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
  };
};

const mapDispatchToProps = {
  fetchCityData,
};

export default connect(mapstateToProps, mapDispatchToProps)(SearchForm);
