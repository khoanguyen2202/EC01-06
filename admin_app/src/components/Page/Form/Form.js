import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      brand_name: "",
      proc_name: "",
      category: "",
      price: 0,
      item_des: "",
      colors: "",
      item_attrs: "",
    };
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.handleChangeProc = this.handleChangeProc.bind(this);
    this.handleChangeCate = this.handleChangeCate.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeItemDes = this.handleChangeItemDes.bind(this);
    this.handleChangeColors = this.handleChangeColors.bind(this);
    this.handleChangeItemAttrs = this.handleChangeItemAttrs.bind(this);
  }

  handleChangeBrand = (e) => {
    this.setState({brand_name: e.target.value});
  }

  handleChangeProc = (e) => {
    this.setState({proc_name: e.target.value});
  }

  handleChangeCate = (e) => {
    this.setState({category: e.target.value});
  }

  handleChangePrice = (e) => {
    this.setState({price: e.target.value});
  }

  handleChangeItemDes = (e) => {
    this.setState({item_des: e.target.value});
  }

  handleChangeColors = (e) => {
    this.setState({colors: e.target.value});
  }

  handleChangeItemAttrs = (e) => {
    this.setState({item_attrs: e.target.value});
  }

  handleAddProduct() {
    let data = {}
    let next_num = this.props.proc_num*2 + 1
    data["product_id"] = "P"+ next_num
    data["category"] = this.state.category
    data["brandName"] = this.state.brand_name
    data["productName"] = this.state.proc_name
    data["price"] = Number(this.state.price)
    data["description"] = this.state.item_des
    data["rate"] = 0
    data["discount"] = 25
    data["reviews"] = []
    data["images"] = []
    data["sold"] = 0
    data["checked"] = true

    // Xử lý màu sản phẩm và số lượng
    let count = 0;
    data["colors"] = []
    for (let color of this.state.colors.split(",")){
      let each_color = color.split("-")
      count += + each_color[1]
      each_color = {
        "color": each_color[0],
        "quantity": +each_color[1]
      }
      data["colors"].push(each_color)
    }
    data["totalQuantity"] = count

    // Xử lý đặc trưng của sản phẩm
    let feats = this.state.item_attrs.split(",")
    feats = {
      "madeIn": feats[0],
      "status": feats[1],
      "insurance": feats[2]
    }
    data["feature"] = feats

    this.props.onSubmitted(data)
    // console.log(data)
  }

  render() {
    return (
      <div className="form_container">
        <h2>THÊM SẢN PHẨM MỚI</h2>
        <div className="upload">
          <label className="upload_label" htmlFor="file_upload">
            Tải hình ảnh
          </label>
          <input id="file_upload" type="file" hidden />
        </div>
        <input type="text" className="brand_name" placeholder="Tên thương hiệu" onChange={this.handleChangeBrand}/>
        <input type="text" className="product_name" placeholder="Tên sản phẩm" onChange={this.handleChangeProc}/>
        <select name="product_category" defaultValue="" id="product_category" onChange={this.handleChangeCate}>
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
        <input type="text" className="price_input" placeholder="Giá bán" onChange={this.handleChangePrice}/>
        <input type="text" className="describle" placeholder="Mô tả sản phẩm" onChange={this.handleChangeItemDes}/>
        <input type="text" className="colors" placeholder="Màu sắc" onChange={this.handleChangeColors}/>
        <input type="text" className="attributes" placeholder="Thuộc tính của sản phẩm" onChange={this.handleChangeItemAttrs}/>
        <div className="footer">
          <button className="cancel_button" onClick={this.props.onClosePopUp}>Huỷ</button>
          <button className="add_button" onClick={e => this.handleAddProduct(e, this.props)}>Thêm sản phẩm</button>
        </div>
      </div>
    );
  }
}

export default Form;
