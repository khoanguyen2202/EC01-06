import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login_form">
        <h2>Đăng nhập</h2>
        <form className="typing_form">
          <input id="username" type="text" placeholder="Tên đăng nhập" />
          <input id="password" type="password" placeholder="Mật khẩu" />
          <input type="button" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
