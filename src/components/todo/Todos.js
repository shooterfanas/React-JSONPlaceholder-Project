import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';

const Todos = ({index,todo,todos,setTodos,provided}) => {
  const [edit,setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.title);
  const [droppableId, setDroppableId] = useState(provided.droppableProps['data-rbd-droppable-id'] == "TodosRemove" ? true : false);

  const handleDone = (id) => {
    setTodos(
      todos.map((todo) => 
      todo.id === id ? {...todo,isDone: !todo.isDone} : todo)
    )
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e,id) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id ? {...todo, title: editTodo} : todo)))
  
    setEdit(false);
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided,snapshot) => (
          <form onSubmit={(e) => handleEdit(e,todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`rounded bg-warning p-3 mt-3 ${snapshot.isDragging ? "shadow-lg border border-success border-5" : ""}`}
          >
            <div className="row d-flex align-items-center">
              <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-8">
                {edit ? (
                <input type="text"
                  ref={inputRef}
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="p-1 fs-5 w-100"
                  />
                ) : todo.isDone || droppableId ? (
                  <s className="fs-5 text-break">{todo.title}</s>
                ) : (
                  <span className="fs-5 text-break">{todo.title}</span>
                )}
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-4 p-0 d-flex pt-sm-2 pt-md-0 justify-content-sm-center justify-content-end pe-3 pe-sm-0">
                <span className="fs-3 ms-1"
                  onClick={
                    () => {if (!edit && !todo.isDone) {
                    setEdit(!edit);
                    }}
                  }>
                    <i className="bi bi-pencil-square"></i>
                  </span>
                  <span className="fs-3 ms-1" onClick={() => handleDelete(todo.id)}>
                    <i className="bi bi-trash"></i>
                  </span>
                  <span className="fs-3 ms-1" onClick={() => handleDone(todo.id)}>
                    <i className="bi bi-check2-circle"></i>
                </span>
              </div>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default Todos