import React, {FC} from "react";
import './search.css';
// import icon from '../photos/search_icon.png';

const SearchComponent : FC<Search> = ({value, setValue}) => {
    return(
        <div className="wrapperSearch">
            <div className="inputHolder">
                <input type="text" className="inputText"  placeholder="Введите название..." value={value} onChange={(ChangeEvent) => {
                    setValue(ChangeEvent.target.value)
                }}/>
                {/* <img className="imageIcon" src={icon} /> */}
            </div>
        </div>

    )
}



export default SearchComponent;
export type Search = {
    value : string,
    setValue: (newValue:string) => void
}