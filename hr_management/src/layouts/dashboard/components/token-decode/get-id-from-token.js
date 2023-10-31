import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function getIdFromToken() {
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
}
export default getIdFromToken;
