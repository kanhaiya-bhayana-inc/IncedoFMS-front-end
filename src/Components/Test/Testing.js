import React, { useState, useEffect } from 'react'
import SweetPagination from "sweetpagination";
import { fetchADFPipelineData, reRunAdfPipeline } from '../APIs/ADFPipeLine/api';
import loadingBar from '../../images/microsoftLoadingBar.gif';
import restartICon from '../../images/icons8-repeat.gif';
import serverErrorICon from '../../images/serverError.png';
import styles from './Testing.module.css';
import { Button, notification, Space } from 'antd';
import { convertTimeStampToDate, convertUTCToPST } from '../Helpers/HelperMethods';
import { Link } from 'react-router-dom';
import { reRunAdFPipeline } from '../APIs/ADFPipeLine/api';


export default function Testing() {
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  const [api, contextHolder] = notification.useNotification();
  const [pipelinesDataList, setPipelinesDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [IsServerUp, setIsServerUp] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [rerunLoading,setRerunLoading] = useState(false);
  const openNotificationWithIcon = (type, msg, des) => {
    api[type]({
      message: msg,
      description: des
    });
  };
  const [retryClicked, setRetryClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleStatusFilterChange = (e) => {
    const term = e.target.value;
    setStatusFilter(e.target.value);
  };
  const handleRetryClick = () => {
    // You can implement logic here to attempt to reconnect to the server
    // For simplicity, we'll just set retryClicked to true in this example
    setRetryClicked(true);
    window.location.reload();
  };
  const handleSearchFilter = ()=>{
    const parameter1 = searchTerm;
    const parameter2 = statusFilter;
    // const parameter3 = convertTimeStampToDate()
    const newFilteredData = pipelinesDataList.filter((data) =>
      data.pipelineName.toLowerCase().includes(searchTerm) && data.status.includes(statusFilter) && data.runStart.includes(dateFilter)
      // Add more conditions for other fields


      // ...
    );
    setFilteredData(newFilteredData.slice(0, itemsPerPage));
    setCurrentPageData(newFilteredData.slice(0,itemsPerPage));
  }
  const handleSearchTermChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  
  const resetFilter = ()=>{
    setStatusFilter("");
    setDateFilter("");
    setSearchTerm("");
    setCurrentPageData(pipelinesDataList.slice(0,itemsPerPage))
  }

  const hanldeDateChange = (e) =>{
    setDateFilter(e.target.value);
  }

  const itemsPerPage = 100;

  const rerunADFPipeline = (pipelineName) => {
    setRerunLoading(true);
    const res = reRunAdFPipeline(pipelineName);
    res.then((data) => {
      console.log("res is, ",data.statusMessage);
      if (data.statusMessage == "True") {
          console.log("Hola");
            fetchData();
            openNotificationWithIcon('success', "Pipeline re-runed successfully", "The pipeline has been re-runed successfully.");
      }
      else {
        openNotificationWithIcon('error', 'Some error occured during re-run', 'Try later, or contact admin for more details.')
      }
      setRerunLoading(false);
    }).catch((error) => {
      console.log('error: ', error);
    });
  };
  
  const fetchData = async () => {
    try {
      const data = await fetchADFPipelineData();
      setPipelinesDataList(data);
      setCurrentPageData(data)
      console.log("data is", data);
      
      if (data.toString() == "TypeError: Failed to fetch") {
        setIsServerUp(false);
        openNotificationWithIcon('error', 'Server is not running up', 'Try later, or contant admin for further information...');
      }else{
        setFilteredData(data.slice(0, itemsPerPage));
      }
      console.log(" data is", data); // Log the data after setting the state
    } catch (error) {
      // console.error('Error setting pipeline data options:', error);

    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      {contextHolder}
      {rerunLoading ? <img className='mt-5' height={100} src={restartICon} /> :<>
      
      {pipelinesDataList.length > 0 ?
        <div className='mt-5' id='mydiv'>
          <div className='row p-2'>

            
            <div className='col-2'>
              <input type="text"
                placeholder="Search by pipeline name..."
                value={searchTerm}
                onChange={handleSearchTermChange} className='form-control' />

            </div>
            <div className='col-2'>
            <input type='date' title='Select RunStart Date' onChange={hanldeDateChange} value={dateFilter} className='form-control' />
            </div>
            <div className='col-2'>
            <select className='form-control' value={statusFilter} onChange={handleStatusFilterChange}>
                  <option value="">Status</option>
                  <option value="">All</option>
                  <option value="Succeeded">Succeeded</option>
                  <option value="Failed">Failed</option>
                </select>
            </div>
            <div className='col-2'>
              <div className='row'>
                <div className='col-10'>
                <button className='btn' style={{backgroundColor:"#4285F4", color:"white"}} onClick={handleSearchFilter}>Search <i class="bi bi-search"></i></button>
                  &nbsp;&nbsp;&nbsp;
                <button className='btn' style={{backgroundColor:"white",border:"1px solid #4285F4", color:"#4285F4"}} onClick={resetFilter}>Reset <i class="bi bi-arrow-clockwise"></i></button>
                </div>
                <div className='col-2'></div>
              </div>
              {/* <button className='btn' style={{backgroundColor:"#4285F4", color:"white"}} onClick={handleSearchFilter}>Search <i class="bi bi-search"></i></button> */}
            </div>
            {/* <div className='col-1'>

              <button className='btn' style={{backgroundColor:"white",border:"1px solid #4285F4", color:"#4285F4"}} onClick={resetFilter}>Reset <i class="bi bi-arrow-clockwise"></i></button>
            </div> */}
            <div className='col-4' >
              <div style={{ float: "inline-end" }}>

                <SweetPagination
                  currentPageData={setCurrentPageData}
                  getData={pipelinesDataList}
                  dataPerPage={100}
                  navigation={true}
                  getStyle={'style-2'}
                />
              </div>
            </div>
          </div>
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
                  </div> : "NA"}</td>
                  <td>{data.parameters.SourceFileName != null ? data.parameters.SourceFileName : "---"}</td>
                  <td>{data.parameters.SourceFilePath != null ? data.parameters.SourceFilePath : "---"}</td>

                  <td>{data.runID}</td>
                  <td><button onClick={() => rerunADFPipeline(data.pipelineName)} style={{ border: "none", background: "none", fontSize: "20px" }}><i className="bi bi-arrow-repeat"></i></button></td>
                  <td><Link style={{ fontSize: "20px" }} to='/azurepipelinedetail' target='_blank'><i className="bi bi-arrow-right-circle"></i></Link></td>
                </tr>
              ))}


            </tbody>

          </table>
          <SweetPagination
            currentPageData={setCurrentPageData}
            getData={pipelinesDataList}
            dataPerPage={100}
            navigation={true}
            getStyle={'style-1'}
          />
        </div> : <div className='p-5 mt-5'><img src={IsServerUp ? loadingBar : serverErrorICon} className='mt-5' height={100} /><br /><br />
          {!IsServerUp ? <div>
            <h1>Server Error</h1>
            <p>Unable to establish a connection to the server.</p>

            {retryClicked && <p>Retrying...</p>}

            {!retryClicked && (
              <button style={{ border: "none", background: "none", fontSize: "50px" }} onClick={handleRetryClick}><i className="bi bi-arrow-clockwise"></i></button>
            )}

            <p>
              If the issue persists, please contact support at{' '}
              <a href="mailto:support@example.com">support@cloudFMS.com</a>.
            </p>
          </div> : ""}
        </div>}
        </>}
    </div>
  );
}