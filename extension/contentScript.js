let contentArray = [];
let updatedContentArray = [];

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

const getRatings = async (content) => {
  if (!content.length) return;

  const res = await fetch("http://localhost:7000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ urls: content }),
  });

  if (res.ok) {
    const ratings = await res.json();
    return ratings;
  }
};



const setContentRatings = (rating) => {
  const html = `<div id="content-overlay" style="border: 1px solid red; width: fit-content; z-index: 100; position: absolute; margin:4px">
  <div style="background-color: orange;">
      <h2 style="text-align: center; vertical-align: middle; margin: 0px; padding: 2px; color: black">${rating}</h2>
  </div>
</div>`;
  return html;
};

const setVideoRating = (rating) => {
  const html = `<div id="video-overlay" style="border: 1px solid red; width: 50px; height: 40px; z-index: 100; position: absolute; margin:8px">
  <div style="background-color: orange; height:40px;">
      <h2 style="text-align: center; vertical-align: middle; margin: 0px; padding: 2px; color: black; font-size: 24px">${rating}</h2>
  </div>
</div>`;
  return html;
};

const setOverLay = (ratings, videoURL) => {
  ratings?.map((urls) => {
    const anchorEle = document.querySelector(`a[href='${urls.url}']`);
    if (anchorEle && !anchorEle.querySelector("#content-overlay")) {
      anchorEle.insertAdjacentHTML(
        "afterbegin",
        setContentRatings(urls.rating)
      );
    }

    if (videoURL && urls.url === videoURL) {
      console.log("Video url", urls.url, urls.rating);
      const videoEle = document.querySelector("#movie_player");
      videoEle.insertAdjacentHTML("afterbegin", setVideoRating(urls.rating));
    }
  });
};

const observer = new MutationObserver(async (mutations) => {
  setTimeout(async () => {
    mutations.forEach((item) => {
      const target = item.target;
      if ("href" in target) {
        const link = target.href.slice(23);
        console.log("link", link);
        if (link.includes("/watch") && !updatedContentArray.includes(link)) {
          updatedContentArray.push(link);
        }
      }
    });
    if (updatedContentArray.length) {
      const ratings = await getRatings(updatedContentArray);
      setOverLay(ratings, "");
      updatedContentArray = [];
    }
  }, 8000);
});

(async () => {
  try {
    chrome.runtime.onMessage.addListener(async (req, sender, res) => {
      console.log("REQ", req);
      if (req.type === "RATE") {
        rateRecommendations();
        // console.log("CONTENT ARRAY", contentArray);
        if (contentArray.length) {
          const ratings = await getRatings(contentArray);
          const videoURL = req.url.slice(23);
          setOverLay(ratings, videoURL);
          const recommendationsEle = document.querySelector(
            '.style-scope[section-identifier="sid-wn-chips"]'
          );

          const content = recommendationsEle.querySelector("#contents");
          observer.observe(content, {
            attributes: true,
            subtree: true,
            childList: true,
          });
        }
      } else {
        console.log("NOT FOUND");
      }
    });
  } catch (error) {
    console.log("CS_ERROR", error);
  }
})();

// document.querySelector("a[href='/watch?v=MPhz_EqctdA']");
