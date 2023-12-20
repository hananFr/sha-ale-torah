import React from 'react';
import classes from './table.module.css';

function DataTable({ data }) {
  return (
    <div className={classes.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>תאריך</th>
            <th>תלמיד</th>
            <th>שעת הגעה</th>
            <th>שעת התחלה</th>
            <th>שעת סיום</th>
            <th>הערה</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td data-label="תאריך">{new Date(item.date).toLocaleDateString()}</td>
              <td data-label="תלמיד">{item.student}</td>
              <td data-label="שעת הגעה">{item.arrivalTime}</td>
              <td data-label="שעת התחלה">{item.startTime}</td>
              <td data-label="שעת סיום">{item.endTime}</td>
              <td data-label="הערה">{item.note}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
