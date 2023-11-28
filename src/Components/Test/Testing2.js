import React, { useState } from 'react';

export default function Testing2() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleButtonClick = () => {
        setIsDialogOpen(true);
      };
    
      const handleClose = () => {
        setIsDialogOpen(false);
      };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Column with Button</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button onClick={handleButtonClick}>Click</button>
                Open Dialog
              
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

    {isDialogOpen ? <div className='w-50' style={{border:"1px solid black"}}>
    <h2>Hola</h2>
    </div> :""}
      
    </div>
  )
}
