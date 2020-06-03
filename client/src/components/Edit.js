import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const api_url = config.PROTOCOL + "://" + config.HOST_NAME + ":" + config.PORT;

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: {}
    };
  }

  componentDidMount() {
    axios
      .get(api_url + "/api/expenses/edit/" + this.props.match.params.id)
      .then(res => {
        this.setState({ expenses: res.data });
        console.log(this.state.expenses);
      });
  }

  onChange = e => {
    const state = this.state.expenses;
    state[e.target.name] = e.target.value;
    this.setState({ expenses: state });
  };

  onSubmit = e => {
    console.log(this.state.expenses, "this.state.expenses;=====");
    e.preventDefault();

    const { title, description, amount, type } = this.state.expenses;

    axios
      .put(api_url + "/api/expenses/" + this.props.match.params.id, {
        title,
        description,
        amount,
        type
      })
      .then(result => {
        this.props.history.push("/");
        // this.props.history.push("/show/" + this.props.match.params.id);
      });
  };

  render() {
    let heading;
    if (this.state.expenses.type === "income") {
      heading = <h3 className="panel-title">Edit Income</h3>;
    } else {
      heading = <h3 className="panel-title">Edit Spending</h3>;
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
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.expenses.title}
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
                  value={this.state.expenses.description}
                />
              </div>

              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={this.state.expenses.amount}
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

export default Edit;
