import React, { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: "todo1",
      completed: false
    },
    {
      id: 2,
      description: "todo2",
      completed: false
    },
  ]);

  const handleDelete = (index) => {
    const newTodos = todos.filter((item,ind) => ind !== index);

    // const newTodos = todos.filter((item)=>{
    //     if(item.id!==id){
    //         return item;
    //     }
    //     return null;
    // })
    // console.log(newTodos)
    setTodos(newTodos);
  };

  const handleCheck = (index) => {
    const newTodos = todos.map((item,ind)=>{

        if(ind!==index){
            return item;
        }else{
            return {...item,completed:!item.completed}
        }
    });
    setTodos(newTodos)

  }

  const [newTodo,setNewTodo] = useState("")
  const addTodo = () => {
      const addThisTodo = {
          id: todos.length+1,
          description: newTodo,
          completed: false
      }
    setNewTodo("")
    setTodos([...todos,addThisTodo])
    }

    const editSave = () =>{
        setTodos(todos.map((item,ind) => {
            if(ind===editingTodo.index)
            {
               item.description = newTodo;
            }
            return item;
        }))
        setNewTodo("")
        setEditingTodo("")
    }

    const [editingTodo,setEditingTodo] = useState(false)

    const handleEdit = (index) => {
        setEditingTodo({...todos[index],index:index})
        setNewTodo(todos[index].description)
    }

  return (
    <div>
    <input type="text" value={newTodo} onChange={(e)=>{
        setNewTodo(e.target.value)
        }}/>
    <button onClick={editingTodo ? editSave : addTodo}>{editingTodo ? "Edit" : "Submit"}</button>
      {todos.length ? (
        todos.map((item,index) => {
          return (
            <div key={index}>
              <p>
                {index+1}. &nbsp;
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "",
                  }}
                >
                  {item.description}
                </span>
                &nbsp;
                <i
                  className={item.completed ?  "fas fa-times" : "fas fa-check"}
                  onClick={() => handleCheck(index)}
                ></i>
                &nbsp;
                <i
                  className="fas fa-trash-alt"
                  onClick={() => handleDelete(index)}
                ></i>
                &nbsp;
                <i 
                    className="far fa-edit"
                    onClick={() => handleEdit(index)}></i>
              </p>
            </div>
          );
        })
      ) : (
        <h2>No Todos Yet</h2>
      )}
    </div>
  );
};

export default Todos;
