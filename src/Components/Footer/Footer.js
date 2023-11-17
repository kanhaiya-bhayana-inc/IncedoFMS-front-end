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
<div className={"my-5 " + styles.mainSection}>
  {/* <!-- Footer --> */}
  <footer className={"text-center " + styles.footerSection}>
    {/* <!-- Grid container --> */}
    <div className="">
      {/* <!-- Section: Links --> */}
      <section className="mt-5">
        {/* <!-- Grid row--> */}
        <div className="row text-center d-flex justify-content-center pt-5">
          {/* <!-- Grid column --> */}
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">About us</a>
            </h6>
          </div>
          {/* <!-- Grid column --> */}

          {/* <!-- Grid column --> */}
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Products</a>
            </h6>
          </div>
          {/* <!-- Grid column --> */}

          {/* <!-- Grid column --> */}
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Awards</a>
            </h6>
          </div>
          {/* <!-- Grid column --> */}

          {/* <!-- Grid column --> */}
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Help</a>
            </h6>
          </div>
          {/* <!-- Grid column --> */}

          {/* <!-- Grid column --> */}
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Contact</a>
            </h6>
          </div>
          {/* <!-- Grid column --> */}
        </div>
        {/* <!-- Grid row--> */}
      </section>
      {/* <!-- Section: Links --> */}

      <hr className="my-5" />

      {/* <!-- Section: Text --> */}
      <section className="mb-5">
        <div className="row d-flex text-white justify-content-center">
          <div className="col-lg-8 p-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti
              dicta, aliquam sequi voluptate quas.
            </p>
          </div>
          <div className="col-lg-8 p-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti
              dicta, aliquam sequi voluptate quas.
            </p>
          </div>
          <div className="col-lg-8 p-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti
              dicta, aliquam sequi voluptate quas.
            </p>
          </div>
        </div>
      </section>
     
    </div>
  
    <div
         className={"text-white p-3 " + styles.tempCss2}
         >
      
      <h6 className="text-white"
         > © Copyright 2023 Incedo Inc.</h6>
    </div>
   
  </footer>
</div>
  );
}
