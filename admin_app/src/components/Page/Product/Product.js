import React from "react";
import "./Product.css";
import ConfirmPopup from ".././ConfirmPopup/ConfirmPopup";
import Form from "../Form/Form";
import axios from "axios";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      showConfirmPopup: false,
      showAddItemForm: false,
      filter: "totalQuantity",
      search: "",
      type: "",
    };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
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
    if (prevState.filter !== this.state.filter || prevState.search !== this.state.search
        || prevState.type !== this.state.type){
      var get_link = "http://localhost:5000/products?sort=" + this.state.filter + "&productName[regex]=" + this.state.search
                                                            + "&category[regex]=" + this.state.type;
      await axios.get(get_link)
      .then(res => {
        this.setState({ products: res["data"]["products"] });
      })
      .catch(e => console.log(e));
    }
    else if (prevState.showAddItemForm !== this.state.showAddItemForm){
      if (this.state.showAddItemForm){
        console.log("Form is opened")
      }
      else { console.log("Form is closed") }
    }
  }

  handleChangeSearch = (e) => {
    this.setState({search: e.target.value});
  }

  handleChangeType = (e) => {
    this.setState({type: e.target.value});
  }
  
  handleChange = (e) => {
    // console.log(event.target.value);
    this.setState({ filter: e.target.value });
  };

  togglePopup = (e) => {
    this.setState({
      showAddItemForm: !this.state.showAddItemForm
    });
  }

  handleNewProDucts(data){
    try{
      const res = axios.post('http://localhost:5000/products/add', data)
      alert("Thêm sản phẩm thành công")
    }
    catch (err) {
      alert("Thêm sản phẩm thất bại")
    }

  }

  renderTable() {
    const table = [];
    for (let product of this.state.products) {
      var state = "";
      var state_dis = "";
      product.createdAt = new Date(product.createdAt);
      product.createdAt = product.createdAt.toDateString();
      if (product.totalQuantity > 0) {
        state = "current_sale";
        state_dis = "Đang kinh doanh";
      }
      else{
        state = "sold_out";
        state_dis = "Hết hàng";
      }
      const obj = {public_id : "test/vw8tcixzz828k5xosto8" , 
             url: "https://image.thanhnien.vn/w1024/Uploaded/2022/yfrph/2022_03_09/a80ffcf1-9717-4843-aaf8-f4a2a826ddbf-7587.jpeg"}
      if (Object.keys(product.images).length === 0){
        product.images.push(obj)
      }
      table.push(
        <tr className={state}>
          <td><img src={product.images[0].url} alt="" className="product_img"/></td>
          <td>{product.productName}</td>
          <td>{product.createdAt}</td>
          <td>{state_dis}</td>
          <td>Edit</td>
        </tr>
      );
    }
    return table;
  }

  render() {
    return (
      <div className="product_management">
        {this.state.showAddItemForm ? <Form
          onClosePopUp = {this.togglePopup}
          onSubmitted = {this.handleNewProDucts}
          proc_num = {this.state.products.length}
        ></Form> : null }
        <h1>Quản lý sản phẩm</h1>
        <div className="product_handling">
          <div className="filter_box">
            <label htmlFor="filter_label">Sắp xếp theo:</label>
            <select name="filter_droplist" defaultValue="totalQuantity" id="filter_droplist" onChange={this.handleChange}>
              <option value="productName">Thứ tự tên (tăng dần)</option>
              <option value="-productName">Thứ tự tên (giảm dần)</option>
              <option value="createdAt">Ngày thêm (tăng dần)</option>
              <option value="-createdAt">Ngày thêm (giảm dần)</option>
              <option value="totalQuantity">Trạng thái</option>
            </select>
          </div>
          <div className="filter_box">
            <label htmlFor="filter_label">Lọc theo danh mục:</label>
            <select name="filter_droplist" defaultValue="" id="filter_droplist" onChange={this.handleChangeType}>
              <option value="">Danh mục</option>
              <option value="Bo sac">Bộ sạc điện thoại</option>
              <option value="Sac du phong">Pin sạc dự phòng</option>
              <option value="Tai nghe">Tai nghe điện thoại</option>
              <option value="Gay selfie">Gậy chụp hình</option>
              <option value="Op lung">Ốp lưng điện thoại</option>
              <option value="Gia do dien thoai">Giá đỡ điện thoại</option>
              <option value="Thiet bi mang">Thiết bị mạng</option>
              <option value="Ban phim">Bàn phím</option>
              <option value="Chuot">Chuột máy tính</option>
              <option value="Webcam">Webcam</option>
            </select>
          </div>
          <button className="add_button" onClick={this.togglePopup}>
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
            placeholder="Tìm sản phẩm"
            onChange={this.handleChangeSearch}
          />
        </div>
        <table className="user_detail" style={{width:"100%"}}>
          <thead>
            <tr>
              <th style={{width:"30%"}}>Ảnh sản phẩm</th>
              <th style={{width:"25%"}}>Tên sản phẩm</th>
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
