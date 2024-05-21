import React, { useEffect, useState } from "react";
import Carousel from "./caresol/Carousel";
import BackgroundAnimation from "./background/BackgroundAnimation";

function App() {
  const [domain, setdomain] = useState("d");
  const [imgUrl, setImgUrl] = useState("1");
  const [firstLetter, setfirstLetter] = useState("f");
  const [startingTime, setStartingTime] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [input, setInput] = useState("");
  const [val, setVal] = useState(null);







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

  // const getFetch = async () => {
  //   const res = await fetch("http://localhost:8000", {
  //     method: "GET",
  //   });

  //   const data = await res.json();
  //   setVal(data.message);
  // };










  return (
    <>
     
      <div className="w-[300px] h-[400px] bg-black overflow-y-scroll ">
        
      <BackgroundAnimation/>
      <Carousel />
       
       
        {/* <div className="flex gap-1 ">
        {imgUrl ? (
          <div class="w-5 h-5 bg-transparent flex items-center justify-center ">
          <img src={imgUrl} alt="icon" />
          </div>
        ) : (
          <div class="w-5 h-5  rounded-full border-[0.5px]  border-white text-white bg-transparent flex items-center justify-center text-sm font-small">
            {firstLetter}
          </div>
        )}
        <div className="text-white">
        {domain}
        </div>
        </div> */}


       
        
       
       

      
        
      </div>

      {/* <div>
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
      </div> */}

      {/* <div>
        <button onClick={getFetch}>fetch</button>
      </div>
      {val && <h1>{val}</h1>} */}
    </>
  );
}

export default App;
