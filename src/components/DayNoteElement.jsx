import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import CheckDayContext from '../context/checkDayContext';

export default function DayNoteElement({data,dataID}) {
    const {setCheckDayID,setCheckDay,calendarNotes,setCalendarNotes} = useContext(CheckDayContext);

    const elementInCalendarNoteArr = calendarNotes.find(e=>e.id===dataID.id);
    
    const deleteElement = ()=>{
        let newCalendar;
        let elementToChangeColor;

        if(elementInCalendarNoteArr.notes.length<2){
            newCalendar = calendarNotes.filter(note=>note.id!==dataID.id);
            console.log(calendarNotes.filter(note=>note.id!==dataID.id));
        }else{
            newCalendar = calendarNotes.map(note=>
                note.id!==dataID.id            
                ?note            
                :{...note,
                    notes:note.notes.filter(e=>e.id!==data.id),                     
                }                
            );

            elementToChangeColor = newCalendar.find(e=>e.id===dataID.id);            
            if(elementToChangeColor.notes.length<2){
                elementToChangeColor = {...elementToChangeColor,color:elementToChangeColor.notes[0].color}
                newCalendar = newCalendar.map(e=>e.id===dataID.id ?elementToChangeColor :e);                
            }                    
        }
                
        setCalendarNotes(newCalendar);
    };

    const editElement = ()=>{
        deleteElement();
        setCheckDayID(dataID.id);
        setCheckDay("writingNote");
    };

    return (
        <>
            <li className={data.color}>
                <p>{data.title}</p>
                <p>{data.desc}</p>
                <section className="buttons">
                    <FontAwesomeIcon icon={faTrashCan} onClick={()=>deleteElement()} />
                    <FontAwesomeIcon icon={faEdit} onClick={()=>editElement()} />                    
                </section>
            </li>
        </>
    )
}
