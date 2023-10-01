import React from 'react'
import logo from '../../ImageForComponents/FRONTEND JOB.svg'
import './header.css'
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../state/storeSlice/storeSlice";
import { setObject } from "../../state/storeSlice/selectedItem";

const Header = () =>{
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.searchMode.mode);

    const handleClick = (e,type) => {
        dispatch(setObject(""))
        dispatch(toggleMode(type));
    };

    let searchClass = ["itemHeader"]
    let favoriteClass = ["itemHeader"]
    if(mode === "Search")
        searchClass.push("active")
    else if(mode === "Favorite")
        favoriteClass.push("active")
    return(
    <div className='wrapper'>
        <div className='header'>
            <div className='containerHeader'>
                <div className='logoImage' >
                    <img src={logo} alt='logo' />
                </div>
                <div className={searchClass.join(" ")} onClick={e =>  handleClick(e,dispatch(toggleMode("Search")))}>Поиск вакансий</div>
                <div className={favoriteClass.join(" ")} onClick={e => handleClick(e,dispatch(toggleMode("Favorite")))}>Избранные вакансии</div>
            </div>
        </div>
    </div>)
}


export default Header;