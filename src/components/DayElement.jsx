import { format, getMonth } from 'date-fns';
import React, { useContext, useState, useEffect } from 'react'
import CheckDayContext from '../context/checkDayContext';


export default function DayElement({day,month}) {
  const {setCheckDayID,setCheckDay,calendarNotes} = useContext(CheckDayContext);
  const elementFiltered = calendarNotes.filter(e=>e.id === format(day,"ddEMMyyyy"));
  const [savedElement, setSavedElement] = useState(elementFiltered.length>0 ?elementFiltered :false);
  
  //per renderizare il componente e che se effetueno i cambi
  useEffect(() => {
    setSavedElement(elementFiltered.length>0 ?elementFiltered :false);
  }, [calendarNotes]);
  

  const dayFormated = format(day,"dd");
  const dayOtherWayFormated = format(day,"dd,MM,yyyy");
  const todayDayFormated = format(new Date(),"dd,MM,yyyy");
  
  const handleClick = (day)=>{
    setCheckDay("addNote");
    setCheckDayID(format(day,"ddEMMyyyy"));
  };

  return (
    <>
      {
        savedElement

        ?(
          <li 
            id={dayOtherWayFormated===todayDayFormated ?"active-day" :null} 
            className={getMonth(day)!==month ?"month_day false" :"month_day"}
            onClick={()=>handleClick(day)}
            style={{"border":`1px solid ${savedElement[0].color}`,"color":`${savedElement[0].color}`}}
          >
            {dayFormated}
          </li>
        )

        :(
          <li 
            id={dayOtherWayFormated===todayDayFormated ?"active-day" :null} 
            className={getMonth(day)!==month ?"month_day false" :"month_day"}
            onClick={()=>handleClick(day)}                        
          >
            {dayFormated}
          </li>
        )
      
      }

    </>
  )
}