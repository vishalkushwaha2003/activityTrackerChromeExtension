importScripts('bg2.js');


activeTabs = {};
helperFunction();

let hours = 0;
let minutes = 0;
let seconds = 0;
let preTab = "";
let preTab2 = "";

console.log(activeTabs);

chrome.windows.onRemoved.addListener((windowId) => {
  console.log(preTab);
  // chrome.storage.local.set({ preTab: preTab }).then(() => {
  //   console.log("Value is set", preTab);
  // });
});

chrome.windows.onCreated.addListener((window) => {
  console.log(preTab);
  // chrome.storage.local.get(["preTab"]).then((result) => {
  //   console.log("Value is " + result.preTab);
  // });
});



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const dataToSend = { hiii: "vishal" };
  console.log(message.data);
  chrome.runtime.sendMessage({ action: "sendDataToPopup", data: dataToSend });
});

//on acctive tab listener
chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    if (
      tab[0].url != "chrome://newtab/" &&
      tab[0].url != "" &&
      preTab != tab[0].url
    ) {
      if (preTab != "" && activeTabs[preTab]) {
        stopTimer();
        activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
        console.log(preTab);
        console.log(activeTabs[preTab].totalTime);
        resetTimer();
      }
      startTimer();
      if (!activeTabs[tab[0].url]) {
        activeTabs[tab[0].url] = {
          totalTime: `${hours}:${minutes}:${seconds}`,
        };
      }
      console.log(activeTabs);
      preTab = tab[0].url;
    }

    if (tab[0].url === "chrome://newtab/" || tab[0].url === "") {
      if (activeTabs[preTab]) {
        stopTimer();
        activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
        console.log(preTab);
        console.log(activeTabs[preTab].totalTime);
        resetTimer();
        preTab = tab[0].url;
      }
    }
  });
});
//on update tabs events
chrome.tabs.onUpdated.addListener((p, t, tab2) => {
  if (tab2.url != "chrome://newtab/" && preTab != tab2.url) {
    if (preTab != "" && activeTabs[preTab]) {
      
      stopTimer();
      activeTabs[preTab].totalTime = `${hours}:${minutes}:${seconds}`;
      console.log(preTab);
      console.log(activeTabs[preTab].totalTime);
      resetTimer();
    }

    if (tab2.active && tab2.windowId !== chrome.windows.WINDOW_ID_NONE) {
      startTimer();
      if (!activeTabs[tab2.url]) {
        activeTabs[tab2.url] = {
          totalTime: `${hours}:${minutes}:${seconds}`,
        };
      }
    }
    console.log(activeTabs);
    preTab = tab2.url;
  }
});


//timer
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let currentTime = 0;

function updateTime() {
  currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime(elapsedTime);
}

function displayTime(time) {
  totalSeconds = Math.floor(time / 1000);
  hours = Math.floor(totalSeconds / 3600);
  minutes = Math.floor((totalSeconds % 3600) / 60);
  seconds = totalSeconds % 60;
}
