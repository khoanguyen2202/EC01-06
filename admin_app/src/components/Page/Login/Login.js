import React from "react";
import "./Login.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber: "",
      password: "",
    }
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeUserName(e) {
    this.setState({phonenumber: e.target.value});
  }

  handleChangePass(e) {
    this.setState({password: e.target.value});
  }


  handleClick = async (e) => {
    e.preventDefault();
    let user = this.state;
    try {
      // check PhoneNumber
      var regExp = /[a-zA-Z]/g;
      if (user.phonenumber.length !== 10 || regExp.test(user.phonenumber)) {
        alert("Số điện thoại không đúng định dạng");
      } else {
          const res = await axios.post('http://localhost:5000/customers/sign-in', {...user})
          console.log(res);
          localStorage.setItem('firstLogin', true)
          localStorage.setItem('token', res.data.accesstoken)

          window.location.href = "/";
      }
  } catch (err) {
      if (err.response.data.msg === "Username is not exist." || err.response.data.msg === "Incorrect password.") {
        alert("Mật khẩu không đúng");
      } 

  }
  };

  render() {
    return (
      <div className="login_form">
        <h2>Đăng nhập</h2>
        <form className="typing_form">
          <input id="username" type="text" placeholder="Tên đăng nhập" onChange={this.handleChangeUserName}/>
          <input id="password" type="password" placeholder="Mật khẩu" onChange={this.handleChangePass}/>
          <input type="button" value="Login" onClick={this.handleClick}/>
        </form>
      </div>
    );
  }
}

export default Login;
