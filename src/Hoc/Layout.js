import React from 'react';
import Header from '../Components/Templates/Header';
import Footer from '../Components/Templates/Footer';

const Layout = (props) => {
    return (
        <div className="layout-container">
          <Header />
              {props.children}
          <Footer />
        </div>
    );
};

export default Layout;