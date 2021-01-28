import React, { Component } from 'react';
import {getWCApiAsync} from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import PTypeSingle from "../Elements/PTypeSingle";
import PTypeVariation from "../Elements/PTypeVariation";
import parse from 'html-react-parser';

class Product extends Component {

    state = {
        loading: false,
        product: null,
        variations: null,
        productType: null,
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.fetchItem();
    }

    async fetchItem() {
        // ES6 destructuring the props
        const { id } = this.props.match.params;
        let product = await getWCApiAsync("products/"+id);
        let variations = (product.type === 'variable') ? await getWCApiAsync("products/" + id + "/variations") : null;
        let typeProduct = null;
        if(product.type === 'simple') {
            console.log('simple');
			typeProduct = <PTypeSingle product={product} />
		} else {
            console.log('variation');
			typeProduct = <PTypeVariation product={product} variations={variations} />
		}    

        this.setState({
            loading: false,
            product: product,
            variations: variations,
            productType: typeProduct,
        });
    }

    render() {
        const { loading, product, productType } = this.state;
        
        return (
            <React.Fragment>
                { loading ? <Spinner /> :
                    <div className="site-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={product.images[0].src} alt={product.images[0].alt} className="img-fluid" />
                                </div>
                                <div className="col-md-6">
                                    <h2 className="text-black">{product.name}</h2>
                                    <div className="desc">
                                        {parse(product.short_description)}
                                    </div>
                                    {productType}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }        
}

export default Product;