import React, { Component, useState } from 'react';
import Form from './Form';
import Tasks from './Tasks';

import './Main.css';

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

        <Form
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          newTask={newTask}
        />

        <Tasks tasks={tasks}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Main;
