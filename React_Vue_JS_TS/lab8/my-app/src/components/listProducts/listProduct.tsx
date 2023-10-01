import React, {FC} from 'react';
import ProductComponent,{ Product } from '../presentProduct/product.tsx';
import './listProduct.css' 
const ProductListComponent:FC<ProductList> = ({massProducts}) =>{
    if(!massProducts.length)
        return(
            <div className='NoFound'>
                <p>Ничего не найдено</p>
            </div>
        )
    return(
        <div className='containerList'>
            <div className='itemList'>
                {massProducts.map((product,index) => <ProductComponent key={index} title={product.title} price={product.price} urlImage={product.urlImage}/>)}
            </div>
        </div>
    )
}

export default ProductListComponent
export type ProductList = {
    massProducts:Product[];
}