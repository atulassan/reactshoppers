import React, { useState } from "react";
//import { toast } from "react-toastify";
import { connect } from "react-redux";
import { addToCart } from "../../Store/Actions/Cart"
//var serialize = require("form-serialize");

const PTypeSingle = (props) => {

	console.log(props);

	const { product, dispatch } = props;
	let [quantity, setQuantity] = useState(1);
	//const [items, setItems] = useState([]);

	var increment = () => {
		setQuantity(parseInt(quantity) + 1);
	}
	var decrement = () => {
		if (parseInt(quantity) !== 1) {
			setQuantity(parseInt(quantity) - 1);
		}
	}

	// submit function
	let handleSubmit = async (e) => {
		e.preventDefault();
		//var tocartform = document.querySelector('#tocart');
		//var dataobjects = serialize(tocartform, { hash: true });
		//dispatch(addToCart({product_id: product.id, quantity: quantity, status:true}));
		dispatch(addToCart(product.id, quantity, true));
		console.log('update Cart Data', props.cartData);
	};

	return (
		<div className="col-lg-12">
			<p><strong className="text-primary h4">CHF {product.price}</strong></p>
			<form id="tocart" method="post" onSubmit={handleSubmit}>
				<div className="mb-5" style={{width:'200px'}}>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<button onClick={decrement} className="btn btn-outline-primary js-btn-minus" type="button">−</button>
						</div>
						<input type="text" className="form-control text-center" defaultValue="1" value={quantity} name="quantity" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
						<div className="input-group-append">
							<button onClick={increment} className="btn btn-outline-primary js-btn-plus" type="button">+</button>
						</div>
					</div>
				</div>
				<p>
					<input type="hidden" name="product_id" defaultValue={product.id} />
					<input type="submit" value="Add To Cart" name="submit" className="buy-now btn btn-sm btn-primary" />
				</p>
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	//console.log("testingsta", state);
    const { cartData } = state.cart;
    return {
        cartData
    };
}
export default connect(mapStateToProps)(PTypeSingle);
//export default PTypeSingle;
