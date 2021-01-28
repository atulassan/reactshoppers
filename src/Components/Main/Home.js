import React, { Component } from 'react';
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import Slider from "../Modules/Slider";
import QualityInfo from "../Modules/QualityInfo";
import ShopCategories from "../Modules/ShopCategories";
import FeatureProducts from "../Modules/FeatureProducts";

class Home extends Component {

    state = {
        loading: false,
        categories: {}
    }

    componentDidMount() {
        this.setState({ loading: true });
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

        console.log(getAllParents);
        this.setState({
            loading: false,
            categories: getAllParents
        });
    }

    render() {

        const { categories } = this.state;
        
        return (
            <React.Fragment>
                <Slider />
                <QualityInfo />
                    {this.state.loading ? <Spinner /> : <ShopCategories categories={categories} />}
                <FeatureProducts />
            </React.Fragment>
        )
    }
    
}
export default Home;