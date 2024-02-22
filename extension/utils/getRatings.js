
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

  export default getRatings();