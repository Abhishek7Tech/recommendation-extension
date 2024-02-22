const setVideoRating = (rating) => {
    const html = `<div id="video-overlay" style="border: 1px solid red; width: 50px; height: 40px; z-index: 100; position: absolute; margin:8px">
    <div style="background-color: orange; height:40px;">
        <h2 style="text-align: center; vertical-align: middle; margin: 0px; padding: 2px; color: black; font-size: 24px">${rating}</h2>
    </div>
  </div>`;
    return html;
  };

  export default setVideoRating;