import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

import cityspireLogo from '../../assets/imgs/cityspireLogo.png';
import { Row, Col, Menu, Dropdown, Avatar, Button, Image, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.25rem 5vw',
  borderBottom: 'solid thin #eee',
  backgroundColor: 'white',
  fontFamily: 'TrebuchetMS',
  color: 'teal',
};

const Header = () => {
  const { authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  const { push } = useHistory();

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
          localStorage.setItem('token', info.sub);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  const handleDashboardClick = id => {
    push(`/profile/${id}/dashboard`);
  };
  const handlePinnedCityClick = id => {
    push(`/profile/${id}/pinnedcities`);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => handleDashboardClick(userInfo.sub)}
        style={{ color: 'teal' }}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => handlePinnedCityClick(userInfo.sub)}
        style={{ color: 'teal' }}
      >
        Pinned Cities
      </Menu.Item>
    </Menu>
  );

  return (
    <Row style={HeaderStyle}>
      <Col>
        <a href="/">
          <Image
            preview={false}
            src={cityspireLogo}
            style={{ width: '120px' }}
          />
        </a>
      </Col>

      <Col>
        <Row>
          <Space size="large">
            <Dropdown overlay={menu} trigger={['click']}>
              <Space
                size="small"
                onClick={e => e.preventDefault()}
                style={{ cursor: 'pointer', color: 'teal' }}
              >
                <Avatar size="small" icon={<UserOutlined />} />
                {userInfo ? userInfo.name : 'loading...'} <DownOutlined />
              </Space>
            </Dropdown>
            <Button
              onClick={() => authService.logout()}
              style={{ color: 'teal' }}
            >
              Logout
            </Button>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
