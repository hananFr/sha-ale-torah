import React, { useState } from "react"
import { url } from "../serevices/config";
import Form from "../components/form";

function UpdatePass(props) {
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState([
    {
      name: 'oldPassword',
      key: 'oldPassword',
      type: 'password',
      id: 'old_pass',
      label: 'סיסמא קיימת',
      defaultValue: ''
    },
    {
      name: 'newPassword',
      key: 'newPassword',
      id: 'new_pass',
      type: 'password',
      label: 'סיסמא חדשה',
      defaultValue: ''
    },
    {
      name: 'newPasswordApproval',
      key: 'newPasswordApproval',
      type: 'password',
      id: 'newPasswordApproval',
      label: 'סיסמא חדשה שנית',
      defaultValue: ''
    },
  ]);
  const onSubmit = (data) => {
    fetch(url + 'auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) window.location.assign('/');
      return res.json();
    }).then(resData => {
      throw new Error(resData.message)

    }).catch(err => {
      setError(err.message);
    });
  }
  return (
    <Form
      inputs={inputs}
      onSubmit={onSubmit}
    />
  )
}

export default UpdatePass;