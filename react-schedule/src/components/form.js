import React, { useEffect } from "react";
import { useState } from "react";
import classes from './form.module.css'

function Form(props) {
  const [data, setData] = useState({});
  const { inputs, texts, selects, onSubmit, error } = props;

  useEffect(() => {
    inputs.map(input => {
      data[input.key] = ''
    })
    texts.map(input => {
      data[input.key] = ''
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        {error && <span>{error}</span>}
        <form onSubmit={handleSubmit}>
          {inputs ? inputs.map(input => (
            <div key={input.key} className={classes.input} >
              <label htmlFor={input.name}>{input.label}</label>
              <input defaultValue={input.defaultValue}
                type={input.type}
                name={input.name}
                id={input.key}
                onChange={(e => data[input.key] = e.target.value)}
              />
            </div>
          )) : null}
          {texts ? texts.map(text => (
            <div
              key={text.key}
              className="text" >
              <label htmlFor={text.name}>{text.label}</label>
              <br></br>
              <textarea
                defaultValue={text.defaultValue}
                type={text.type} name={text.name}
                id={text.key}
                rows={5}
                onChange={(e => data[text.key] = e.target.value)}
              />
            </div>
          )
          ) : null
          }
          {selects ? selects.map(select => (
            <div className="select"
              key={select.key}
            >
              <label htmlFor={select.name}>{select.label}</label>
              <select
                defaultValue={select.defaultValue}
                type={select.type}
                name={select.name}
                id={select.key}
                onChange={(e => {
                  setData(data => ({ ...data, [select.key]: e.target.value }));
                }
                )}
              >
                {select.options.map(option => (
                  <option
                    key={option.key}
                    value={option.val}>{option.name}</option>
                ))}
              </select>
            </div>
          )) : null}
          <button type="submit">שלח</button>
        </form>
      </div>
    </React.Fragment>
  )
}


export default Form;