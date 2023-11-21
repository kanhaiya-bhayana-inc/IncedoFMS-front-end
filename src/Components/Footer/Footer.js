import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
//     <footer classNameName="bg-light text-center text-lg-start">
//   <div classNameName={"text-center p-3" + " "+ styles.mainSection}>
//     <p classNameName={styles.fontWeight}>© 2023 Copyright: &nbsp; ASSETMARK-FMS</p>
    
//   </div>
// </footer>
// <!-- Remove the container if you want to extend the Footer to full width. -->
<div className={"shadow bg-white rounded " + styles.mainSection}>
  {/* <!-- Footer --> */}
  <footer className={"text-center "}>
    {/* <!-- Grid container --> */}
      
    <div
         className={"text-white p-3 " + styles.tempCss2}
         >
      
      <h6 className="text-dark"
         > © Copyright 2023 Cloud-FMS</h6>
    </div>
   
  </footer>
</div>
  );
}
