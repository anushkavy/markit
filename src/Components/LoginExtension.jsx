import { useState } from "react";
import { addNewUser } from "../mongoConnection";

export default function LoginExtension({ setIsLoggedIn }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isNew, setIsNew] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSignUpSubmit() {
    userId = await addNewUser(userData);
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  }

  return (
    <div className="extension-main">
      <header>
        <h3>PINPOINT</h3>
        <button
          onClick={() => {
            setIsNew((prev) => !prev);
          }}
        >
          Log In
        </button>
        <button
          onClick={() => {
            setIsNew((prev) => !prev);
          }}
        >
          Sign Up
        </button>
        <button onClick={localStorage.setItem("userId", false)}>Log out</button>
      </header>

      {isNew ? (
        <>
          <h4>Sign Up</h4>
          <form onSubmit={handleSignUpSubmit}>
            <input
              className="link-input"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="link-input"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="abc12@fl.co"
            />
            <input
              className="link-input"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="abc12@fl.co"
            />
            <div className="main-btns">
              <button className="extension-btn save-btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h4>Login</h4>
          <form>
            <input
              className="link-input"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="abc12@fl.co"
            />
            <input
              className="link-input"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="abc12@fl.co"
            />
            <div className="main-btns">
              <button className="extension-btn save-btn" type="submit">
                Log In
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
