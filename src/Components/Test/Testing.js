import React, { useState, useEffect } from 'react'
import SweetPagination from "sweetpagination";
import { fetchADFPipelineData } from '../APIs/ADFPipeLine/api';
import loadingBar from '../../images/microsoftLoadingBar.gif';
import styles from './Testing.module.css';


export default function Testing() {
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  const [pipelinesDataList, setPipelinesDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchADFPipelineData();
        setPipelinesDataList(data);
        console.log(data); // Log the data after setting the state
      } catch (error) {
        console.error('Error setting pipeline data options:', error);
      }
    };

    fetchData();
  }, []);

  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div className=''>
      {pipelinesDataList.length != 0 ?
        <div className='mt-5' id='mydiv'>
          <table class="table table-bordered w-100">
            <thead style={{padding:"10px"}}>
              <tr>
                <th scope="">Pipeline name</th>
                <th scope="">Run start</th>
                <th scope="">Run end</th>
                <th scope="">Duration(ms)</th>
                <th scope="">Status</th>
                <th scope="">Error</th>
                <th scope="">Parameters</th>
                <th scope="">Run Id</th>
                <th scope="">Action</th>

              </tr>
            </thead>
            <tbody>
              {pipelinesDataList && pipelinesDataList.map((data, i) => (
                <tr key={i}>
                  <td>{data.pipelineName}</td>
                  <td>{data.runStart.replace('T', ', T ').replace(/\..*$/, '')}</td>
                  <td>{data.runEnd.replace('T', ', T ').replace(/\..*$/, '')}</td>
                  <td>{data.durationInMS}</td>
                  <td style={{width:"130px",textAlign:"left"}}>{data.status == "Succeeded" ? <i style={{color:"green", fontSize:"20px"}} class="bi bi-check-circle-fill"></i> :<i style={{color:"red",fontSize:"20px"}} class="bi bi-x-circle-fill"></i>} {data.status}</td>
                  <td>{data.errorMessage != "" ?<div style={{color:"red",textAlign:"left"}} className={styles.errorCell}>
                    <span className={styles.visibleContent}>{data.errorMessage.split(' ').slice(0, 4).join(' ')}</span>
                    <span className={styles.fullContent}>{data.errorMessage}</span>
                  </div>:"---"}</td>
                  <td><i style={{fontSize:"20px"}} class="bi bi-list"></i></td>
                  <td>{data.runID}</td>
                  <td><button style={{ border: "none", background: "none" }}><i class="bi bi-arrow-clockwise"></i></button></td>
                </tr>
              ))}


            </tbody>

          </table>
          <SweetPagination
            currentPageData={setCurrentPageData}
            getData={pipelinesDataList}
            dataPerPage={10}
            navigation={true}
            getStyle={'style-1'}
          />
        </div> : <div className='p-5 mt-5'><img src={loadingBar} className='mt-5' height={100} /></div>}
    </div>
  );
}