import React, {FC} from 'react';
import './search.css'
import icon from '../../ImagesForComponents/free-icon-search-3024592.png'
const SearchComponent:FC<Search> = ({value,setValue}) =>{
    return(
    <div className='wrapperInput'>
        <div className='InputDiv'>
            <input className='inputCss' placeholder='Ввод' type='text' value={value} onChange={(ChangeEvent)=>{
            setValue(ChangeEvent.target.value)
            }}/>
            <img className='Image' src={icon}/>
        </div>
    </div>
    )
}
export default SearchComponent;
export type Search = {
    value:string,
    setValue: (newValue:string) => void
}