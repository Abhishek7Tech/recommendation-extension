try {
  let i = 0;
 

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (
      i < 1 &&
      tab.url &&
      tab.url.includes("youtube.com/watch") &&
      tab.status === "complete"
    ) {
      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {
          type: "RATE",
          url: tab.url,
        });
      }, 5000);
      i = i + 1;
      console.log("SENT RATEING REQUEST", tab.url, i);
      return;
    }
  });
} catch (error) {
  console.log("BG_ERROR", error);
}
