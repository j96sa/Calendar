import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { format } from 'date-fns';
import React, { useEffect } from 'react'
import { useState } from 'react';

export default function ChangeYear({month,year,changeYearFunc,setCurrentMonth,setCurrentYear,changeYear}) {    
    const [DATE, setDATE] = useState(new Date(year,month));
    const [monthToWork, setMonthToWork] = useState(month);
    const [yearToWork, setYearToWork] = useState(year);
    
    const nextMonth = ()=>{
        if(monthToWork >= 11){
            setMonthToWork(0);            
            setYearToWork(yearToWork+1);
        }else{
            setMonthToWork(monthToWork+1);
        };
    };
    const prevMonth = ()=>{
        if(monthToWork <= 0){
            setMonthToWork(11);
            setYearToWork(yearToWork-1)
        }else{
            setMonthToWork(monthToWork-1);
        };
    };


    const nextYear = ()=>{
        setYearToWork(yearToWork+1);        
    };
    const prevYear = ()=>{
        setYearToWork(yearToWork-1);
    };

    useEffect(() => {
      setDATE(new Date(yearToWork,monthToWork));
    }, [monthToWork,yearToWork])
        

    return (
        <>
            <section className={changeYear ?"change_year active" :"change_year"}>
                <div className="content">
                    <article className="dates">
                        <div className='dates_element'>
                            <FontAwesomeIcon icon={faChevronUp} onClick={prevMonth} />
                            <p>{format(DATE,"MMMM")}</p>
                            <FontAwesomeIcon icon={faChevronDown} onClick={nextMonth} />
                        </div>

                        <div className='dates_element'>
                            <FontAwesomeIcon icon={faChevronUp} onClick={prevYear}/>
                            <p>{format(DATE,"y")}</p>
                            <FontAwesomeIcon icon={faChevronDown} onClick={nextYear} />
                        </div>                    
                    </article>
                    <section className="buttons">
                        <button onClick={()=>(setCurrentMonth(monthToWork),setCurrentYear(yearToWork),changeYearFunc(false))} className="btn">apply</button>
                        <button onClick={()=>changeYearFunc(false)}  className="btn">cancel</button>
                    </section>
                </div>                
            </section>            
        </>
    )
}
