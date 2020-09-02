import React, { Component } from "react";
import uuid from "uuid";

class CreateTodo extends Component {
  state = {
    priority: "",
    responsibility: "",
    deadline: 0,
    description: "",
    index: ""
  };

  priorityChecker() {
    return this.state.priority;
  }

  onChangePri = e => {
    this.setState({
      priority: e.target.value,
      index: uuid.v4()
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    var users;

    if (JSON.parse(localStorage.getItem("Todos") == null)) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("Todos"));
    }

    users.push(this.state);

    localStorage.setItem("Todos", JSON.stringify(users));

    this.setState({
      priority: "",
      responsibility: "",
      deadline: 0,
      description: ""
    });
  };

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="form-control"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Responsible:</label>
          <input
            type="text"
            placeholder="Responsible"
            className="form-control"
            name="responsibility"
            value={this.state.responsibility}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="number"
            min="1"
            name="deadline"
            placeholder="Deadline"
            className="form-control"
            value={this.state.deadline}
            onChange={this.handleChange}
          />
        </div>
        <label>Priority:</label>
        <div className="form-group">
          <input
            type="radio"
            value="Low"
            checked={this.priorityChecker() === "Low"}
            onChange={this.onChangePri}
          />
          <label> Low </label>
          <br />
          <input
            type="radio"
            value="Medium"
            checked={this.priorityChecker() === "Medium"}
            onChange={this.onChangePri}
          />
          <label> Medium </label>
          <br />
          <input
            type="radio"
            value="High"
            checked={this.priorityChecker() === "High"}
            onChange={this.onChangePri}
          />
          <label> High </label>
        </div>
        <button className="btn btn-primary" onClick={this.onSubmit}>
          Add
        </button>
      </div>
    );
  }
}

export default CreateTodo;
