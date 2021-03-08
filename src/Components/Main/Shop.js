import React, { Component } from 'react';
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import ListCategories from "../Modules/ListCategories";
import Breadcrumbs from "../Modules/Breadcrumbs";
//import ListProducts from "../Modules/ListProducts";
import Product from "../Elements/Product";
//import { parse } from 'query-string';
import InfiniteScroll from "react-infinite-scroll-component";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            currentPage: 1,
            per_page: 9,
            filters: [
                {name:'Höchste Bewertung', orderBy:'rating', order: 'desc', active: true},
                {name:'Name A-Z', orderBy:'title', order: 'asc', active: false},
                {name:'Name Z-A', orderBy:'title', order: 'desc', active: false},
                {name:'Preis (niedrig bis hoch)', orderBy:'price', order: 'desc', active: false},
                {name:'Preis (hoch bis niedrig)', orderBy:'price', order: 'asc', active: false},
            ],
            orderBy: "rating",
            order: "desc",
            loadMore: true,
        }
        this.handleSorting = this.handleSorting.bind(this);
        this.fetchMoreItems = this.fetchMoreItems.bind(this);
    }

    componentDidMount () {
        this.setState({ loading: true });
        this.fetchItems();
    }

    async fetchItems() {
        let { currentPage, per_page, orderBy, order  } = this.state;
        let rqdata = {
            status: 'publish',
            per_page: per_page,
            page: currentPage,
            orderby: orderBy, //title
            order: order //asc
        }
        let products = await getWCApiAsync("products", rqdata);
        this.setState({
            loading: false,
            products: products
        });
    }

    async fetchMoreItems() {
        let { currentPage, per_page, orderBy, order, products } = this.state;
        console.log('Current Page', currentPage + 1);
        let rqdata = {
            status: 'publish',
            per_page: per_page,
            page: currentPage + 1,
            orderby: orderBy, //title
            order: order //asc
        }
        let updProducts = await getWCApiAsync("products", rqdata);

        this.setState({
            loading: false,
            loadMore: updProducts.length ? true : false,
            //products: updProducts.length ? products.concat(updProducts) : products,
            // array concat methoods
            products: updProducts.length ? [].concat(products, updProducts) : products,
            //spread join two array methods
            //products: updProducts.length ? [...products, ...updProducts] : products,
            currentPage: currentPage + 1,
        }); 

    }

    async handleSorting( orderBy, order, index ) {

        console.log(orderBy, order);    

        let { id } = this.props.match.params;
        let { currentPage, per_page, filters } = this.state;
        let rqdata = {
            status: 'publish',
            per_page: per_page,
            category: id,
            page: currentPage,
            orderby: orderBy, //title
            order: order //asc
        }
        let products = await getWCApiAsync("products", rqdata);
        filters.forEach((filter, idx)=> {
            if(idx === index) {
                filters[index]['active'] = true;    
            } else {
                filters[idx]['active'] = false;
            }
        })
        this.setState({
            products: products,
            orderby: orderBy, //title
            order: order,
            filters: filters,
        });
    }

    handleProductScroll(e) {
        console.log(e);    
    }

    render() {

        const {loading, products, filters, currentPage} = this.state;
        
        //console.log(this.props.match); 
        //console.log(this.props.match.params);
        //console.log(this.props.location);
        return (
            <React.Fragment>
                <Breadcrumbs />
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-9 order-2">
                                <div className="row infinitescroll">
                                    { loading ? <Spinner /> : 
                                            products.length > 0 ? 
                                            <>  
                                                <div className="col-md-12 product-sorting">
                                                    <ul>
                                                        {
                                                        filters.map( (filter, idx) => <li key={idx} onClick={()=> this.handleSorting(filter.orderBy, filter.order, idx)} 
                                                        className={filter.active ? "sort-active": ""}>{filter.name}</li> )
                                                        }
                                                    </ul>
                                                </div>
                                                <InfiniteScroll
                                                        dataLength= { currentPage }
                                                        next={this.fetchMoreItems}
                                                        style={{ overFLow:'hidden' }}
                                                        hasMore={true}
                                                        loader={<p style={{textAlign:'center'}}>Please Wait Loading...</p>}
                                                        scrollableTarget="infinitescroll">
                                                            <div className="col-md-12 product-sorting">
                                                                <div className="row">
                                                                    {
                                                                        products.map( product => <Product key={product.id} product={product} /> )
                                                                    }
                                                                </div>
                                                            </div>    
                                                </InfiniteScroll>    
                                            </>
                                            : "No Products found" 
                                        }
                                </div>
                            </div>
                            <div className="col-md-3 order-1 mb-5 mb-md-0">
                                <ListCategories />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }        
}

export default Shop;