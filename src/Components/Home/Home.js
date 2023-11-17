import React from 'react'
import HomeImg from '../../images/homeImage.png'
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className='container'>
      <div className='mb-4 p-2'>

      <img src={HomeImg} alt='homeimage' height='700px' />
      <br />
      <a href='/fms' className={"btn" + " " + styles.buttonBgColor}>Start <i class="bi bi-arrow-right-circle"></i></a>
      </div>
      <hr />
      <div className='row mt-4 p-4'>
      <div className='col-6'>

        <div className={"shadow-lg p-3 mb-5 bg-white rounded " + styles.leftCont1}>
          <h3 style={{color:'#0C2340',float:'left'}}>Products</h3> <br /><br />
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
        </div>
      </div>
      {/* <div className='col-2'>

      </div> */}
      <div className='col-6'>

      <div className={"shadow-lg p-3 mb-5 bg-white rounded " + styles.leftCont1}>
        <h3 style={{color:'#0C2340',float:'left'}}>New Services</h3> <br /><br />
        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
      </div>
      </div>
      </div>
    </div>
  )
}
