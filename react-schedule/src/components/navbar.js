import { BrowserRouter as Router, Link } from "react-router-dom";
import classes from './navbar.module.css';

function Navbar(props) {
  const { user } = props;
  const logout = (e) => {
    localStorage.removeItem('token');
    window.location.assign('/');
  }
  return (
    <div className={classes.navbar}>
      <Link className={classes.a} to='/'>ראשי</Link>
      <Link className={classes.a} to='/report'>דיווחי שעות</Link>
      <Link className={classes.a} to='/update-password'>שינוי סיסמא</Link>
      {user.admin && <Link className={classes.a} to='/signup'>רשום משתמש</Link>}

      <Link className={classes.a} onClick={logout}>התנתק</Link>
    </div>
  )
}

export default Navbar;