import React from "react";
import "./Dashboard.css";
import axios from "axios";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      newusers: 0,
    };
  }

  async componentDidMount() {
    var get_link = "http://localhost:5000/customers?sort=";
    await axios.get(get_link)
      .then(res => {
        let count = 0;
        for (let user of res["data"]["customers"]) {
          const day = new Date(user.createdAt);
          const today = new Date();
          var diff = today - day;
          var diff_days = Math.floor(diff / (1000 * 3600 * 24));
          if (diff_days >= 30){
            count++;
          };
        }
        this.setState({ users: res["data"]["result"], newusers: count });
      })
      .catch(e => console.log(e));
    // const userList = await res.json();
    // this.setState({ customers: userList });
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="monitor blue-bg">
            <h5>Lượng người dùng hiện tại</h5>
            <h1>{this.state.users}</h1>
          </div>
          <div className="monitor pink-bg">
            <h5>Lượng người dùng mới</h5>
            <h1>{this.state.newusers}</h1>
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
