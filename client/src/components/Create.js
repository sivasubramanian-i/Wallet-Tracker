import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
const api_url = config.PROTOCOL + "://" + config.HOST_NAME + ":" + config.PORT;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      amount: "",
      type: localStorage.getItem("expenseType")
        ? localStorage.getItem("expenseType")
        : null
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    let type = localStorage.getItem("expenseType");
    const { title, description, amount } = this.state;
    axios
      .post(api_url + "/api/expenses", {
        title,
        description,
        amount,
        type
      })
      .then(result => {
        this.props.history.push("/");
      });
  };

  render() {
    const { title, description, amount } = this.state;
    let heading;
    if (this.state.type === "income") {
      heading = <h3 className="panel-title">ADD Income</h3>;
    } else {
      heading = <h3 className="panel-title">ADD Spending</h3>;
    }
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">{heading}</div>
          <div className="panel-body">
            <h4>
              <Link to="/">
                <FontAwesomeIcon icon={faList} /> Expense List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  cols="50"
                  rows="3"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={this.onChange}
                  value={description}
                />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={amount}
                  onChange={this.onChange}
                  placeholder="Amount"
                />
              </div>

              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
