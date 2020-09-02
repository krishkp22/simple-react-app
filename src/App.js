import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ListTodo from "./components/listTodo";
import CreateTodo from "./components/createTodo";

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav class="navbar navbar-expand-sm bg-light">
          <a class="navbar-brand" href="/">
            TODO
          </a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="/" class="nav-link">
                <code>/Create</code>
              </a>
            </li>
            <li class="nav-item">
              <a href="/view" class="nav-link">
                <code>/View</code>
              </a>
            </li>
          </ul>
        </nav>
        <BrowserRouter>
          <Route exact path="/" component={CreateTodo} />
          <Route path="/view" component={ListTodo} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
