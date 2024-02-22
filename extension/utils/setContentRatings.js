const setContentRatings = (rating) => {
    const html = `<div id="content-overlay" style="border: 1px solid red; width: fit-content; z-index: 100; position: absolute; margin:4px">
    <div style="background-color: orange;">
        <h2 style="text-align: center; vertical-align: middle; margin: 0px; padding: 2px; color: black">${rating}</h2>
    </div>
  </div>`;
    return html;
  };

  export default setContentRatings;