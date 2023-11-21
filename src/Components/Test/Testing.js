import React, { useState } from 'react'
import SweetPagination from "sweetpagination";


export default function Testing() {
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      {/* <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table> */}
      <div className='p-3' id='mydiv'>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item) => (
              <tr>
                <td>Larry {item}</td>
                <td>the Bird {item}</td>
                <td>@twitter {item}</td>
                <td><button style={{border:"none",background:"none"}}><i class="bi bi-arrow-clockwise"></i></button></td>
              </tr>
            ))}

          </tbody>

        </table>
        <SweetPagination
          currentPageData={setCurrentPageData}
          getData={items}
          dataPerPage={10}
          navigation={true}
          getStyle={'style-1'}
        />
      </div>
    </div>
  );
}