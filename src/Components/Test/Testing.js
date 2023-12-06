import React, { useState, useEffect } from 'react'
import SweetPagination from "sweetpagination";
import { fetchADFPipelineData } from '../APIs/ADFPipeLine/api';
import loadingBar from '../../images/microsoftLoadingBar.gif';
import serverErrorICon from '../../images/serverError.png';
import styles from './Testing.module.css';
import { Button, notification, Space } from 'antd';
import { convertUTCToPST } from '../Helpers/HelperMethods';
import { Link } from 'react-router-dom';


export default function Testing() {
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  const [api, contextHolder] = notification.useNotification();
  const [pipelinesDataList, setPipelinesDataList] = useState([]);
  const [IsServerUp, setIsServerUp] = useState(true);
  const openNotificationWithIcon = (type, msg, des) => {
    api[type]({
      message: msg,
      description: des
    });
  };
  const [retryClicked, setRetryClicked] = useState(false);
  
  const handleRetryClick = () => {
    // You can implement logic here to attempt to reconnect to the server
    // For simplicity, we'll just set retryClicked to true in this example
    setRetryClicked(true);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchADFPipelineData();
        setPipelinesDataList(data);
        setCurrentPageData(data)
        if (data.toString() == "TypeError: Failed to fetch") {
          setIsServerUp(false);
          openNotificationWithIcon('error', 'Server is not running up', 'Try later, or contant admin for further information...');
        }
        console.log(" data is", data); // Log the data after setting the state
      } catch (error) {
        console.error('Error setting pipeline data options:', error);

      }
    };

    fetchData();
  }, []);

  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      {contextHolder}
      {pipelinesDataList.length > 0 ?
        <div className='mt-5' id='mydiv'>
          <table className="table table-bordered">
            <thead style={{ padding: "10px" }}>
              <tr>
                <th scope="">Pipeline name</th>
                <th scope="">RunStart</th>
                <th scope="">RunEnd</th>
                <th scope="">Duration(ms)</th>
                <th scope="">Status</th>
                <th scope="">Error</th>
                {/* <th scope="">Parameters</th> */}
                <th scope="">SourceFileName</th>
                <th scope="">SourceFilePath</th>
                <th scope="">Run Id</th>
                <th scope="">Action</th>
                <th scope="">MoreDetails</th>

              </tr>
            </thead>
            <tbody>
              {currentPageData && currentPageData.map((data, i) => (
                
                <tr scope='row' key={i}>
                  <td>{data.pipelineName}</td>
                  <td> {convertUTCToPST(data.runStart)}</td>
                  <td>{convertUTCToPST(data.runEnd)}</td>
                  <td>{data.durationInMS}</td>
                  <td style={{ width: "130px", textAlign: "   " }}>{data.status == "Succeeded" ? <i style={{ color: "green", fontSize: "20px" }} className="bi bi-check-circle-fill"></i> : <i style={{ color: "red", fontSize: "20px" }} className="bi bi-x-circle-fill"></i>} {data.status}</td>
                  <td>{data.errorMessage != "" ? <div style={{ color: "red", textAlign: "left" }} className={styles.errorCell}>
                    <span className={styles.visibleContent}>{data.errorMessage.split(' ').slice(0, 4).join(' ')}</span>
                    <span className={styles.fullContent}>{data.errorMessage}</span>
                  </div> : "---"}</td>
                  <td>{data.parameters.SourceFileName != null ? data.parameters.SourceFileName : "---"}</td>
                  <td>{data.parameters.SourceFilePath != null ? data.parameters.SourceFilePath : "---"}</td>

                  <td>{data.runID}</td>
                  <td><button style={{ border: "none", background: "none", fontSize:"20px" }}><i className="bi bi-arrow-clockwise"></i></button></td>
                  <td><Link style={{fontSize:"20px"}} to='/azurepipelinedetail' target='_blank'><i className="bi bi-arrow-right-circle"></i></Link></td>
                </tr>
              ))}


            </tbody>

          </table>
          <SweetPagination
            currentPageData={setCurrentPageData}
            getData={pipelinesDataList}
            dataPerPage={6}
            navigation={true}
            getStyle={'style-1'}
          />
        </div> : <div className='p-5 mt-5'><img src={IsServerUp ? loadingBar : serverErrorICon} className='mt-5' height={100} /><br /><br />
          {!IsServerUp ? <div>
            <h1>Server Error</h1>
            <p>Unable to establish a connection to the server.</p>

            {retryClicked && <p>Retrying...</p>}

            {!retryClicked && (
              <button onClick={handleRetryClick} style={{ border: "none", background: "none", fontSize: "50px" }}><i className="bi bi-arrow-clockwise"></i></button>
            )}

            <p>
              If the issue persists, please contact support at{' '}
              <a href="mailto:support@example.com">support@cloudFMS.com</a>.
            </p>
          </div> : ""}
        </div>}
    </div>
  );
}