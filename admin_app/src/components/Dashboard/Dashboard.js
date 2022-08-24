import React from "react";
import "./Dashboard.css";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="monitor blue-bg">
            <h5>Lượng người dùng hiện tại</h5>
            <h1>650.000</h1>
          </div>
          <div className="monitor pink-bg">
            <h5>Lượng người dùng mới</h5>
            <h1>100.000</h1>
          </div>
        </div>
        <div className="row">
          <div className="monitor orange-bg">
            <h5>Tổng đơn hàng</h5>
            <h1>100.000</h1>
          </div>
          <div className="monitor green-bg">
            <h5>Tổng doanh thu</h5> 
            <h1>$100.000</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
