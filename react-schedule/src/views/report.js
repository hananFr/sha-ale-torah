import { useState } from "react";
import { url } from "../serevices/config";
import Form from "../components/form";

function Report() {
  const [inputs, setInputs] = useState([
    {
      name: 'startTime',
      key: 'startTime',
      id: 'id_start',
      label: 'שעת התחלה',
      defaultValue: ''
    },
    {
      name: 'arrivalTime',
      key: 'arrivalTime',
      id: 'id_arrival',
      label: 'שעת הגעה',
      defaultValue: ''
    },
    {
      name: 'studentArrivalTime',
      key: 'studentArrivalTime',
      id: 'id_student_arrival',
      label: 'שעת הגעת תלמיד',
      defaultValue: ''
    },
    {
      name: 'endTime',
      key: 'endTime',
      id: 'id_end',
      label: 'שעת סיום',
      defaultValue: ''
    },
    {
      name: 'student',
      key: 'student',
      id: 'id_student',
      label: 'תלמיד',
      defaultValue: ''
    },
  ]);

  const [texts, setTexts] = useState([{
    name: 'note',
    key: 'note',
    id: 'id_note',
    label: 'הערה',
    defaultValue: ''
  }]);

  const [error, setError] = useState()

  const onSubmit = (data) => {

    fetch(url + 'times', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          window.location.assign('/');
        }
        return res.json();
      }).then(msg => {
        throw new Error(msg.message);
      }).catch(err => {

        setError(err.message);
      })
  }

  return (
    <Form
      error={error}
      inputs={inputs}
      texts={texts}
      onSubmit={onSubmit}
    ></Form>
  )
}
export default Report