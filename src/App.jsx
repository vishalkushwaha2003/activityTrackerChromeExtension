import React, { useEffect, useState } from "react";
import LoginButton from "./login/Login";

function App() {
  const [domain, setdomain] = useState("d");
  const [imgUrl, setImgUrl] = useState("1");
  const [firstLetter, setfirstLetter] = useState("f");
  const [startingTime, setStartingTime] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [input, setInput] = useState("");
  const [val,setVal]=useState(null);

 
 

   
  const sendHandler = (e) => {
    e.preventDefault();

    chrome.runtime.sendMessage({ action: "getData", data: input });
  };

  const getDomain = (activeTab) => {
    if (activeTab) {
      const url = activeTab[0].url;
      const domain = url.split("/")[2];

      return domain;
    } else {
      return null;
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("i am hereeeeeeeeeeee");
      if (message.action == "sendDataToPopup") {
        var receivedData = message.data;
        console.log(receivedData);
      }
    });
  }, []);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (activeTab) => {
        if (activeTab && activeTab.length > 0) {
         

          const domain = getDomain(activeTab);

          setdomain(domain);
          setImgUrl(activeTab[0].favIconUrl);
        }
      }
    );
  }, []);

  function getFirstLetter(domain) {
    if (typeof domain === "string" && domain.length > 0) {
      return domain.charAt(0).toUpperCase();
    } else {
      return "";
    }
  }

  useEffect(() => {
    const firstLetter = getFirstLetter(domain);
    setfirstLetter(firstLetter);
  }, [domain, imgUrl]);



  

  const getFetch = async () => {
    const res = await fetch("http://localhost:8000", {
      method: "GET",
    });

    const data = await res.json();
    setVal(data.message);
  };



//timer

 


    








  return (
    <>
      <div className="w-[300px] h-[400px] ">
        {imgUrl ? (
          <img src={imgUrl} alt="icon" />
        ) : (
          <div class="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-2xl font-medium">
            {firstLetter}
          </div>
        )}
        {domain}
      </div>

      
      <div>
        <form action="" onSubmit={sendHandler}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button type="submit">send</button>
        </form>
      </div>

      <div>
        <button onClick={getFetch}>fetch</button>
      </div>
      {val &&<h1>{val}</h1>}
      <div>

        <LoginButton/>
      </div>

    {/* <div>
        <h2 >timer</h2>
      <div className="flex justify-between">
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
      <button onClick={resetTimer}>reset</button>
      </div>
    </div> */}
      
    </>
  );
}

export default App;
