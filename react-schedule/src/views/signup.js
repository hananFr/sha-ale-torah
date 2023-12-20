import React from "react";
import { useState } from "react";
import { url } from "../serevices/config";
import Form from "../components/form";

function Signup() {
  const [inputs, setInputs] = useState([
    {
      name: 'name',
      key: 'name',
      type: 'text',
      label: 'שם',
      defaultValue: ''
    },
    {
      name: 'email',
      key: 'email',
      type: 'email',
      label: 'אימייל',
      defaultValue: ''
    },
    {
      name: 'password',
      key: 'password',
      type: 'password',
      label: 'סיסמא',
      defaultValue: ''
    }]);

  const [error, setError] = useState('');

  const onSubmit = (data) => {
    fetch(url + 'auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) window.location.assign('/');
        return res.json();
      }).then(err => {
        throw new Error(err);
      })
      .catch(err => {
        setError(err.message);
      })
  }
  return (
    <Form
      inputs={inputs}
      onSubmit={onSubmit}
    ></Form>
  )

}
export default Signup;