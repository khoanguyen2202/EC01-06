import { Component, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import User from "./components/User/User";
import Product from "./components/Product/Product";
import Order from "./components/Order/Order";
import Sale from "./components/Sale/Sale";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main_container">
        <Header></Header>
        <Sidebar></Sidebar>
        <main id="main_component">
          <Dashboard></Dashboard>
          {/* <User></User> */}
          {/* <Product></Product> */}
          {/* <Order></Order> */}
          {/* <Sale></Sale> */}
        </main>
      </div>
    );
  }
}

export default App;
