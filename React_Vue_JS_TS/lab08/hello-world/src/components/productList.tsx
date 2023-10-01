import React, {FC} from "react";
import ProductElem from "./product.tsx";
import { ProductEl } from "./product.tsx";
import "./productList.css"

const ProductListComp : FC<ProductList> = ({arrayProducts}) => {
    return(
        <div className="mainList_container">
            <div className="wrapperList">
            {
                arrayProducts.map((item, index) => <ProductElem key={index}  image={item.image} name={item.name} price={item.price} />)
            }
            </div>
          
        </div>
    )
}





export default ProductListComp;
export type ProductList = {
    arrayProducts:ProductEl[];
}