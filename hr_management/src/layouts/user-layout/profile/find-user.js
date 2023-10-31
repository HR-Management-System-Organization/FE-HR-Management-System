import axios from "axios";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function getUser() {
  const [id, setId] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const decodedUserId = decodedToken.myId;
      setId(decodedUserId);
      localStorage.setItem(id, decodedUserId);
    }
  });
}
export default getUser;
