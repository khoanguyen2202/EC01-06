import React from "react";
import "./User.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:5000/customers");
    const userList = await res.json();
    this.setState({ customers: userList });
  }

  renderTable() {
    const table = [];
    for (let user of this.state.customers) {
      table.push(
        <tr className="activate">
          <td>{user.firstName}</td>
          <td>01/07/2022</td>
          <td>Hoạt động</td>
          <td>Deactivate</td>
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
          <label htmlFor="filter_label">Hiển thị theo:</label>
          <select name="filter_droplist" id="filter_droplist">
            <option value="ascending_name">Thứ tự tên (tăng dần)</option>
            <option value="descending_name">Thứ tự tên (giảm dần)</option>
            <option value="ascending_date">Ngày gia nhập (tăng dần)</option>
            <option value="descending_date">Ngày gia nhập (giảm dần)</option>
            <option value="status">Trạng thái</option>
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
          />
        </div>
        <table className="user_detail">
          <thead>
            <tr>
              <th>Username</th>
              <th>Ngày gia nhập</th>
              <th>Trạng thái</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default User;
