import React, { useState } from 'react';
import './App.css';
import Header from "./Header";

function App() {
  const getItems=()=>{

    let list = localStorage.getItem('lists');
  
    if (list) {
     return  JSON.parse(localStorage.getItem('lists'));
    }else{
      return [];
    }
  };
    
    const [items,setItems]= useState(getItems());
    const [newTask,setNewTask] = useState('');
    
    React.useEffect(()=> {
      localStorage.setItem('lists', JSON.stringify(items));
    });
    
    const handleNewTask = (e) =>{
      setNewTask(e.currentTarget.value);
    };
    const handleAdd = (e) => {
       e.preventDefault();
       if (newTask.trim()!== "") {
         addTask(newTask);
         setNewTask('');
        // localStorage.setItem('items', JSON.stringify(items))
       }else{
         alert("Please Fill The Task");
       }
    };
    
    const addTask = (newTask) =>{
      let copy = items;
      copy.push({"id":items.length, "task": newTask , "checked":false},);
      setItems(copy);
      console.log(items);
    };
    
    const clearAll = () =>{
      setItems([]);
    };
    
    const handleCross= (ind) =>{
      console.log(ind);
      const myarr = items.filter((elem)=> {
        return elem.id !== ind;
      });
      setItems(myarr);
    };
  
     const handleToggle = (id) => {
       let mapped= items.map((item) => {
         return item.id === id ? {...item, "checked": !item.checked } : {...item}
       });
       setItems(mapped);
     };
     
    return (
      <div className="App">
      <div className="container">
       <Header />
        <form className="form" onSubmit={handleAdd}>
      <input
            className="validate"
            value={newTask}
            id="add_new"
            type="text" 
            placeholder="Add Task.."
            onChange={handleNewTask}
            autoComplete= "off"/>
   {  /* <button className="add">+</button>*/}
   <button id="add" type="submit" className="btn">+</button>
      </form>
       <div className="main">
       {items.map((item)=>{
          return (
    <div className="todo">
       
        <input
            id="check" 
            className="form"
            type="checkbox" 
            checked={item.checked}
            onChange={()=> handleToggle(item.id)}
        /> <h3 className={item.checked ? 'strike'  : ''}>{item.task}</h3>
        <button onClick={()=>handleCross(item.id)} className="remove">×</button>
        
    </div>)
       }
       )}
       <button className="clearAll" onClick={clearAll}>Clear All Tasks</button> <br/>
      <div className="footer">
      <span className=""footerText>Made by Ankit Agrawal with ❤️</span></div>
      </div>
      </div>
      </div>
    );
}

export default App;
