import React, {FC} from "react";
import "./product.css";

const ProductElem :FC<ProductEl> = ({image, name, price}) => {
    return(
    <div className="main_container">
        <img className="img" src={ image }></img>
        <div className="name">{ name }</div>
        <div className="price">{ price }</div>
    </div>
    
    )   
}
export default ProductElem

export type ProductEl = {
    image : string;
    name : string;
    price : string;
}