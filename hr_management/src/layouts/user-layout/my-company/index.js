import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

function MyCompany() {
  const [id, setId] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const decodedId = decodedToken.myId;
      setId(decodedId);
      console.log(id);
      localStorage.setItem(id, decodedId);
    }
  });
  axios.post("http://localhost:7071/api/v1/auth/findbyid");
  return <div>{id}</div>;
}

export default MyCompany;
