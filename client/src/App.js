import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlusCircle,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import config from "./config/config";
const api_url = config.PROTOCOL + "://" + config.HOST_NAME + ":" + config.PORT;

class App extends Component {
  constructor(props) {
    super(props);
    this.getReport();
    this.state = {
      expenses: [],
      reports: [],
      type: ""
    };
  }
  componentDidMount() {
    fetch(api_url + "/api/expenses", { method: "GET" })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            expenses: result && result.data ? result.data : []
          });
        },

        error => {
          console.log(error);
        }
      );
  }
  addClick(type) {
    localStorage.setItem("expenseType", type);
  }
  getReport() {
    fetch(api_url + "/api/expenses/report", { method: "GET" })
      .then(res => res.json())
      .then(
        response => {
          this.setState({
            reports: response && response.data ? response.data : []
          });
        },
        error => {
          console.log(error);
        }
      );
  }
  handleDeleteClick(id) {
    fetch(api_url + "/api/expenses/" + id, { method: "DELETE" })
      .then(res => res.json())
      .then(
        result => {
          window.location.reload();
          this.props.history.push("/");
        },

        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Expenses</h3>
          </div>

          <div className="panel-body">
            <h3>
              Total Amount: &#8377;
              {(this.state.reports && this.state.reports.income
                ? this.state.reports.income
                : 0) -
                (this.state.reports && this.state.reports.spend
                  ? this.state.reports.spend
                  : 0)}
            </h3>
            <span>
              <h4 className="col-md-3" style={{ color: "green" }}>
                Income Amount: &#8377;
                {this.state.reports && this.state.reports.income
                  ? this.state.reports.income
                  : 0}
              </h4>
              <h4 className="col-md-3" style={{ color: "red" }}>
                Spending Amount: &#8377;
                {this.state.reports && this.state.reports.spend
                  ? this.state.reports.spend
                  : 0}
              </h4>
            </span>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.expenses.map(expense => (
                  <tr>
                    <td>{expense.title}</td>
                    <td>{expense.description}</td>
                    <td
                      style={{
                        color: expense.type === "income" ? "green" : "red"
                      }}
                    >
                      &#8377;{expense.amount ? expense.amount : 0}
                    </td>
                    <td>{moment(expense.createdAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <Link to={`/edit/${expense._id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      &nbsp;
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.handleDeleteClick(expense._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>
              <Link to="/create">
                <button
                  className="btn btn-success"
                  onClick={() => this.addClick("income")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Add Income
                </button>
              </Link>
              <Link to="/create" style={{ margin: "10px" }}>
                <button
                  className="btn btn-danger"
                  onClick={() => this.addClick("spend")}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Add Spending
                </button>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
