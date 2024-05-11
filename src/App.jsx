import React, { useEffect, useState } from 'react'

function App() {

    const [tab,setTab]=useState();
                                 
    useEffect(() => {
      chrome.tabs.query(
        { active: true, lastFocusedWindow: true },
        (activeTab) => {
          console.log(activeTab);
         
       
                                        
        
        }
      );
    }, []);
     

 







  return (
    <div className='h-40vw w-30vw bg-red-500'>
    rtert
    </div>
  )
}

export default App
