import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCityData } from '../../state/actions';
// import { useHistory } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Form, Select, Button } from 'antd';

const { Option } = Select;

const initialSearchValue = {
  city: '',
  state: '',
};

const ColStyle = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
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

  // const handleChange = e => {
  //   e.persist();
  //   setNewSearchValue({
  //     ...newSearchValue,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const onSubmit = e => {
    e.preventDefault();
    // localStorage.setItem('cityAndState', JSON.stringify(cityAndState));
    props.fetchCityData(newSearchValue, props.history);
    // push(`/${cityAndState.state}/${cityAndState.city}`);
    // setSearchValue('');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="" style={{ color: '#104573' }}>
          San Francisco, CA
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a
          href="/${cityAndState.state}/${cityAndState.city}"
          style={{ color: '#104573' }}
        >
          Honolulu, HI
        </a>
      </Menu.Item>
    </Menu>
  );

  const onCityChange = value => {
    console.log(`selected ${value}`);
    // e.persist();
    setNewSearchValue({
      ...newSearchValue,
      city: value,
    });
  };

  const onStateChange = value => {
    console.log(`selected ${value}`);
    // e.persist();
    setNewSearchValue({
      ...newSearchValue,
      state: value,
    });
  };

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  // const onSearch = value => {
  //   console.log('search:', value);
  //   // e.preventDefault();
  //   props.fetchCityData(newSearchValue, props.history);
  // };

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
                color: '#104573',
                borderRadius: '4px',
                fontFamily: 'TrebuchetMS',
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
