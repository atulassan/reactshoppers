//import React, { useState, useEffect }from 'react';
import React from 'react';
import Nav from "./Nav";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import { useSelector } from 'react-redux'

const Header = (props) => {
    
    /*const [cartItems, setcartItems] = useState(0);

    useEffect(() => {
        async function fetchData() {
            let cartList = props.cartData.length || [];
            setcartItems(cartList);
        }
        fetchData();
    });*/    

    /*let cartData = localStorage.getItem("cartData");
    let cartcount = 0
    if(cartData !== null) {
        cartData = JSON.parse(cartData);
        cartcount = cartData.length;
    }*/

    const cart = useSelector(state => state.cart);

    console.log('cart Data', cart);

    return (
        <div className="site-navbar header">
            <div className="site-navbar-top">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                            <form className="site-block-top-search">
                                <span className="icon icon-search2"></span>
                                <input type="text" className="form-control border-0" placeholder="Search" />
                            </form>
                        </div>

                        <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                            <div className="site-logo">
                                    <Link className="js-logo-clone" to="/">React Shop</Link>
                            </div>
                        </div>

                        <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                            <div className="site-top-icons">
                                <ul>
                                    <li><a href="/" target="#"><span className="icon icon-person"></span></a></li>
                                    <li><a href="/"><span className="icon icon-heart-o"></span></a></li>
                                    <li>
                                        <Link to="/cart" className="site-cart">
                                            <span className="icon icon-shopping_cart"></span>
                                            <span className="count">{cart.cartData.length}</span>
                                        </Link>
                                    </li>
                                    <li className="d-inline-block d-md-none ml-md-0"><a href="/"
                                        className="site-menu-toggle js-menu-toggle"><span className="icon-menu"></span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Nav />
        </div>
    )
}

/*function mapStateToProps(state) {
	//console.log("testingsta", state);
    const { cartData } = state.cart;
    return {
        cartData
    };
}
export default connect(mapStateToProps)(Header);*/

export default Header;