import React from 'react';
import { Row, Col, Card, Button, Statistic, Empty } from 'antd';
import {
  DollarCircleTwoTone,
  SmileTwoTone,
  HomeTwoTone,
} from '@ant-design/icons';
import { SearchForm } from '../../common';

const StatisticStyle = {
  fontSize: '1.25rem',
  marginBottom: '1rem',
};

const RenderUserDashboard = ({
  savedCities,
  handleRemoveCity,
  handleOnCityClick,
  name,
}) => {
  return (
    <>
      <h1 style={{ textAlign: 'center', margin: '4.8vw 0 6.4vw 0' }}>
        Hey, {name}! Welcome to your Dashboard!
      </h1>
      <SearchForm />
      {savedCities.length === 0 ? (
        <Empty style={{ padding: '14vw 0' }} description="No pinned cities." />
      ) : (
        Object.keys(savedCities).map(i => (
          <Row
            key={i}
            style={{
              maxWidth: '1280px',
              margin: '5vw auto',
              marginBottom: '24vw',
            }}
          >
            <Col xs={24}>
              <h2 style={{ fontSize: '1.2rem', margin: ' 0 1.5vw 0' }}>
                Pinned Cities
              </h2>
            </Col>

            {savedCities.map((item, i) => (
              <Col sm={24} md={12} lg={8} key={i}>
                <Card style={{ fontSize: '1.2rem', margin: '1.5vw' }} key={i}>
                  <Row>
                    <Col xs={24}>
                      {item[0].city}, {item[0].state}
                    </Col>
                    <Col xs={8} sm={8} md={24} lg={12} xl={8}>
                      <Statistic
                        title="Rental Price"
                        value={item.rental_price}
                        prefix={<DollarCircleTwoTone twoToneColor="green" />}
                        valueStyle={StatisticStyle}
                      />
                    </Col>
                    <Col xs={8} sm={8} md={24} lg={12} xl={8}>
                      <Statistic
                        title="Walkability"
                        value={item.walkability}
                        prefix={<SmileTwoTone />}
                        suffix="/ 100"
                        valueStyle={StatisticStyle}
                      />
                    </Col>
                    <Col xs={8} sm={8} md={24} lg={12} xl={8}>
                      <Statistic
                        title="Livability"
                        value={item.livability}
                        prefix={<HomeTwoTone twoToneColor="orange" />}
                        suffix="/ 100"
                        valueStyle={StatisticStyle}
                      />
                    </Col>
                    <Col>
                      <Button onClick={() => handleRemoveCity(item.id)}>
                        Remove City
                      </Button>
                      <Button
                        onClick={() =>
                          handleOnCityClick({
                            city: item.city,
                            state: item.state,
                          })
                        }
                      >
                        View City Data
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        ))
      )}
    </>
  );
};

export default RenderUserDashboard;
