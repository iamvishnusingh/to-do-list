import React from 'react';
import {FaInbox,FaRegCalendarAlt,FaRegCalendar} from 'react-icons/fa';
// const Sidebar =()

function Sidebar({selectTab,setselectTab}) {
    console.log(selectTab);
    return (
        <div className="sidebar">
            <div className="active" onClick={()=>setselectTab("INBOX")}>
            <FaInbox className="icon" />
            Inbox</div>
            <div onClick={()=>setselectTab("TODAY")}>
            <FaRegCalendarAlt className="icon" />
            Today</div>
            <div onClick={()=>setselectTab("NEXT_7")}>
            <FaRegCalendar className="icon"  />
            Next 7 days</div>
        </div>
    )
}

export default Sidebar
