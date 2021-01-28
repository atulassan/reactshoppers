import React, { useState, useEffect } from 'react';
import Spinner from "../Elements/Spinner";
import { getWCApiAsync } from "../../wooApiConn";
import { Link } from 'react-router-dom';

const ListCategories = () => {

    const [categories, setCategoriesData] = useState([]);
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMyAPI() {
            let creqdata = {
                per_page: 200,
                page: 1,
                hide_empty: true,
              };    
    
            const categories = await getWCApiAsync("products/categories", creqdata);
            
            let getAllParents = categories.filter(function(category) {
                return category.parent === 0;
            });

            //setLoading(false);
            setCategoriesData(getAllParents);
        }

        fetchMyAPI();
    }, []);

    return categories.length > 0 ? (
        <div className="border p-4 rounded mb-4">
            <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
            <ul className="list-unstyled mb-0">
                { categories.length > 0 ? (
                    categories.map((category, idx) =>
                        <ListItem key={idx} category={category} />
                    )
                ) : ''}
            </ul>                                
        </div>
        ) : (
            <div><Spinner /></div>
        );
}


const ListItem = ({ category }) => {
    return (
        <li className="mb-1">
            <Link to={`/category/${category.id}`} className="d-flex">
                <span>{category.name}</span> <span className="text-black ml-auto"><strong>({category.count})</strong></span>
            </Link>
        </li>
    )
}


export default ListCategories;