import React, { useEffect, useState } from "react";

function App() {
  const [domain, setdomain] = useState("d");
  const [imgUrl, setImgUrl] = useState("1");
  const [firstLetter, setfirstLetter] = useState("f");

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
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (activeTab) => {
        console.log(activeTab);

        const domain = getDomain(activeTab);

        setdomain(domain);

        setImgUrl(activeTab[0].favIconUrl);
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

  return (
    <div className="">
      {imgUrl ? (
        <img src={imgUrl} alt='icon'/>
      ) : (
        <div class="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-2xl font-medium">
          {firstLetter}
        </div>
      )}
      {domain}
    </div>
  );
}

export default App;
