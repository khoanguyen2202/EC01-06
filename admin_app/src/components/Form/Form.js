import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form_container">
        <h2>Sản phẩm mới</h2>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="product_name"
              placeholder="Tên sản phẩm"
            />
            <select name="product_category" id="product_category">
              <option value="category">Danh mục</option>
            </select>
          </div>
          <div className="upload_wrap col">
            <label className="upload_label" htmlFor="file_upload">
              Tải sản phẩm lên
            </label>
            <input id="file_upload" type="file" hidden />
          </div>
        </div>
        <input type="text" className="price_input" placeholder="Giá bán" />
        <input type="text" className="date_input" placeholder="Ngày mở bán" />
        <div className="footer">
          <button className="cancel_button">Huỷ</button>
          <button className="add_button">Thêm sản phẩm</button>
        </div>
      </div>
    );
  }
}

export default Form;
