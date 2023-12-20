import React, { useEffect, useState } from "react";
import { url } from "../serevices/config";
import DataTable from "../components/table";


function Home(props) {
  const { user } = props;
  const [times, setTimes] = useState([]);
  const [users, setUsers] = useState([0]);
  const [employee, setEmployee] = useState('all')

  const setTheUsers = () => {
    if (user.admin) {
      fetch(url + 'auth', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {

        return res.json();
      }).then(resUsers => {
        setUsers(resUsers.users);
      })
        .catch(err => console.log(err));
    }
  }


  const setData = () => {
    let path = 'times';
    if (user.admin) {
      path = 'times/admin/' + employee;

    }
    fetch(url + path, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      }).then(resData => {
        if (resData) {
          setTimes(resData.times.sort((a, b) => new Date(b.date) - new Date(a.date)));
        };
        return
      }).catch(err => {
        console.log(err);
      })

  }


  useEffect(() => {
    setData();
    setTheUsers();
  }, []);

  useEffect(() => {
    setData();
  }, [employee]);

  return (
    <div className="container">
      {user.admin && users &&
        <select onChange={(e) => setEmployee(e.target.value)}>
          <option value={'all'}>כולם</option>
          {users.map(empl => <option key={users.indexOf(empl)} value={'choose/' + empl._id}>{empl.name} </option>)}
        </select>}
      {times && <DataTable data={times} />}
    </div>
  )

}

export default Home