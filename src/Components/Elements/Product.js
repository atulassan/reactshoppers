
import React from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "react-lazy-images";
import loadingImage from '../../resources/images/8kpb.gif'
import noImage from '../../resources/images/noimage.jpg'

const Product = (props) => {

	const { product } = props;

	const handleAddWishlist = (id) => {
		console.log(id);
		props.addWish(id);
	}

	return (

		<div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
			<div className="block-4 text-center border">
				<div className="block-4-image" style={{width: '100%', display: 'block',  height: '240px', overflow: 'hidden'}}>
					<Link to={`/product/${product.id}`}>
						{product.images.length > 0 ? 
					 	<LazyImage src={ product.images.length ? product.images[0].src : noImage } alt="Buildings with tiled exteriors, lit by the sunset." 
						placeholder={({ imageProps, ref }) => (
							<img ref={ref} src={loadingImage} alt={imageProps.alt} />
						)}
						actual={({ imageProps }) => <img {...imageProps} alt={product.name} /> }
						/> 
						: "" }
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
					<p className="text-primary font-weight-bold">
						<span className="mr-2 price-dc" onClick={()=>handleAddWishlist(product.id)} style={{cursor: 'pointer'}}>Add Wishlist</span>
					</p>
				</div>
			</div>
		</div>

	);
}

export default Product;
