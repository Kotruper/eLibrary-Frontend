export async function postJSON(data, url) {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.text();
      console.log("Request success:", result);
      return result;
    } catch (error) {
      console.error("Request error:", error);
      return null;
    }
  }