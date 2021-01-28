import React from 'react';
import Category from "../Elements/Category";


const ShopCategories = (props) => {
    const { categories } = props;
    
    return (
        <div className="site-section site-blocks-2">
            <div className="container">
                <div className="row">
                    {categories.length ? (
                        categories.map(category => 
                            <Category key={category.id} category={category} />
                        )
                    ) : 'testing'}
                </div>
            </div>
        </div>
    )
}

export default ShopCategories;