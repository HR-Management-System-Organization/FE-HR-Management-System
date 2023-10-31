import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function getRoleFromToken() {
  const [role, setRole] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      const decodedRole = decodedToken.role;
      setRole(decodedRole);
      console.log(role);
      localStorage.setItem(role, decodedRole);
    }
  });
}
export default getRoleFromToken;
