import React from "react";
import "./User.css";
import axios from 'axios'
import { tab } from "@testing-library/user-event/dist/tab";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      filter: "state",
      search: "",
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  async componentDidMount() {
    var get_link = "http://localhost:5000/customers?sort=" + this.state.filter;
    await axios.get(get_link)
      .then(res => {
        this.setState({ customers: res["data"]["customers"] });
      })
      .catch(e => console.log(e));
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter || prevState.search !== this.state.search){
      var get_link = "http://localhost:5000/customers?sort=" + this.state.filter + "&phonenumber[regex]=" + this.state.search;
      await axios.get(get_link)
      .then(res => {
        this.setState({ customers: res["data"]["customers"] });
      })
      .catch(e => console.log(e));
    }
  }

  handleChange = (e) => {
    // console.log(event.target.value);
    this.setState({ filter: e.target.value });
  };

  handleChangeSearch = (e) => {
    this.setState({search: e.target.value});
  }

  renderTable() {
    const table = [];
    for (let user of this.state.customers) {
      user.createdAt = new Date(user.createdAt);
      user.createdAt = user.createdAt.toDateString();
      table.push(
        <tr className={user.state}>
          <td>{user.phonenumber}</td>
          <td>{user.createdAt}</td>
          <td>{user.state.toUpperCase()}</td>
          <td>Edit</td>
        </tr>
      );
    }
    return table;
  }

  render() {
    return (
      <div className="user_management">
        <h1>Quản lý User</h1>
        <div className="filter_box">
          <label htmlFor="filter_label">Sắp xếp theo:</label>
          <select name="filter_droplist" id="filter_droplist" defaultValue="state" onChange={this.handleChange}>
            <option value="phonenumber">Thứ tự tên (tăng dần)</option>
            <option value="-phonenumber">Thứ tự tên (giảm dần)</option>
            <option value="createdAt">Ngày gia nhập (tăng dần)</option>
            <option value="-createdAt">Ngày gia nhập (giảm dần)</option>
            <option value="state">Trạng thái</option>
          </select>
        </div>
        <div className="search_box">
          <span className="search_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
            </svg>
          </span>
          <input
            className="search_input"
            type="text"
            placeholder="Tìm người dùng"
            onChange={this.handleChangeSearch}
          />
        </div>
        <table className="user_detail" style={{width:"100%"}}>
          <thead>
            <tr>
              <th style={{width:"30%"}}>Số điện thoại</th>
              <th style={{width:"30%"}}>Ngày gia nhập</th>
              <th style={{width:"30%"}}>Trạng thái</th>
              <th style={{width:"10%"}}>Edit</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default User;
