import React, { useState } from "react";
import './searchBar.css'
import { useSelector, useDispatch } from "react-redux";
import time from "../../ImageForComponents/time.svg"
import job from "../../ImageForComponents/job.svg"
import star from "../../ImageForComponents/star.svg"
import cost from "../../ImageForComponents/cost.svg"
import { setCountry,setBetween,setEmployment,setIncome,setSchedule } from "../../state/storeSlice/FilterSlice"
import arrow from "../../ImageForComponents/Arrow.svg"
import {Button,TextField} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const SearchBar = () =>{
    const [tempSrtingValue,setTempString] = useState("")
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filterMode)
    return(
        <div className="wrapperSearch">
            <div className="containerSearch">
                <div className="containerForCountry">
                    <img src={arrow} className="imageCountry"/>
                    <TextField id="outlined-basic" label="Место" variant="outlined" onChange={(event) =>{ dispatch(setCountry(event.target.value))}}/>
                    {/* onChange={(event) => setTempString(event.target.value)}> */}
                </div>
                <div className="containerForCountry VisSchedule">
                    <img src={time} className="imageCountry"/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">График</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter.modeSchedule}
                                label="Age"
                                onChange={(event)=> dispatch(setSchedule(event.target.value))} >
                                <MenuItem value={"Not"}>Ничего</MenuItem>
                                <MenuItem value={"FullDay"}>Полный день</MenuItem>
                                <MenuItem value={"SmartSchedule"}>Гибкий график</MenuItem>
                                <MenuItem value={"DistanceWork"}>Удалённая работа</MenuItem>
                            </Select>
                    </FormControl>


                    
                </div>
                <div className="containerForCountry VisEmployment">
                <img src={job} className="imageCountry"/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Работа</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter.modeEmployment}
                                label="Age"
                                onChange={(event)=> dispatch(setEmployment(event.target.value))} >
                                <MenuItem value={"Not"}>Ничего</MenuItem>
                                <MenuItem value={"FullEmployment"}>Полная занятость</MenuItem>
                                <MenuItem value={"Part-timeEmployment"}>Частичная занятость</MenuItem>
                                <MenuItem value={"ProjectWork"}>Проектная работа</MenuItem>
                                <MenuItem value={"Internship"}>Стажировка</MenuItem>
                            </Select>
                    </FormControl>


                    
                </div>
                <div className="containerForCountry VisBetween">
                <img src={star} className="imageCountry"/>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Стаж</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter.modeBetween}
                                    label="Age"
                                    onChange={(event)=> dispatch(setBetween(event.target.value))} >
                                    <MenuItem value={"Not"}>Ничего</MenuItem>
                                    <MenuItem value={"NotExperience"}>Нет опыта</MenuItem>
                                    <MenuItem value={"BetweenOneToThree"}>от 1 года до 3 лет</MenuItem>
                                    <MenuItem value={"BetweenThreeToSix"}>от 3 до 6 лет</MenuItem>
                                    <MenuItem value={"OverSix"}>Более 6 лет</MenuItem>
                                </Select>
                        </FormControl>

                    
                </div>
                <div className="containerForCountry VisIncome">
                    <img src={cost} className="imageCountry"/>
                    <TextField id="outlined-basic" label="Доход" variant="outlined" onChange={(event) => dispatch(setIncome(event.target.value))}/>
                </div>
                <div className="containerForCountry Vis" onClick={e=> setIsVisible( isVisible ? false : true )}>
                    <p>Фильтры</p>
                </div>
                 {/* onClick={(event) =>{ dispatch(setCountry(tempSrtingValue))}} */}
                <div className="ButtonSearch" >
                    <p className="textSearch">поиск</p>    
                </div>              
            </div>
            <div className="containerFilter" style={{ display: isVisible ? 'flex' : 'none' }}>
                <div className="wrapperFilter">
                    <div>
                    <div className="Income">
                    <p>Доход</p>
                    <TextField id="outlined-basic" label="Доход" variant="outlined" onChange={(event) => dispatch(setIncome(event.target.value))}/>
                </div>
                <div className="Schedule">
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">График</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={filter.modeSchedule}
                                onChange={(event) => dispatch(setSchedule(event.target.value))}
                            >
                            <FormControlLabel value="Not" control={<Radio />} label="Ничего" />
                            <FormControlLabel value="FullDay" control={<Radio />} label="Полный день" />
                            <FormControlLabel value="SmartSchedule" control={<Radio />} label="Гибкий график" />
                            <FormControlLabel value="DistanceWork" control={<Radio />} label="Удалённая работа" />
                        </RadioGroup>
                    </FormControl>
                    

                </div>
                <div className="Employment">
                    <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Занятость</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={filter.modeEmployment}
                                    onChange={(event) => dispatch(setEmployment(event.target.value))}
                                >
                                <FormControlLabel value="Not" control={<Radio />} label="Ничего" />
                                <FormControlLabel value="FullEmployment" control={<Radio />} label="Полная занятость" />
                                <FormControlLabel value="Part-timeEmployment" control={<Radio />} label="Частичная занятость" />
                                <FormControlLabel value="ProjectWork" control={<Radio />} label="Проектная работа" />
                                <FormControlLabel value="DistanceWork" control={<Radio />} label="Стажировка" />
                            </RadioGroup>
                        </FormControl>
                    
                </div>
                <div className="Between">

                    <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Опыт работы</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={filter.modeBetween}
                                        onChange={(event) => dispatch(setBetween(event.target.value))}
                                    >
                                    <FormControlLabel value="Not" control={<Radio />} label="Ничего" />
                                    <FormControlLabel value="NotExperience" control={<Radio />} label="Нет опыта" />
                                    <FormControlLabel value="BetweenOneToThree" control={<Radio />} label="От 1 года до 3 лет" />
                                    <FormControlLabel value="BetweenThreeToSix" control={<Radio />} label="От 3 до 6 лет" />
                                    <FormControlLabel value="OverSix" control={<Radio />} label="Более 6 лет" />
                                </RadioGroup>
                    </FormControl>
                    
                </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SearchBar