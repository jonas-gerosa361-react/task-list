import {React} from 'react';
import { FaPlus } from 'react-icons/fa';

import "./Form.css";

function Form({handleSubmit, handleInputChange, newTask}) {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input onChange={handleInputChange} value={newTask} type="text" />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

export default Form;
