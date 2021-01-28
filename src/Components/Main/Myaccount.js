import React, { Component, Fragment } from 'react';
import { toast } from "react-toastify";

class Myaccount extends Component {

    state = {
        loading: false,
        products: null,
    }

    componentDidMount() {
        toast.success("MY Account Page");
    }

    render() {
        return (
            <Fragment>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <p>My Acccount Lorem Ipsum Dolor sit amet, consectetur adipiscing</p>        
                        </div>
                    </div>
                </div>            
            </Fragment>
        )
    }
}


export default Myaccount;