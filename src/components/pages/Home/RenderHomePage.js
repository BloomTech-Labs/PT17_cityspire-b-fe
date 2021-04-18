import React from 'react';

import cities from '../../../assets/imgs/cities.png';

import map from '../../../assets/imgs/map2.jpg';
import topplaces from '../../../assets/imgs/bestplacestolive.jpg';

import { Layout, Button } from 'antd';

import { Header, Footer, SearchForm } from '../../common';

const { Content } = Layout;

function RenderHomePage() {
  return (
    <Layout className="layout">
      <Header />
      <Content style={{ height: '25vh' }}>
        <div
          style={{
            backgroundImage: `url("${cities}")`,
            backgroundSize: 'cover',
            height: '30vh',
            width: '100%',
            paddingTop: '4vh',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '2.4rem',
              textAlign: 'center',
              fontFamily: 'TrebuchetMS',
            }}
          >
            Search Your Dream City
          </h1>
          <SearchForm />
        </div>
      </Content>

      <Content style={{ height: '25vh' }}>
        <div
          style={{
            backgroundImage: `url("${map}")`,
            height: '30vh',
            width: '100%',
            paddingTop: '4vh',
            marginTop: '1%',
            textAlign: 'center',
            display: 'grid',
            backgroundSize: 'cover',
          }}
        >
          <Button
            href="https://www.nationsonline.org/oneworld/us_states_maps.htm"
            style={{
              fontSize: '1rem',
              background: 'F6F4F3',
              borderRadius: '4px',
              color: '#104573',
              fontFamily: 'TrebuchetMS',
              width: '19%',
              margin: 'auto',
            }}
          >
            Learn more about US States
          </Button>
        </div>
      </Content>

      <Content style={{ height: '25vh' }}>
        <div
          style={{
            backgroundImage: `url("${topplaces}")`,
            height: '30vh',
            backgroundSize: 'cover',
            width: '100%',
            paddingTop: '4vh',
            marginTop: '2%',
            textAlign: 'center',
            display: 'grid',
          }}
        >
          <Button
            href="https://www.today.com/money/best-places-live-2020-2021-according-u-s-news-world-t193899"
            style={{
              fontSize: '1rem',
              background: 'F6F4F3',
              borderRadius: '4px',
              color: '#104573',
              fontFamily: 'TrebuchetMS',
              width: '19%',
              margin: 'auto',
            }}
          >
            Top cities in 2021
          </Button>
        </div>
        <Footer />
      </Content>
    </Layout>
  );
}
export default RenderHomePage;
