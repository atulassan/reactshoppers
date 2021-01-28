import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const Category = (props) => {
	const { category } = props;
	//const isImageAvail = category.hasOwnProperty('image') && catgory.image.hasOwnProperty('src') && catgory.image.src !== "";

	return (
		<Fade bottom>
			<div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="">
				<Link to={`/category/${category.id}`} className="block-2-item">
					<div className="image">
						<img src={category.image.src} alt="" className="img-fluid" />
					</div>
					<div className="text">
						<span className="text-uppercase">Collections</span>
						<h3>{category.name}</h3>
					</div>		
				</Link>
			</div>
		</Fade>
	);
}

export default Category;
