
import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {

	const { product } = props;

	return (

		<div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
			<div className="block-4 text-center border">
				<div className="block-4-image" style={{width: '100%', display: 'block',  height: '240px', overflow: 'hidden'}}>
					<Link to={`/product/${product.id}`}>
						{product.images.length > 0 ? <img src={product.images[0].src} alt="placeholder" className="img-fluid" /> : "" }
					</Link>
				</div>
				<div className="block-4-text p-4">
					<h3>
						<Link to={`/product/${product.id}`}>
							{product.name}
						</Link>
					</h3>
					<p className="mb-0">Finding perfect t-shirt</p>
					<p className="text-primary font-weight-bold">
						<span className="mr-2 price-dc">CHF {product.regular_price}</span>
						<span className="price-sale">CHF {product.price}</span>
					</p>
				</div>
			</div>
		</div>

	);
}

export default Product;
