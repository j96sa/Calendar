import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    lightFormat,
    format,
    getDaysInMonth,
    add,
    eachDayOfInterval,
    getMonth,
    addMonths,
    getYear,  
    lastDayOfMonth,    
} from "date-fns";

export default function BaseCom() {
    const currentDay = new Date(); 

    //next saturday--const result = nextSaturday(new Date(2020, 2, 22))
    //prev sunday--const result = previousSunday(new Date(2021, 5, 21))
    
    const [currentMonth, setCurrentMonth] = useState(getMonth(currentDay));
    const [currentYear, setcurrentYear] = useState(getYear(currentDay));
    const [lastDayOfCurrentMonth, setLastDayOfCurrentMonth] = useState(lastDayOfMonth(new Date(currentYear,currentMonth)));
    const [startDate, setStartDate] = useState(new Date(currentYear,currentMonth));
    const [daysInterval, setDaysInterval] = useState(eachDayOfInterval({start:startDate,end:lastDayOfCurrentMonth}));
    
    useEffect((e) => {        
        setStartDate(new Date(currentYear,currentMonth));
        setLastDayOfCurrentMonth(lastDayOfMonth(new Date(currentYear,currentMonth)));
    }, [currentMonth]);
    
    useEffect(() => {
        setDaysInterval(eachDayOfInterval({start:startDate,end:lastDayOfCurrentMonth}));
    }, [lastDayOfCurrentMonth]);
    

    /* CONSTANTES DE LAS PAGINAS NEXT */
    const nextMonth = ()=>{
        if(currentMonth >= 11){
            setCurrentMonth(0)
            setcurrentYear(currentYear+1)
        }else{
            setCurrentMonth(currentMonth+1)
        };
    };
    
    const prevMonth = ()=>{
        if(currentMonth <= 0){
            setCurrentMonth(11)
            setcurrentYear(currentYear-1)
        }else{
            setCurrentMonth(currentMonth-1)
        };
    };

    return (
        <>
        {console.log()}
        <h1>MAIN PAGE</h1>        
        <section>            
            <h2>Current Month: {currentMonth}</h2>
            <h2>Last Day of Current Month:{JSON.stringify(lastDayOfCurrentMonth)}</h2>
            <ul>                
                {daysInterval.map(day=><li key={day}>{JSON.stringify(format(day, "MM/dd/yyyy"))}</li>)}
            </ul>
        </section>
        <button onClick={()=>prevMonth()} >prev month</button>
        <button onClick={()=>nextMonth()} >next month</button>
        </>
    )
}
