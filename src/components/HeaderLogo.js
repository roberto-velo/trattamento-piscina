import React from 'react';

const HeaderLogo = () => (
  <div style={{
    width: '100%',
    background: 'white',
    padding: '24px 0 20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25), 0 3px 12px rgba(25,118,210,0.15)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    minHeight: 100,
    zIndex: 1000,
    marginBottom: '12px'
  }}>
    <img
      src="/IMG_4054.PNG"
      alt="Metra Composite Materials Logo"
      style={{
        maxWidth: '400px',
        width: '90%',
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
        margin: '0 auto',
        borderRadius: '16px',
        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3)) drop-shadow(0 3px 6px rgba(25,118,210,0.2)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
      }}
    />
  </div>
);

export default HeaderLogo; 