import React from "react";
import AuthForm from "./AuthForm";

const Register = ({
  email,
  setEmail,
  password,
  setPassword,
  register
}) => {
  
  return (
    <div className="page">
      <AuthForm 
        title="Регистрация" 
        submitTitle="Зарегистрироваться"
        email={email}
        onChangeEmail={setEmail}
        password={password}
        onChangePassword={setPassword}
        onSubmit={register}
      />
    </div>
  )
}

export default Register;