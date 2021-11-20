import {React} from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './Tasks.css';

function Tasks({tasks, handleEdit, handleDelete}) {
  return (
    <ul className="tasks">
      {
        tasks.map((task, index) => (
          <li>
            {task}
            <span>
              <FaEdit
                onClick={(event) => handleEdit(event, index)}
                title="Edit task"
                className="edit"
              />
              <FaTrash onClick={(event) => handleDelete(event, index)}
                title="Delete task"
                className="delete"
              />
            </span>
          </li>
        ))
      }
    </ul>
  );
}

export default Tasks;
