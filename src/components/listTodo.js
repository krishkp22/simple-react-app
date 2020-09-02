import React, { Component } from "react";
import format from "date-format";
class ListTodo extends Component {
  state = {
    todos: [],
    priority: "",
    responsibility: "",
    description: "",
    deadline: 0
  };

  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage["Todos"])
    });
  }

  deleteTodo = e => {
    let x = this.state.todos;
    x = x.filter(data => data.index !== e.target.id);
    localStorage.setItem("Todos", JSON.stringify(x));
    this.setState({
      todos: x
    });
  };

  priorityChecker() {
    return this.state.priority;
  }

  onChangeDesc = e => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeResp = e => {
    this.setState({
      responsibility: e.target.value
    });
  };

  onChangeDead = e => {
    this.setState({
      deadline: e.target.value
    });
  };

  onChangePri = e => {
    this.setState({
      priority: e.target.value
    });
  };

  filleditTodo = e => {
    this.state.todos.forEach(data => {
      if (data.index === e.target.id)
        this.setState({
          priority: data.priority,
          responsibility: data.responsibility,
          deadline: data.deadline,
          index: data.index,
          description: data.description
        });
    });
  };

  onSubmit = e => {
    console.log(this.state);
    e.preventDefault();
    var arr = [];
    this.state.todos.forEach(data => {
      console.log(data.index, this.state.index);
      if (data.index === this.state.index) {
        console.log(this.state.priority);
        arr.push({
          priority: this.state.priority,
          responsibility: this.state.responsibility,
          deadline: this.state.deadline,
          description: this.state.description,
          index: this.state.index
        });
      } else arr.push(data);
    });
    console.log(arr);
    this.setState({
      todos: arr
    });
    localStorage.setItem("Todos", JSON.stringify(arr));
  };

  render() {
    const listItems = this.state.todos.map(data => (
      <tr>
        <td>{data.description}</td>
        <td>{data.deadline}</td>
        <td>{data.responsibility}</td>
        <td>{data.priority}</td>
        <td>{format.asString("hh:mm:ss - dd:MM:yyyy", new Date())}</td>
        <td>
          <button
            type="button"
            class="btn btn-success btn-sm"
            id={data.index}
            onClick={this.filleditTodo}
            data-toggle="modal"
            data-target="#myModal"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            class="btn btn-danger btn-sm"
            onClick={this.deleteTodo}
            id={data.index}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <table class="table table-dark table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Description</th>
              <th>Deadline</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Time & Date</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>

        <div class="modal" id="myModal" style={{ opacity: 1 }}>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Mode</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDesc}
                  />
                </div>

                <div className="form-group">
                  <label>Responsible:</label>
                  <input
                    type="text"
                    placeholder="Responsible"
                    className="form-control"
                    value={this.state.responsibility}
                    onChange={this.onChangeResp}
                  />
                </div>

                <div className="form-group">
                  <label>Deadline:</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Deadline"
                    className="form-control"
                    value={this.state.deadline}
                    onChange={this.onChangeDead}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="radio"
                    value="Low"
                    onChange={this.onChangePri}
                    checked={this.priorityChecker() === "Low"}
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
                  <br />
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={this.onSubmit}
                    data-dismiss="modal"
                  >
                    Make Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ListTodo;
