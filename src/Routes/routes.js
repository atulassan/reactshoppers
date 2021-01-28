import React from 'react';
import Layout from '../Hoc/Layout';
import { Switch, Route }  from 'react-router-dom';

import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';

import Home from "../Components/Main/Home";
import About from "../Components/Main/About";
import Categories from "../Components/Main/Categories";
import Category from "../Components/Main/Category";
import Shop from "../Components/Main/Shop";
import Product from "../Components/Main/Product";
import Contact from "../Components/Main/Contact";
//import Cart from "../Components/Main/Cart";
import CartNew from "../Components/Main/CartNew";
import Register from "../Components/Main/Register";
import Login from "../Components/Main/Login";
import Myaccount from "../Components/Main/Myaccount";
import NotFound from "../Components/Main/NotFound";
import ReduxExample from "../Components/Main/ReduxExample";
import FormBuilder from "../Components/Main/FormBuilder";

const Routes = (props) => {
  console.log(props);
  return(
    <Layout>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/shop" component={Shop} />
        <Route path="/categories" component={Categories} />
        <Route path="/category/:id" component={Category} />
        <Route path="/product/:id" component={Product} />
        <PublicRoute {...props} path="/register" component={Register} />
        <PublicRoute {...props} path="/login" component={Login} />
        <PrivateRoute {...props} path="/myaccount" component={Myaccount} />
        <Route path="/cart" component={CartNew} />
        <Route path="/reduxexample" component={ReduxExample} />
        <Route path="/contact" component={Contact} />
        <Route path="/formbuilder" component={FormBuilder} />
        <Route component={NotFound} /> 
      </Switch>    
    </Layout>
  )
}

export default Routes;
