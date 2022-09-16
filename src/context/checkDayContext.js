import {createContext, useEffect, useState} from "react";

const ls = localStorage;

const CheckDayContext = createContext();
const CheckDayProvider =({children})=>{
    const [checkDay, setCheckDay] = useState(false);
    const [checkDayID, setCheckDayID] = useState(undefined);
    const [calendarNotes, setCalendarNotes] = useState(JSON.parse(ls.getItem("calendarNotes")));

    useEffect(() => {
        ls.setItem("calendarNotes",JSON.stringify(calendarNotes));
    }, [calendarNotes]);
    
    const handler = {checkDay,setCheckDay,checkDayID,setCheckDayID,calendarNotes,setCalendarNotes};

    return(<CheckDayContext.Provider value={handler}>{children}</CheckDayContext.Provider>)
};

export {CheckDayProvider};
export default CheckDayContext;