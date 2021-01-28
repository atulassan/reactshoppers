import React, { useState, useEffect } from 'react';
import Spinner from "../elements/Spinner";
import { getWCApiAsync } from "../../wooApiConn";

const ListProducts = (props) => {

    const { id } = props;
 
    console.log(props);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(id);

    useEffect(() => {

        const fetchItems = async () => {

            let reqdata = {
                status: 'publish',
                per_page: 9,
                orderby: "date",
                order: "desc",
                featured: 1,
            }
            const products = await getWCApiAsync("products", reqdata);
            console.log(products);
            setLoading(false);
            setProducts(products);
        }

        fetchItems();
    }, []);

    return (
        <React.Fragment>
            { loading ? <Spinner /> : <div>Lorem</div> }
        </React.Fragment>
    )
}

export default ListProducts;