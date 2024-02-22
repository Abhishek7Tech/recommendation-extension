try {
  let url;
 

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(url === tab.url) return;
    if (
      tab.url &&
      tab.url.includes("youtube.com/watch") &&
      tab.status === "complete"
      ) {
        setTimeout(() => {
          chrome.tabs.sendMessage(tabId, {
            type: "RATE",
            url: tab.url,
          });
        }, 8000);
        url = tab.url;
        return;
    }
  });
} catch (error) {
  console.log("BG_ERROR", error);
}
