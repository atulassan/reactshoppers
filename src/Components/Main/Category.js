import React, { Component } from 'react';
import { getWCApiAsync } from "../../wooApiConn";
import Spinner from "../Elements/Spinner";
import ListCategories from "../Modules/ListCategories";
import Breadcrumbs from "../Modules/Breadcrumbs";
//import ListProducts from "../Modules/ListProducts";
import Product from "../Elements/Product";
import ReactPaginate from 'react-paginate';
//import { parse } from 'query-string';
import { connect } from "react-redux";
import { addToWishList } from "../../Store/Actions/WishList"

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            id: 0,
            pages: 0,
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
            order: "desc"
        }
        this.handlePageClick =  this.handlePageClick.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.scrollRef = React.createRef();
        this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    }

    componentDidMount () {
        this.setState({ loading: true });
        this.fetchItems();
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.match.params.id !==  this.props.match.params.id) {
          this.setState({loading: true});
          this.fetchItems();
          //window.scrollTo(0, 0);
          window.scrollTo(0, this.scrollRef.current.offsetTop);
          //this.scrollRef.scrollIntoView({behavior: 'smooth'});
      }
    }


    async fetchItems() {

        let { id } = this.props.match.params;
        let { currentPage, pages, per_page, orderBy, order  } = this.state;

        let rqdata = {
            status: 'publish',
            per_page: per_page,
            category: id,
            page: currentPage,
            orderby: orderBy, //title
            order: order //asc
        }
        
        let products = await getWCApiAsync("products", rqdata);
        let category = await getWCApiAsync("products/categories/"+id, rqdata);
        console.log(category);
        if(category.hasOwnProperty('id') && category.hasOwnProperty('count')) {
            pages = Math.ceil(parseInt(category.count)/9);
        }
        this.setState({
            loading: false,
            products: products,
            pages: pages
        });
    }

    async handlePageClick(e) {

        let { id } = this.props.match.params;
        let { currentPage, per_page, orderBy, order } = this.state;
        currentPage = parseInt(currentPage) + parseInt(e.selected);
        let rqdata = {
            status: 'publish',
            per_page: per_page,
            category: id,
            page: currentPage,
            orderby: orderBy, //title
            order: order //asc
        }
        let products = await getWCApiAsync("products", rqdata);
        this.setState({
            products: products
        });
    }

    async handleSorting(orderBy, order, index) {

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

    handleProductScroll() {
        console.log('testing');
    }

    async handleAddToWishlist(id) {
        let { dispatch } = this.props
        console.log(id);
        await dispatch(addToWishList(id));
    }

    render() {

        const {loading, products, pages, filters} = this.state;

        //console.log(this.props.match); 
        //console.log(this.props.match.params);
        //console.log(this.props.location);
        return (
            <React.Fragment>
                <Breadcrumbs />
                <div className="site-section" ref={this.scrollRef}>
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-9 order-2">
                                
                                <div className="row mb-5" onScroll={this.handleProductScroll}>
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
                                            {
                                                products.map( product => <Product key={product.id} addWish={this.handleAddToWishlist} product={product} /> )
                                            }
                                        </>
                                        : "No Products found" 
                                    }
                                </div>
                                { !loading && 
                                <div className="row aos-init aos-animate" data-aos="fade-up">
                                    <div className="col-md-12 text-center">
                                        <div className="site-block-27">
                                            { pages && 
                                                <ReactPaginate
                                                    previousLabel={"<"}
                                                    nextLabel={">"}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={pages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={(event)=>this.handlePageClick(event)}
                                                    containerClassName={"pagination pagination-sm"}
                                                    activeClassName={"active"} />
                                                }
                                        </div>
                                    </div>
                                </div>
                            }
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

function mapStateToProps(state) {
	console.log("testingsta", state);
	let { wishData } = state.wishlist;
	return { 
		wishData
	}
}

export default connect(mapStateToProps)(Category);

//export default Category;