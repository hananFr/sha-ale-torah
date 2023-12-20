import React from "react";
import { useState } from "react";
import { url } from "../serevices/config";
import Form from "../components/form";

function Login() {
  const [inputs, setInputs] = useState([{
    name: 'email',
    key: 'email',
    type: 'email',
    label: 'אימייל',
    defaultValue: ''
  }, {
    name: 'password',
    key: 'password',
    type: 'password',
    label: 'סיסמא',
    defaultValue: ''
  }]);

  const [error, setError] = useState(null);
  const onSubmit = (data) => {
    let error = false;
    fetch(url + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(resData => {
        if (error) {
          const err = new Error(resData.message);
          throw err;
        }
        localStorage.setItem('token', resData.token);
        window.location.assign('/');
      })
      .catch(err => {
        setError(err.message);
      })
  }
  return (
    <Form
      error={error}
      inputs={inputs}
      onSubmit={onSubmit}
    ></Form>
  )

}
export default Login;