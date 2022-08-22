import React from "react";
import "./Product.css";
import ConfirmPopup from ".././ConfirmPopup/ConfirmPopup";
import Form from ".././Form/Form";
import { Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      showConfirmPopup: false,
      showAddItemForm: false,
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:5000/products");
    const productList = await res.json();
    this.setState({ products: productList });
  }

  renderTable() {
    const table = [];
    for (let product of this.state.products) {
      table.push(
        <tr className="temp_stop">
          <td>Ảnh</td>
          <td>{product.type}</td>
          <td>01/07/2022</td>
          <td>Ngừng kinh doanh</td>
          <td>Edit</td>
        </tr>
      );
    }
    return table;
  }

  render() {
    return (
      <div className="product_management">
        {/* <Form></Form> */}
        <h1>Quản lý sản phẩm</h1>
        <div className="product_handling">
          <div className="filter_box">
            <label htmlFor="filter_label">Hiển thị theo:</label>
            <select name="filter_droplist" id="filter_droplist">
              <option value="ascending_name">Thứ tự tên (tăng dần)</option>
              <option value="descending_name">Thứ tự tên (giảm dần)</option>
              <option value="ascending_date">Ngày thêm (tăng dần)</option>
              <option value="descending_date">Ngày thêm (giảm dần)</option>
              <option value="status">Trạng thái</option>
            </select>
          </div>
          <button className="add_button">
            <span className="add_icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
              </svg>
            </span>
            <span>Thêm sản phẩm</span>
          </button>
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
              <th>Ảnh sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Ngày thêm</th>
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

export default Product;
