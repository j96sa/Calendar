import "../styles/styles.scss"
import React, { useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight,faChevronLeft, faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import {getYear,getMonth,lastDayOfMonth,format,eachDayOfInterval, nextSaturday, previousSunday} from "date-fns"
import DayElement from "./DayElement"
import ChangeYear from "./ChangeYear"
import DayNote from "./DayNote"
import DayNoteWrite from "./DayNoteWrite"
import { useContext } from "react"
import CheckDayContext from "../context/checkDayContext"
const ls = localStorage;
//per inserire il array di notes nell LocalStorage
!ls.getItem("calendarNotes") && ls.setItem("calendarNotes","[]");

export default function MainPage() {
  const CURRENT_DAY = new Date();

  /* STATES PARA CONTROLAR LAS FECHAS */
  const [currentMonth, setCurrentMonth] = useState(getMonth(CURRENT_DAY));
  const [currentYear, setCurrentYear] = useState(getYear(CURRENT_DAY));
  const [lastDayOfCurrentMonth, setlastDayOfCurrentMonth] = useState(lastDayOfMonth(new Date(currentYear,currentMonth)));
  const [startDate, setStartDate] = useState(new Date(currentYear,currentMonth));
  const [prevSunday, setPrevSunday] = useState(previousSunday(new Date(startDate)));
  const [lastSaturday, setLastSaturday] = useState(nextSaturday(new Date(lastDayOfCurrentMonth)));
  const [daysInterval, setDaysInterval ] = useState(eachDayOfInterval({start:prevSunday,end:lastSaturday}));
  /* STATE PER CARICARE IL ULTIMO MODO STABILITO(DARK & LIGHT) */
  const [modeStorage, setModeStorage] = useState(ls.getItem("mode") ?ls.getItem("mode") :"light");  
  /* STATE PER MODIFICARE IL ANNO EL IL MESE DIRETTAMENTE MEDIANTE IL HEADER */
  const [changeYear, setChangeYear] = useState(false);

  
  /* *-**************************************** */
  const {checkDay,setCheckDay,calendarNotes} = useContext(CheckDayContext)
  /* ***************************************** */

  /* EFFECTS PER CONTROLLARE GLI STATES CHE MANIPULANO IL MONTHVIEW */
  useEffect(() => {  
    setStartDate(new Date(currentYear,currentMonth));
    setlastDayOfCurrentMonth(lastDayOfMonth(new Date(currentYear,currentMonth)));
  }, [currentMonth,currentYear]);
  
  useEffect(() => {
    setPrevSunday(previousSunday(new Date(startDate)));
    setLastSaturday(nextSaturday(new Date(lastDayOfCurrentMonth)));
  }, [lastDayOfCurrentMonth]);

  useEffect(() => {
    setDaysInterval(eachDayOfInterval({start:prevSunday,end:lastSaturday}));
  }, [lastSaturday]);

  /* FUNZIONI PER CAMBIARE FRA MESE SUCESIVO E MESE SCORSO */
  const nextMonth = ()=>{
    setCheckDay(false);
    if(currentMonth >= 11){
      setCurrentMonth(0);
      setCurrentYear(currentYear+1)
    }else{
      setCurrentMonth(currentMonth+1);
    };
  };

  const prevMonth = ()=>{
    setCheckDay(false);
    if(currentMonth <= 0){
      setCurrentMonth(11);
      setCurrentYear(currentYear-1);
    }else{
      setCurrentMonth(currentMonth-1);
    };
  };



  /* FUNZIONI PER CAMBIARE FRA LIGHT & DARK MODE */
  const actLightMode = ()=>setModeStorage("light");
  const actDarkMode = ()=>setModeStorage("dark");
  //effect per inserire il modo stabilito nell LocalStorage
  useEffect(() => {
    ls.setItem("mode",modeStorage);
  }, [modeStorage])
  




  /* FUNCTION PER CAMBIARE IL ANNO E IL MESE INSIEME */
  const changeYearFunc = (e)=>{
    setCheckDay(false);
    setChangeYear(e);
  };





  /* ************************************************************************ */  
  /* ************************************************************************ */
  
  /* ************************************************************************ */
  /* ************************************************************************ */


  return (
    <>    
    <div className={modeStorage==="light" ?"main_page light" :"main_page dark"}>               
      <ChangeYear
      month={currentMonth} 
      year={currentYear} 
      changeYear={changeYear}
      changeYearFunc={changeYearFunc}
      setCurrentMonth={setCurrentMonth}
      setCurrentYear={setCurrentYear}/>

      <section className="calendar">
        <div className="change-mode">
          {modeStorage==="dark" && <FontAwesomeIcon icon={faSun} onClick={()=>actLightMode()}/>}
          {modeStorage==="light" && <FontAwesomeIcon icon={faMoon} onClick={()=>actDarkMode()}/>}
        </div>

        <article className="header">                
          <FontAwesomeIcon icon={faChevronLeft} onClick={()=>prevMonth()} />
          <h2 onClick={()=>changeYearFunc(true)} >{format(startDate,"MMMM y")}</h2>          
          <FontAwesomeIcon icon={faChevronRight} onClick={()=>nextMonth()} />
        </article>

        <section className="month_view">
          <article className="month_days">
            <li className="week_days sunday">Sun</li>
            <li className="week_days">Mon</li>
            <li className="week_days">Tus</li>
            <li className="week_days">Wen</li>
            <li className="week_days">Thu</li>
            <li className="week_days">Fri</li>
            <li className="week_days">Sat</li>            
            {daysInterval.map(day=><DayElement key={day} day={day} month={currentMonth}/>)}
          </article>
        </section>

        {checkDay==="addNote" && <DayNote/>}
        {checkDay==="writingNote" && <DayNoteWrite/> } 
      </section>
    </div>
    </>
  )
}
