let contentArray = [];
let updatedContentArray = [];
let videoURL = "";

const rateRecommendations = (videoUrl) => {
  contentArray.splice(0, contentArray.length);
  document
    ?.querySelectorAll(
      "a"
      // ).forEach((item) => console.log("ITEM__2", item.getAttribute("id") === "thumbnail" && item.getAttribute("href")?.includes("/watch") && contentArray.includes(item.getAttribute("href")) ? "" : contentArray.push(item.getAttribute("href"))));
    )
    ?.forEach(
      (item) =>
        item.getAttribute("id") === "thumbnail" &&
        item.getAttribute("href")?.includes("/watch") &&
        !contentArray.includes(item.getAttribute("href")) &&
        contentArray.push(item.getAttribute("href"))
    );

  !contentArray.includes(videoURL.slice(23)) &&
    contentArray.push(videoURL.slice(23));

  console.log("RATEEEE");
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
  console.log("VIDEO URL", videoURL);
  ratings?.map((urls) => {
    const anchorEle = document.querySelector(`a[href='${urls.url}']`);

    if (anchorEle && anchorEle.querySelector("#content-overlay")) {
      anchorEle.querySelector("#content-overlay").remove();
      anchorEle.insertAdjacentHTML(
        "afterbegin",
        setContentRatings(urls.rating)
      );
      // console.log("ELE ANCHOR -1")
    } else {
      anchorEle?.insertAdjacentHTML(
        "afterbegin",
        setContentRatings(urls.rating)
      );
    }

    
  });

  const videoEle = document.querySelector("#movie_player");

  const videoRatings = ratings.filter((urls) => urls.url === videoURL);
  if (videoRatings[0]?.url && videoEle.querySelector("#video-overlay")) {
    // console.log("IN IN SIDE-1");
    videoEle.querySelector("#video-overlay").remove();
    videoEle.insertAdjacentHTML(
      "afterbegin",
      setVideoRating(videoRatings[0].rating)
    );
  }

  if (videoRatings[0]?.url && !videoEle.querySelector("#video-overlay")) {
    // console.log("IN IN SIDE-2");
    videoEle.insertAdjacentHTML(
      "afterbegin",
      setVideoRating(videoRatings[0].rating)
    );
  }

  return;
};
const observer = new MutationObserver(async (mutations) => {
  // setTimeout(async () => {
    mutations.forEach(async (item) => {
      const target = item.target;
      if ("href" in target) {
        const link = target.href.slice(23);
        if (link.includes("/watch") && !updatedContentArray.includes(link)) {
          updatedContentArray.push(link);
          // // const newContentArray = updatedContentArray.filter(
          // //   (urls) => !contentArray.includes(urls)
          // // );
          // // contentArray = [...contentArray, ...newContentArray];
          const ratings = await getRatings([link]);
          console.log("RATINGS", link, ratings);
          setOverLay(ratings, videoURL.slice(23));
          // updatedContentArray = []
        }
      }
    });
  // }, 1000);

  return;

});

(async () => {
  try {
    chrome.runtime.onMessage.addListener(async (req, sender, res) => {
      if (req.type === "RATE") {
        videoURL = req.url;

        rateRecommendations(videoURL);
        if (contentArray.length) {
          const ratings = await getRatings(contentArray);
          setOverLay(ratings, videoURL.slice(23));

          const recommendationsEle = document.querySelector(
            '.style-scope[section-identifier="sid-wn-chips"]'
          );

          const content = recommendationsEle.querySelector("#contents");

        videoURL === req.url && observer.observe(content, {
            attributes: true,
            subtree: true,
            childList: true,
          });
        }
        contentArray = [];
      } else {
        console.log("NOT FOUND");
      }
    });
  } catch (error) {
    console.log("CS_ERROR", error);
  }
  return;
})();

