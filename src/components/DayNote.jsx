import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import CheckDayContext from '../context/checkDayContext';
import DayNoteElement from './DayNoteElement';

const ls = localStorage;

export default function DayNote() {
    const {setCheckDay,checkDayID,calendarNotes} = useContext(CheckDayContext);
    const [saved, setSaved] = useState(calendarNotes.filter(e=>e.id===checkDayID));

    useEffect(() => {
        setSaved(calendarNotes.filter(e=>e.id===checkDayID));
    }, [calendarNotes,checkDayID]);

    return (
        <>
            <section className="day_note add-edit">                
                {saved.length>0 

                    ?<>
                        <article className='notes'>
                            {saved[0].notes.map(note=><DayNoteElement data={note} dataID={saved[0]} key={Math.round(Date.now()*Math.random())}/>)}
                        </article>               
                        <button className='btn add-note' onClick={()=>setCheckDay("writingNote")}><FontAwesomeIcon icon={faPlus}/> add note</button>
                    </> 

                    :<button className='btn add-note' onClick={()=>setCheckDay("writingNote")}><FontAwesomeIcon icon={faPlus}/> new note</button>
                }
            </section> 
        </>
    )
} 