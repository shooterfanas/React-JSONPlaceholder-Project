import React, { useRef } from "react";

const InputField = ({ todo, setTodo, handleAdd }) => {

  const inputRef = useRef(null);
  return (
    <form
      className="d-flex position-relative w-50 mx-auto my-3"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="form-control fs-4 p-2 flex-grow-1"
      />
      <button type="submit" 
      className="btn btn-primary position-absolute fs-5 border border-0 end-0 h-100">
        Add Task
      </button>
    </form>
  );
}

export default InputField