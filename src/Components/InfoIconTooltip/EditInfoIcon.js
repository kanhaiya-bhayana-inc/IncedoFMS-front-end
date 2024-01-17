import React from 'react';
import "./EditInfoIcon.css";


export default function EditInfoIcon(props) {
  const [show, setShow] = React.useState(false);
  return (
    <div>
        <div id='info' style={{"padding":"5px"}}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        ><i className="bi bi-info-circle"></i>
        </div>

      {show ? <div className='filesList'>
        {props.description}
      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
      </div> : ""}
    </div>
  )
}
