import React, { Component } from 'react';
import { toast } from "react-toastify";
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import { Link } from 'react-router-dom';

class Cart extends Component {

    state = {
        loading: false,
        products: null,
        
    }

    componentWillMount() {
        toast.success("Cart Item Update Successfully 1");
        this.setState({ loading:true });
        this.fetchItems();
    }

    async fetchItems() {
        let products = [];
        let cartData = localStorage.getItem("cartData");
        console.log(typeof(cartData));
		if (cartData !== null) {
            cartData = JSON.parse(cartData);     
            if(cartData.length > 0) {
                var pids = cartData.map(function (product) { return product.product_id; });
                let inputdata = { include: pids };
                let cartproducts = await getWCApiAsync("products", inputdata);
                for(const product of cartproducts) {
                    console.log(product.id);
                    let pid = cartData.filter((cart) => {
                        return parseInt(cart.product_id) === product.id;     
                    });
                    product.quantity = parseInt(pid[0].quantity);
                    product.subtotal = parseInt(pid[0].quantity) * parseFloat(product.price);
                    products.push(product);
                }                
                this.setState({ loading:false, products: products });
                console.log(products);
            }
        } else {
            this.setState({ loading :false });
        }
    }


    render() {
        
        const {loading, products} = this.state;

        return (
            <React.Fragment>

                { loading ? 
                <Spinner /> :
                products ? 
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <form>
                                <div className="site-blocks-table">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail">Image</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-total">Total</th>
                                                <th className="product-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { products.length > 0 && 
                                            products.map((product, idx) => <CartProduct key={idx} product={product} /> )
                                        }        
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <button className="btn btn-primary btn-sm btn-block">Update Cart</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-primary btn-sm btn-block">Continue Shopping</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="text-black h4" for="coupon">Coupon</label>
                                        <p>Enter your coupon code if you have one.</p>
                                    </div>
                                    <div className="col-md-8 mb-3 mb-md-0">
                                        <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-sm">Apply Coupon</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pl-5">
                                <div className="row justify-content-end">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-12 text-right border-bottom mb-5">
                                                <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <span className="text-black">Subtotal</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black">$230.00</strong>
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-md-6">
                                                <span className="text-black">Total</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black">$230.00</strong>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <button className="btn btn-primary btn-lg py-3 btn-block" onclick="window.location='checkout.html'">Proceed To Checkout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                : 
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <p>No products In Cart</p>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
        )
    }
}


let increment = () => {
    console.log(this);
    console.log('increment');
}

let decrement = () => {
    console.log(this);
    console.log('decrement')
}

const CartProduct = ({ product }) => {

    let productImage = product.images.length > 0 ? product.images[0].src : "";

    return (
        <tr>
            <td className="product-thumbnail">
                <Link to={`/product/${product.id}`}>
                    <img src={ productImage } alt="cartimg" className="img-fluid" />
                </Link>
            </td>
            <td className="product-name">
                <h2 className="h5 text-black">
                    <Link to={`/product/${product.id}`}>
                        { product.name }
                    </Link>
                </h2>
            </td>
            <td>${product.price}</td>
            <td>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button onClick={decrement} className="btn btn-outline-primary js-btn-minus" type="button">-</button>
                    </div>
                    <input type="text" className="form-control text-center" value={product.quantity} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <div className="input-group-append">
                        <button onClick={increment} className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                    </div>                                
                </div>
            </td>
            <td>${parseFloat(product.subtotal.toFixed(2))}</td>
            <td><a href="/" className="btn btn-primary btn-sm">X</a></td>
        </tr>                                   
    )     
}

export default Cart;