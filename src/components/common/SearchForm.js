import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCityData, fetchAllCities } from '../../state/actions';
import stateAbv from './ListOfStates';
import { useHistory } from 'react-router-dom';
import { Row, Col, Select, AutoComplete, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

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

const SearchForm = ({ fetchCityData, fetchAllCities, cities, states }) => {
  const history = useHistory();

  const [cityValue, setCityValue] = useState('');
  const [stateValue, setStateValue] = useState('');

  useEffect(() => {
    fetchAllCities();
  }, [fetchAllCities]);

  let uniqueCities = [];
  cities.forEach(c => {
    if (!uniqueCities.includes(c)) {
      uniqueCities.push(c);
    }
  });

  const handleChange = value => {
    setStateValue(value);
  };

  const inputChange = data => {
    setCityValue(data);
  };

  const cityInfo = {
    city: cityValue,
    state: stateValue,
  };

  const onSubmit = () => {
    fetchCityData(cityInfo);
    history.push(`/${stateValue}/${cityValue}`);
    setCityValue('');
  };

  const options = uniqueCities.map(c => {
    return {
      value: `${c}`,
    };
  });

  const children = stateAbv.map(states => {
    return <Option key={states}>{states}</Option>;
  });

  return (
    <Row>
      <Col span={12} offset={6} style={ColStyle}>
        <AutoComplete
          style={{
            width: 200,
            marginRight: 8,
          }}
          onChange={inputChange}
          options={options}
          placeholder="Type in your city"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <Select
          defaultValue="State"
          onChange={handleChange}
          style={{ width: 80, marginRight: 8 }}
        >
          {children}
        </Select>
        <Button icon={<SearchOutlined />} onClick={onSubmit} />
      </Col>
    </Row>
  );
};

const mapStateToProps = state => {
  return {
    cities: state.cityData.allCities,
    states: state.cityData.allStates,
  };
};
export default connect(mapStateToProps, { fetchCityData, fetchAllCities })(
  SearchForm
);
