import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { useState } from 'react';
import dateFnsFormat from "date-fns/format";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import { div } from 'prelude-ls';


function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}
const FORMAT="dd/MM/yyyy";

const AddTask=({onCancel,onAddTask})=>{
    const [task, setTask] = useState("");
    const [date, setDate]=useState(null);
    return(
        <div className="add-task-dialog">
                <input value={task} onChange={(event)=>setTask(event.target.value)} />
                <div className="add-task-action-container">
                    <div className="btns-container">
                        <button
                        disabled={!task} 
                        className="add-btn" onClick={()=>{
                            onAddTask(task,date);
                            onCancel();
                            setTask("");
                            
                            }}>Add Task </button>
                        <button className="cancel-btn" onClick={()=>{
                        onCancel();
                        setTask("");
                        }
                        }>Cancel</button>
                    </div>
                    <div className="icon-container">
                        <DayPickerInput onDayChange={(day)=>setDate(day)} placeholder={`${dateFnsFormat(new Date(),FORMAT)}`} 
                         formatDate={formatDate}
                         format={FORMAT}
                         dayPickerProps={{
                             modifiers:{
                                 disabled:[{before: new Date()}],
                             }
                         }}

                        />
                    </div>
                </div>
                
            </div>

    );
}

const TASKS_HEADER_MAPPING={
    INBOX :"Inbox",
    TODAY :"Today",
    NEXT_7:"Next 7 days"

}

const TaskItem =({selectTab,tasks})=>{
    let taskTorender=[...tasks];
   if(selectTab==='NEXT_7'){
    taskTorender=taskTorender.filter(
           (task)=> 
        isAfter(task.date,new Date()) &&
        isBefore(task.date,addDays(new Date(),7))
        );
       
   }
  if(selectTab==='TODAY'){
    taskTorender=taskTorender.filter((task)=>isToday(task.date));
        
  }

  return(
      <div className="task-item-container">
      {taskTorender.map((task) => (
          <div className="task-item">
              <p>{task.text}</p>
              <p>{dateFnsFormat(new Date(task.date),FORMAT)}{" "}</p>
          </div>
        ))}
        </div>
  );

};
const Tasks=({selectTab})=> {
    const [showAddTask, setshowAddTask] = useState(false);
    const [tasks,setTasks]=useState([]);

    const addNewTask=(text,date)=>{
        const newTaskItem={text,date:date || new Date()};
        setTasks((prevState)=>[...prevState,newTaskItem])

    }
    return (
        <div className="tasks">
            <h1>{TASKS_HEADER_MAPPING[selectTab]}</h1>
            {selectTab==="INBOX"? <div className="add-task-btn"
            onClick={()=>setshowAddTask((prevState)=>!prevState)}>
              <span className="plus">+</span>
              <span className="add-task-text">Add Task</span>
            </div>:null}
            {showAddTask && ( <AddTask 
            onAddTask={addNewTask}
             onCancel={()=>setshowAddTask(false)} 
             /> 
             )}
             {tasks.length> 0 ?(
             <TaskItem tasks={tasks} selectTab={selectTab}/>)
             :(
             <p>No Task Yet</p>
             )}
            
        </div>
    )
}

export default Tasks
