const rateRecommendations = () => {
    contentArray.splice(0, contentArray.length);
    document
      .querySelectorAll(
        "a"
        // ).forEach((item) => console.log("ITEM__2", item.getAttribute("id") === "thumbnail" && item.getAttribute("href")?.includes("/watch") && contentArray.includes(item.getAttribute("href")) ? "" : contentArray.push(item.getAttribute("href"))));
      )
      .forEach(
        (item) =>
          item.getAttribute("id") === "thumbnail" &&
          item.getAttribute("href")?.includes("/watch") &&
          !contentArray.includes(item.getAttribute("href")) &&
          contentArray.push(item.getAttribute("href"))
      );
  };

  export default rateRecommendations;