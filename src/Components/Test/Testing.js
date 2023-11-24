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
    <div className='container'>
      {pipelinesDataList.length != 0 ?
        <div className='p-3' id='mydiv'>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Pipeline name</th>
                <th scope="col">Run start</th>
                <th scope="col">Run end</th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
                <th scope="col">Error</th>
                <th scope="col">Parameters</th>
                <th scope="col">Run Id</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {pipelinesDataList && pipelinesDataList.map((data, i) => (
                <tr key={i}>
                  <td>{data.pipelineName}</td>
                  <td>{data.runStart}</td>
                  <td>{data.runEnd}</td>
                  <td>{data.durationInMS}</td>
                  <td>{data.status}</td>
                  <td>{data.errorMessage != "" ?<div style={{color:"red"}} className={styles.errorCell}>
                    <span className={styles.visibleContent}>{data.errorMessage.split(' ').slice(0, 4).join(' ')}</span>
                    <span className={styles.fullContent}>{data.errorMessage}</span>
                  </div>:"---"}</td>
                  <td>TBD</td>
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