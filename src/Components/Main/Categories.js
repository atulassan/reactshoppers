import React, { Component } from 'react';
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import Breadcrumbs from "../Modules/Breadcrumbs";
import ShopCategories from "../Modules/ShopCategories";
//import { parse } from 'query-string';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
        }
    }

    componentWillMount () {
        this.setState({ loading: true});
        this.fetchItems();
    }

    async fetchItems() {

        let creqdata = {
            per_page: 200,
            page: 1,
            hide_empty: true,
          };    

        const categories = await getWCApiAsync("products/categories", creqdata);
        
        let getAllParents = categories.filter(function(category) {
            return category.parent === 0;
        });

        this.setState({
            loading: false,
            categories: getAllParents
        });
    }

    render() {

        const {loading, categories} = this.state;
        
        //console.log(this.props.match); 
        //console.log(this.props.match.params);
        //console.log(this.props.location);
        return (
            <React.Fragment>
                <Breadcrumbs />
                <div className="product-container">
				<div className="ftco-section">
					<div className="container">
						<h1>Shop  Content</h1>
						<div className="row">
							<div className="col-md-12 heading-section text-center">
								<span className="subheading">Featured Products</span>
								<h2 className="mb-4">Our Categories</h2>
								<p>Far far away, behind the word mountains, far from the countries
										Vokalia and Consonantia</p>
							</div>
						</div>
						<div className="row">
                            { loading ? <Spinner /> : <ShopCategories categories={categories} /> }
						</div>
					</div>
				</div>
			</div>
            </React.Fragment>
        )
    }        
}

export default Categories;