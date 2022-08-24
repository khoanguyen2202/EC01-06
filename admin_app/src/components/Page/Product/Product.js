import React from "react";
import "./Product.css";
import ConfirmPopup from ".././ConfirmPopup/ConfirmPopup";
import Form from ".././Form/Form";
import axios from "axios";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      showConfirmPopup: false,
      showAddItemForm: false,
      filter: "-checked",
    };
  }

  async componentDidMount() {
    var get_link = "http://localhost:5000/products?sort=" + this.state.filter;
    await axios.get(get_link)
      .then(res => {
        this.setState({ products: res["data"]["products"] });
      })
      .catch(e => console.log(e));
    // const userList = await res.json();
    // this.setState({ customers: userList });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter){
      var get_link = "http://localhost:5000/products?sort=" + this.state.filter;
      await axios.get(get_link)
      .then(res => {
        this.setState({ products: res["data"]["products"] });
      })
      .catch(e => console.log(e));
    }
  }

  renderTable() {
    const table = [];
    for (let product of this.state.products) {
      var state = "";
      var state_dis = "";
      product.createdAt = new Date(product.createdAt);
      product.createdAt = product.createdAt.toDateString();
      if (product.checked === true) {
        state = "current_sale";
        state_dis = "Đang kinh doanh";
      }
      else{
        state = "sold_out";
        state_dis = "Hết hàng";
      }
      table.push(
        <tr className={state}>
          <td>Ảnh</td>
          <td>{product.productName}</td>
          <td>{product.createdAt}</td>
          <td>{state_dis}</td>
          <td>Edit</td>
        </tr>
      );
    }
    return table;
  }
  
  handleChange = (e) => {
    // console.log(event.target.value);
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <div className="product_management">
        {/* <Form></Form> */}
        <h1>Quản lý sản phẩm</h1>
        <div className="product_handling">
          <div className="filter_box">
            <label htmlFor="filter_label">Hiển thị theo:</label>
            <select name="filter_droplist" defaultValue="status" id="filter_droplist" onChange={this.handleChange}>
              <option value="productName">Thứ tự tên (tăng dần)</option>
              <option value="-productName">Thứ tự tên (giảm dần)</option>
              <option value="createdAt">Ngày thêm (tăng dần)</option>
              <option value="-createdAt">Ngày thêm (giảm dần)</option>
              <option value="-checked">Trạng thái</option>
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
        <table className="user_detail" style={{width:"100%"}}>
          <thead>
            <tr>
              <th style={{width:"35%"}}>Ảnh sản phẩm</th>
              <th style={{width:"20%"}}>Tên sản phẩm</th>
              <th style={{width:"20%"}}>Ngày thêm</th>
              <th style={{width:"20%"}}>Trạng thái</th>
              <th style={{width:"5%"}}>Edit</th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default Product;
