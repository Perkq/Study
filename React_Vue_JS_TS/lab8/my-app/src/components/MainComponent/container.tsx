import React,{FC , useState} from 'react'
import ProductListComponent from '../listProducts/listProduct.tsx'
import SearchComponent from '../search/search.tsx'
import { Product } from '../presentProduct/product.tsx'
const ContainerComponent:FC<Container> = ({Products}) => {
  const [searchedCar,setSearchedCar]= useState<string>('')
  return (
    <div>
      <SearchComponent value={searchedCar} setValue={setSearchedCar}/>
      <ProductListComponent massProducts={Products.filter((product)=> product.title.toLowerCase().includes(searchedCar.toLowerCase()))}/>
    </div>
   );
}

export default ContainerComponent

export type Container = {
    Products: Product[];
}