import React, { Component, Fragment } from 'react';
import { toast } from "react-toastify";

class ReduxExample extends Component {

    state = {
        loading: false,
        products: null,
    }

    componentDidMount() {
        toast.error("cart items");
    }

    componentWillMount() {
        toast.success("Cart Item Update Successfully 1");
    }

    render() {
        return (
            <Fragment>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <p>Lorem Ipsum Dolor sit amet, consectetur adipiscing</p>        
                        </div>
                    </div>
                </div>            
            </Fragment>
        )
    }
}


export default ReduxExample;