import React, { useState, useEffect } from 'react';
import Spinner from "../Elements/Spinner";
import { getWCApiAsync } from "../../wooApiConn";
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const FeatureProducts = () => {

    const [featuredata, setFeaturedata] = useState([]);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMyAPI() {
            let reqdata = {
                status: 'publish',
                per_page: 9,
                orderby: "date",
                order: "desc",
                featured: 1,
            }
            const featureProducts = await getWCApiAsync("products", reqdata);
            console.log(featureProducts);
            //setLoading(false);
            setFeaturedata(featureProducts);
        }

        fetchMyAPI();
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };


    return featuredata ? (
        <div className="site-section block-3 site-blocks-2 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 site-section-heading text-center pt-4">
                        <h2>Featured Products</h2>
                    </div>
                </div>
                <Carousel responsive={responsive}>
                    {featuredata.length ? (
                        featuredata.map((product, idx) =>
                            <Item key={idx} item={product} />
                        )
                    ) : ''}
                </Carousel>

            </div>
        </div>) : (
            <div><Spinner /></div>
        );
}

const Item = ({ item }) => {
    return (
        <div className="item">
            <div className="block-4 text-center">
                <div className="block-4-image">
                    <Link to={`/product/${item.id}`}>
                        <img src={item.images[0].src} className="img-fluid" alt={item.name} />
                    </Link>
                </div>
                <div className="block-4-text p-4">
                    <h3>
                        <Link to={`/product/${item.id}`}>
                            {item.name}
                        </Link>
                    </h3>
                    <p className="mb-0">Finding perfect products</p>
                    <p className="text-primary font-weight-bold">CHF {item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default FeatureProducts;