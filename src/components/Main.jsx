import React, { Component, useState } from 'react';
import './Main.css';

// Form.
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) {
      return;
    }

    this.setState({
      tasks: tasks
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (prevState.tasks === tasks) {
      return;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;

    if (tasks.indexOf(newTask) !== -1 || newTask.length === 0) {
      return;
    }

    console.log(index);
    if (index == -1) {
      return this.setState({
        tasks: [...tasks, newTask],
        newTask: '',
      });
    }

    const newTasks = [...tasks];
    newTasks[index] = newTask;
    this.setState({
      tasks: newTasks,
      newTask: '',
      index: -1,
    })
  }

  handleInputChange = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  }

  handleEdit = (event, index) => {
    const { tasks } = this.state;
    this.setState({
      index: index,
      newTask: tasks[index],
    });
  }

  handleDelete = (event, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    this.setState({
      tasks: newTasks
    });
  }

  render() {
    const { newTask, tasks } = this.state;
    return (
      <div className="main">
        <h1>Task List</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <input onChange={this.handleInputChange} value={newTask} type="text" />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {
            tasks.map((task, index) => (
              <li key={task}>
                {task}
                <span>
                  <FaEdit onClick={(event) => this.handleEdit(event, index)} title="Edit task" className="edit"/>
                  <FaTrash onClick={(event) => this.handleDelete(event, index)} title="Delete task" className="delete" />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Main;
