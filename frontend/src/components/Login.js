import React from "react";
import AuthForm from "./AuthForm";

const Login = ({email, setEmail, password, setPassword, authorize}) => {
  
  return (
    <div className="page">
      <AuthForm 
        title="Вход" 
        submitTitle="Войти"
        email={email}
        onChangeEmail={setEmail}
        password={password}
        onChangePassword={setPassword}
        onSubmit={authorize}
      />
    </div>
  )
}

export default Login;