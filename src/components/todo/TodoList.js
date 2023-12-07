import React from 'react'
import Todos from './Todos'
import { Droppable } from 'react-beautiful-dnd'

const TodoList = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12 pb-3 pb-sm-0 col-sm-6">
          <Droppable droppableId='TodosList'>
            {(provided,snapshot) => 
            (

              <div 
                className={`p-3 rounded bg-primary ${snapshot.isDraggingOver ? "bg-opacity-75" : ""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-white text-center">
                  Active Tasks
                </h2>
                {todos?.map((todo,index) => (
                  <Todos
                    index={index}
                    todo={todo} 
                    todos={todos} 
                    key={todo.id} 
                    setTodos={setTodos}
                    provided={provided}/>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="col-12 pt-3 pt-sm-0 col-sm-6">
          <Droppable droppableId='TodosRemove'>
          {(provided,snapshot) => 
          (
              <div 
                className={`p-3 rounded bg-success ${
                  snapshot.isDraggingOver ? "bg-opacity-75" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
              <h2 className="text-white text-center">
                  Completed Tasks
                </h2>
              {completedTodos.map((todo,index) => (
                  <Todos 
                    index={index}
                    todo={todo} 
                    todos={completedTodos} 
                    key={todo.id}
                    setTodos={setCompletedTodos}
                    provided={provided}/>
                ))}
                {provided.placeholder}
              </div>
          )}
          </Droppable>
        </div>
      </div>
      
      
    </div>
  )
}

export default TodoList