import React, { useState } from 'react'
import SweetPagination from "sweetpagination";


export default function Testing() {
    const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
<div className='p-3' id='mydiv'>
      {currentPageData.map((item) => (
        <div className='p-3'>
          <h3>Item #{item}</h3>
        </div>
      ))}


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