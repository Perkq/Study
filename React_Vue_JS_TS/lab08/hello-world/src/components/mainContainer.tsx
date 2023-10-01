import React, {FC, useState} from "react";
import {ProductEl} from './product.tsx';
import ProductListComp from './productList.tsx';
import SearchComponent from './search.tsx';

const MainComponentContainer : FC<Container> = ({Products}) => {
    const [searchFruit, setSearchFruit] = useState<string>('');
    return(
        <div>
            <SearchComponent value={searchFruit} setValue={setSearchFruit}/>
            <ProductListComp arrayProducts={Products.filter((prod) => prod.name.toLowerCase().includes(searchFruit.toLowerCase()))} />
        </div>
    )
}




export default MainComponentContainer;
export type Container = {
    Products: ProductEl[];
}

