import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, []);
  return (
    <footer
      style={{
        backgroundColor: 'white',
        textAlign: 'center',
        padding: '1rem',
        width: '100%',
        bottom: '0',
        fontFamily: 'TrebuchetMS',
        color: 'teal',
      }}
    >
      Cityspire ©{date} Created by LabsPT17-Cityspire-B
    </footer>
  );
};

export default Footer;
