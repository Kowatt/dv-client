import React from "react"

const FormPopup = (props) => {

    return (props.trigger) ? (
  
      <div className="form-popup">
          {props.children}
      </div>
  
    ) : ""
  }
  
  export default FormPopup