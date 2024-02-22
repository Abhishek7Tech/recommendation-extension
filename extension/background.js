try {
  let url;

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log("STARTED");
    if (url === tab.url) return;
    console.log("STARTED-2");

    if (
      tab.url &&
      tab.url.includes("youtube.com/watch") &&
      tab.status === "complete"
    ) {
      console.log("STARTED-3");

      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {
          type: "RATE",
          url: tab.url,
        });
      }, 8000);
      console.log("STARTED-4");

      url = tab.url;
      console.log("STARTED-5",tab.url);

      return;
    }
  });
} catch (error) {
  console.log("BG_ERROR", error);
}
