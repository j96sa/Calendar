import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useContext, useState } from 'react'
import CheckDayContext from '../context/checkDayContext'

const ls = localStorage;
const initialForm = {id:undefined,title:"",desc:"",color:"green"};


export default function DayNoteWrite() {
  const {setCheckDay,setCheckDayID,checkDayID,calendarNotes,setCalendarNotes} = useContext(CheckDayContext);
  const [form, setForm] = useState(initialForm);
  //const [calendarNotes, setCalendarNotes] = useState(JSON.parse(ls.getItem("calendarNotes")));

  
  const handleForm = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };
  const colorSelect = (e)=>{
    setForm({...form,color:e.target.value})
  };

  
  const saveButton = ()=>{
    if(calendarNotes.some(e=>e.id===checkDayID)){
      const obj = {...form,id:Math.round(Date.now()*Math.random())};
      const newCalendarNotes = calendarNotes.map(e=>
        e.id!==checkDayID         
        ?e 
        :{...e,color:"orange",notes:[...e.notes,obj]}        
      );
      setCalendarNotes(newCalendarNotes);
    }else{
      const obj = {id:checkDayID,color:form.color,notes:[{...form,id:Math.round(Date.now()*Math.random())}]};
      setCalendarNotes([...calendarNotes,obj]);
    };
    setForm(initialForm);
    setCheckDay("addNote");
  };


  const cancelButton = ()=>{
    setCheckDay(false);
    setCheckDayID(undefined);
  };
    
  return (
    <>
      <section className="day_note write">                
        <form action="">
          <input onChange={handleForm} value={form.name} name="title"  type="text" placeholder='Title...?' />  
          <input onChange={handleForm} value={form.desc} name="desc"  type="text" placeholder='Description...?' />          
        </form>
        
        <select onChange={colorSelect} name="color" id="">
            <option value="green">green</option>
            <option value="red">red</option>
            <option value="black">black</option>            
            <option value="blue">blue</option>            
            <option value="violet">violet</option>
            <option value="grey">grey</option>
        </select>

        <article className='buttons'>
          <button className='btn write-note' onClick={saveButton} ><FontAwesomeIcon icon={faSave}/> save</button>
          <button className='btn write-note' onClick={cancelButton} ><FontAwesomeIcon icon={faCancel}/> cancel</button>
        </article>
      </section> 
    </>    
  )
}
