import React from 'react'
import './Button.css'

function PrimaryButton(props: any) {
    let color = props.color;
    let Block = props.IsBlock? "btn-block" : "";
    let size = props.IsSmall? "btn-sm" : "";
    let classColor;

    if (color == "primary"){
      classColor = "primary"
    }
    else if (color == "secondary"){
      classColor = "secondary"
    }
    else if (color == "third"){
      classColor = "third"
    }
    else if (color == "yellow"){
      classColor = "yellow"
    }  

    const buttonStyles = {
      width: props.width,
    };

    return (
      <>
          <div>
              <input type={props.type} className={`btn btn-primary ${classColor} ${Block} ${size}`} value={props.value}  style={buttonStyles}/>
          </div>
      </>
  )

}

export default PrimaryButton
