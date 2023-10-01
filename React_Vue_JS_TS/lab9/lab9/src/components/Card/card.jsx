import React from 'react'
import './card.css'
import like from '../../ImageForComponents/Vector.png'
import likeGray from '../../ImageForComponents/like2.png'
import { useDispatch, useSelector } from "react-redux";
import { setObject } from "../../state/storeSlice/selectedItem";
import { setLikeState } from "../../state/storeSlice/massFavoriteCards"
import {setTag} from "../../state/storeSlice/tagsSlice"


const Card = ({card}) =>{

    const dispatch = useDispatch();
    const tagsMass = useSelector((state) => state.tags.mode)
    return(
            <div className='containerCard' onClick={(e =>{
                dispatch(setObject(card))
            })}>
                <div className='imageCard'>
                    <img src={card.imageSrc}  alt='cardImage'/>
                </div>
                <div className='infoBlock'>
                    <p className='corporationName'>{card.corpName}</p>
                    <p className='jobName'>{card.jobName}</p>
                    <p className='countryName'>{card.counName}</p>
                    <div className='tagsMass'>
                        {card.tags.map((item,index) =>{
                            let classMass = ["tag"];
                            if(tagsMass.includes(item))
                                classMass.push("active")
                            return <p className={classMass.join(" ")} onClick={(event)=>{dispatch(setTag(item)); event.stopPropagation()}} >{item}</p>
                        })}
                    </div>
                </div>
                <div className='dopFunc'>
                        <img src={card.isLiked ? like : likeGray} onClick={((event)=>{dispatch(setLikeState({id:card.id}));  event.stopPropagation()})} className='likeBtn' alt='likeIcon'/>
                    <div className='date'>{card.date}</div>
                </div>
            </div>
    )
}

export default Card