import React, {FC} from 'react';
import './product.css'
const ProductComponent:FC<Product> = ({title,price,urlImage}) =>{
    return(
        <div className='wrapper'>
            <div className='item'>
                <div className='itemImageDiv'>
                        <img src={urlImage} alt={title} className='imageCar'/>
                </div>
                <div className='itemHeader'>
                    <p>{ title }</p>
                </div>
                <div className='itemBody'>
                    <div className='Text'>
                        <p>COST: { price }$</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent
export type Product = {
    title: string;
    price: number;
    urlImage: string;
}