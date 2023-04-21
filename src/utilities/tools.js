export async function postJSON(data, url) {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log("Request success!", await response.clone().text());
      return response;
    } catch (error) {
      console.error("Request error:", error);
      return null;
    }
  }

export async function loginUser(username, password){ 
  const data = {
      username: username,
      password: password,
      grant_type: "test"
    };

  const response = await postJSON(data,"https://authserviceforelib.azurewebsites.net/token");
  return response?.text();
}

export async function registerUser(username, password){ 
  const data = {
      firstName: "imie",
      lastName: "nazwisko",
      emailAddress: username,
      password: password
    };

  const response = await postJSON(data,"https://authserviceforelib.azurewebsites.net/api/User/Register");
  if(response?.ok){
    return loginUser(username,password);
  }
  return null;
}