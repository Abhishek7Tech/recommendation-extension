import setContentRatings from "./setContentRatings";
import setVideoRating from "./setVideoRatings";
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

  export default setOverLay;