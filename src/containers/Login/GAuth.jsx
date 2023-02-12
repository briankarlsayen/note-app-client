import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "../../axios";

const GAuth = ({ navigate }) => {
  const handleCredentialResponse = async (response) => {
    console.log("res", response.credential);
    const user = jwtDecode(response.credential);
    console.log("user", user);
    // save response.credential.sub in database

    const login = await axios.post("/users/gauth", {
      credentials: response.credential,
    });
    if (!login) return console.log("error", login);
    if (!login.data.success) return console.log(login.data.message);
    localStorage.setItem("token", login.data.token);
    // navigate(`/app/notes`);
  };

  const handleAccount = () => {
    // check if registered acc
    // true go to login
    // false signup
  };

  const register = () => {};
  const signOut = () => {
    google.accounts.id.revoke("101739625312065879982", (done) => {
      console.log(done.error);
    });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "257812684746-u9pgc10helg0hsg8mu6j5l75imer4j0n.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      type: "standard",
      text: "continue_with",
    });
  }, []);

  return (
    <div>
      <p className="py-2">Sign in with google</p>
      <div id="signInDiv"></div>
      {/* <button className="bg-gray-300" onClick={signOut}>
        Sign out
      </button> */}
    </div>
  );
};

export default GAuth;
