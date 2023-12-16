import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const InputField = ({ todo, setTodo, handleAdd }) => {

  const inputRef = useRef(null);
  const {t}= useTranslation()
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-sm-10 col-md-8  ">
          <form
            className="d-flex position-relative mx-auto my-3"
            onSubmit={(e) => {
              handleAdd(e);
              inputRef.current?.blur();
            }}
          >
            <input
              type="text"
              placeholder={t("enterTask")}
              value={todo}
              ref={inputRef}
              onChange={(e) => setTodo(e.target.value)}
              className="form-control fs-4 p-2 flex-grow-1"
            />
            <button type="submit" 
            className="btn btn-primary position-absolute fs-5 border border-0 end-0 h-100">
              {t("addTask")}
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default InputField