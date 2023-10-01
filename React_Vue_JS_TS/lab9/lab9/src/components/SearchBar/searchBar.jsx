import React, { useState } from "react";
import './searchBar.css'
import { useSelector, useDispatch } from "react-redux";
import arrow from "../../ImageForComponents/Arrow.svg"
import time from "../../ImageForComponents/time.svg"
import job from "../../ImageForComponents/job.svg"
import star from "../../ImageForComponents/star.svg"
import cost from "../../ImageForComponents/cost.svg"
import { setCountry,setBetween,setEmployment,setIncome,setSchedule } from "../../state/storeSlice/FilterSlice"



const SearchBar = () =>{

    const [tempSrtingValue,setTempString] = useState("")
    const [value,setValue] = useState("Ничего")
    const [value1,setValue1] = useState("Ничего")
    const [value2,setValue2] = useState("Ничего")
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filterMode)
    return(
        <div className="wrapperSearch">
            <div className="containerSearch">
                <div className="containerForCountry">
                    <img src={arrow} className="imageCountry" alt="photoCarhehe" />
                    <input className="inputCss" placeholder="Место" type="text" value={tempSrtingValue} onChange={(event) => setTempString(event.target.value)}/>
                </div>
                <div className="containerForCountry VisSchedule">
                    <img src={time} className="imageCountry2" alt="photolab"/>
                    <div className="custom-select" onClick={(event) =>{setIsVisible1(isVisible1 ? false : true);console.log(isVisible1)}}>
                    <div className="select-selected">{value}</div>
                    <div className="select-options" style={{ display: isVisible1 ? 'block' : 'none' }}>
                    <div className="select-option"  onClick={(event) =>{dispatch(setSchedule(""));setIsVisible1(false);setValue("Ничего")}}>Ничего</div>
                    <div className="select-option"  onClick={(event) =>{dispatch(setSchedule("FullDay"));setIsVisible1(false);setValue("Полный день")}}>Полный день</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setSchedule("SmartSchedule"));setIsVisible1(false);setValue("Гибкий график")}}>Гибкий график</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setSchedule("DistanceWork"));setIsVisible1(false);setValue("Удалённая работа")}}>Удалённая работа</div>
                    </div>
                    </div>


                    {/* <img src={arrow} className="imageCountry"/>
                    <select value={filter.modeSchedule} onChange={(event) => dispatch(setSchedule(event.target.value))}>
                        <option value="FullDay">
                        Полный день
                        </option>
                        <option value="SmartSchedule">
                        Гибкий график
                        </option>
                        <option value="DistanceWork">
                        Удалённая работа
                        </option>
                    </select> */}
                </div>
                <div className="containerForCountry VisEmployment">
                    <img src={job} className="imageCountry2" alt="countryImg"/>
                    <div className="custom-select" onClick={(event) =>{setIsVisible2(isVisible2 ? false : true);console.log(isVisible1)}}>
                    <div className="select-selected">{value1}</div>
                    <div className="select-options2" style={{ display: isVisible2 ? 'block' : 'none' }}>
                    <div className="select-option"  onClick={(event) =>{dispatch(setEmployment(""));setIsVisible2(false);setValue1("Ничего")}}>Ничего</div>
                    <div className="select-option"  onClick={(event) =>{dispatch(setEmployment("FullEmployment"));setIsVisible2(false);setValue1("Полная занятость")}}>Полная занятость</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setEmployment("Part-timeEmployment"));setIsVisible2(false);setValue1("Частичная занятость")}}>Частичная занятость</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setEmployment("ProjectWork"));setIsVisible2(false);setValue1("Проектная работа")}}>Проектная работа</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setEmployment("Internship"));setIsVisible2(false);setValue1("Стажировка")}}>Стажировка</div>
                    </div>
                    </div>


                    {/* <img src={arrow} className="imageCountry"/>
                    <select value={filter.modeEmployment} onChange={(event) => dispatch(setEmployment(event.target.value))}>
                        <option value="FullEmployment">
                        Полная занятость
                        </option>
                        <option value="Part-timeEmployment">
                        Частичная занятость
                        </option>
                        <option value="ProjectWork">
                        Проектная работа
                        </option>
                        <option value="Internship">
                        Стажировка
                        </option>
                    </select> */}
                </div>
                <div className="containerForCountry VisBetween">
                    <img src={star} className="imageCountry2" alt="countryImg" />
                    <div className="custom-select" onClick={(event) =>{setIsVisible3(isVisible3 ? false : true);console.log(isVisible1)}}>
                    <div className="select-selected">{value2}</div>
                    <div className="select-options3" style={{ display: isVisible3 ? 'block' : 'none' }}>
                    <div className="select-option"  onClick={(event) =>{dispatch(setBetween(""));setIsVisible3(false);setValue2("Ничего")}}>Ничего</div>
                    <div className="select-option"  onClick={(event) =>{dispatch(setBetween("NotExperience"));setIsVisible3(false);setValue2("Нет опыта")}}>Нет опыта</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setBetween("BetweenOneToThree"));setIsVisible3(false);setValue2("от 1 года до 3 лет")}}>от 1 года до 3 лет</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setBetween("BetweenThreeToSix"));setIsVisible3(false);setValue2("от 3 до 6 лет")}}>от 3 до 6 лет</div>
                    <div className="select-option" onClick={(event) =>{dispatch(setBetween("OverSix"));setIsVisible3(false);setValue2("Более 6 лет")}}>Более 6 лет</div>
                    </div>
                    </div>

                    {/* <img src={arrow} className="imageCountry"/>
                    <select value={filter.modeBetween} onChange={(event) => dispatch(setBetween(event.target.value))}>
                        <option value="NotExperience">
                        Нет опыта
                        </option>
                        <option value="BetweenOneToThree">
                        от 1 года до 3 лет
                        </option>
                        <option value="BetweenThreeToSix">
                        от 3 до 6 лет
                        </option>
                        <option value="OverSix">
                        Более 6 лет
                        </option>
                    </select> */}
                </div>
                <div className="containerForCountry VisIncome">
                    <img src={cost} className="imageCountry" alt="countryImg" />
                    <input className="inputCss" placeholder="Доход" type="text" value={filter.modeIncome} onChange={(event) => dispatch(setIncome(event.target.value))}/>
                </div>
                <div className="containerForCountry Vis" onClick={e=> setIsVisible( isVisible ? false : true )}>
                    <p>Фильтры</p>
                </div>
                <div className="ButtonSearch" onClick={(event) =>{ dispatch(setCountry(tempSrtingValue))}}>
                    <p className="textSearch">поиск</p>    
                </div>              
            </div>
            <div className="containerFilter" style={{ display: isVisible ? 'flex' : 'none' }}>
                <div className="wrapperFilter">
                    <div>
                    <div className="Income">
                    <p>Доход</p>
                    <input placeholder="сумма" type="text" value={filter.modeIncome} onChange={(event) => dispatch(setIncome(event.target.value))}/>
                </div>
                <div className="Schedule">
                    <p>График работы</p>
                    <label >
                        <input name="Schedule" type="radio" checked={filter.modeSchedule === "" ? true : false} onClick={(event) => {dispatch(setSchedule(""))}}/>
                        <span>Ничего</span>
                    </label>
                    <label >
                        <input name="Schedule" type="radio" checked={filter.modeSchedule === "FullDay" ? true : false} onClick={(event) => {dispatch(setSchedule("FullDay"))}}/>
                        <span>Полный день</span>
                    </label>
                    <label >
                        <input value="SmartSchedule" name="Schedule" type="radio" checked={filter.modeSchedule === "SmartSchedule" ? true : false} onClick={(event) => {dispatch(setSchedule("SmartSchedule"))}}/>
                        <span>Гибкий график</span>
                    </label>
                    <label >
                        <input value="DistanceWork" name="Schedule" type="radio" checked={filter.modeSchedule === "DistanceWork" ? true : false} onClick={(event) => {dispatch(setSchedule("DistanceWork"))}}/>
                        <span>Удалённая работа</span>
                    </label>

                </div>
                <div className="Employment">
                    <p>Тип занятости</p>
                    <label >
                        <input value="FullEmployment" name="Employment" type="radio" checked={filter.modeEmployment === "" ? true : false} onClick={(event) => {dispatch(setEmployment(""))}}/>
                        <span>Ничего</span>
                    </label>
                    <label >
                        <input value="FullEmployment" name="Employment" type="radio" checked={filter.modeEmployment === "FullEmployment" ? true : false} onClick={(event) => {dispatch(setEmployment("FullEmployment"))}}/>
                        <span>Полная занятость</span>
                    </label>
                    <label >
                        <input value="Part-timeEmployment" name="Employment" type="radio" checked={filter.modeEmployment === "Part-timeEmployment" ? true : false} onClick={(event) => {dispatch(setEmployment("Part-timeEmployment"))}}/>
                        <span>Частичная занятость</span>
                    </label>
                    <label >
                        <input value="ProjectWork" name="Employment" type="radio" checked={filter.modeEmployment === "ProjectWork" ? true : false} onClick={(event) => {dispatch(setEmployment("ProjectWork"))}}/>
                        <span>Проектная работа</span>
                    </label>
                    <label >
                        <input value="DistanceWork" name="Employment" type="radio" checked={filter.modeEmployment === "DistanceWork" ? true : false}  onClick={(event) => {dispatch(setEmployment("DistanceWork"))}}/>
                        <span>Стажировка</span>
                    </label>
                </div>
                <div className="Between">
                    <p>Опыт работы</p>
                    <label >
                        <input value="NotExperience" name="Between" type="radio" checked={filter.modeBetween === "" ? true : false} onClick={(event) => {dispatch(setBetween(""))}}/>
                        <span>Ничего</span>
                    </label>
                    <label >
                        <input value="NotExperience" name="Between" type="radio" checked={filter.modeBetween === "NotExperience" ? true : false} onClick={(event) => {dispatch(setBetween("NotExperience"))}}/>
                        <span>Нет опыта</span>
                    </label>
                    <label >
                        <input value="BetweenOneToThree" name="Between"  type="radio" checked={filter.modeBetween === "BetweenOneToThree" ? true : false} onClick={(event) => {dispatch(setBetween("BetweenOneToThree"))}}/>
                        <span>От 1 года до 3 лет</span>
                    </label>
                    <label >
                        <input value="BetweenThreeToSix" name="Between"  type="radio" checked={filter.modeBetween === "BetweenThreeToSix" ? true : false} onClick={(event) => {dispatch(setBetween("BetweenThreeToSix"))}}/>
                        <span>От 3 до 6 лет</span>
                    </label>
                    <label >
                        <input value="OverSix" name="Between"  type="radio" checked={filter.modeBetween === "OverSix" ? true : false} onClick={(event) => {dispatch(setBetween("OverSix"))}}/>
                        <span>Более 6 лет</span>
                    </label>
                </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SearchBar