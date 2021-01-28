import React, { Component, Fragment } from 'react';
//import { toast } from "react-toastify";
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { addToCart, removeCart } from "../../Store/Actions/Cart"
import { priceFormat } from "../../Utils"


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: null,
            cartData: [],
            total: 0,
        }
        this.handleIncrementQuantity = this.handleIncrementQuantity.bind(this);
        this.handleDecrementQuantity = this.handleDecrementQuantity.bind(this);
        this.handleRemoveCart =  this.handleRemoveCart.bind(this);
    }
    

    componentWillMount() {
        //toast.success("Cart Item Update Successfully 1");
        this.setState({ loading:true });
        console.log(this.props.cartData);
        this.fetchItems();
    }

    async fetchItems() {
        let products = [];
        await this.setState({ cartData: this.props.cartData });
        let { cartData, total } = this.state;
        total = 0;
		if (cartData.length > 0) {
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
                total += product.subtotal;
                products.push(product);
            }                
            this.setState({ loading:false, products: products, total: total });
            console.log(products);
        } else {
            this.setState({ loading :false });
        }
    }

    async handleIncrementQuantity(idx, product_id) {
        console.log('inc', idx, product_id);
        let { cartData }  = this.state;
        let { dispatch } = this.props
        console.log(cartData);
        await dispatch(addToCart(product_id, 1, true));
        this.fetchItems();
    }

   async handleDecrementQuantity(idx, product_id) {
        console.log('dec', idx, product_id);
        let { cartData }  = this.state;
        let { dispatch } = this.props
        console.log(cartData);
        await dispatch(addToCart(product_id, 1, false));
        this.fetchItems();
    }

   async handleRemoveCart(product_id) {
        let { cartData }  = this.state;
        let { dispatch } = this.props
        console.log(cartData);
        await dispatch(removeCart(product_id));
        this.fetchItems();
    }

    render() {
        
        const {loading, products, total} = this.state;

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
                                        { /*products.length > 0 && 
                                            products.map((product, idx) => <CartProduct key={idx} product={product} /> )
                                        */ }        
                                        { products.length > 0 && 
                                            products.map((product, idx) => (
                                                    <Fragment key={idx}>
                                                    <tr>
                                                        <td className="product-thumbnail">
                                                            <Link to={`/product/${product.id}`}>
                                                                <img style={{width:'100px', height:'100px', overFLow:'hidden'}} src={ product.images.length > 0 ? product.images[0].src : "" } alt="cartimg" className="img-fluid" />
                                                            </Link>
                                                        </td>
                                                        <td className="product-name">
                                                            <h2 className="h5 text-black">
                                                                <Link to={`/product/${product.id}`}>
                                                                    { product.name }
                                                                </Link>
                                                            </h2>
                                                        </td>
                                                        <td>CHF {priceFormat(product.price)}</td>
                                                        <td>
                                                            <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <button disabled={product.quantity > 1 ? false : true } onClick={()=> this.handleDecrementQuantity(idx, product.id)} className="btn btn-outline-primary js-btn-minus" type="button">-</button>
                                                                </div>
                                                                <input type="text" className="form-control text-center" value={product.quantity} defaultValue={product.quantity} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                                <div className="input-group-append">
                                                                    <button onClick={()=> this.handleIncrementQuantity(idx, product.id)} className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                                                                </div>                                
                                                            </div>
                                                        </td>
                                                        <td>CHF {priceFormat(product.subtotal)}</td>
                                                        <td><button onClick={()=>this.handleRemoveCart(product.id)} className="btn btn-primary btn-sm" type="button">X</button></td>
                                                    </tr>    
                                                    </Fragment>
                                            ) )
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
                                        <Link className="btn btn-outline-primary btn-sm btn-block" to="/">Continue Shopping</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="text-black h4" htmlFor="coupon">Coupon</label>
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
                                                <strong className="text-black">CHF {priceFormat(total)}</strong>
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-md-6">
                                                <span className="text-black">Total</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black">CHF {priceFormat(total)}</strong>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <Link className="btn btn-primary btn-lg py-3 btn-block" to="/checkout">Proceed To Checkout</Link>
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

function mapStateToProps(state) {
	//console.log("testingsta", state);
    const { cartData } = state.cart;
    return {
        cartData
    };
}
export default connect(mapStateToProps)(Cart);
//export default Cart;