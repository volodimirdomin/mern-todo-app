import axios from "axios";
import { useCallback, useState } from "react";
import { useAuth } from "../hooks/auth.hook";
import { AuthContext } from "../context/AuthContext";

const DATA_BUTTON = {
  LOGIN: "login",
  REGISTER: "register",
};

const LoginPage = () => {
  const auth = useAuth(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { button } = e.nativeEvent.submitter.dataset;

    if (button === DATA_BUTTON.LOGIN) {
      const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/authorization", {
        username,
        password,
      });
      auth.login(res.data.token, res.data.userId);
      if (auth.ready) {
        document.location.href = '/';
      }
    }

    if (button === DATA_BUTTON.REGISTER) {
      const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/register", {
        username,
        password,
      });
      
      auth.login(res.data.token, res.data.userId);
      if (auth.ready) {
        document.location.href = '/';
      }
    }
  }, [auth, password, username]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-5 text-4xl font-bold text-black">Log In / Register</h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <h2 className="text-black text-2xl font-bold my-2">Username: </h2>
          <input 
            type="text" 
            className="w-full border-2 border-gray-500 px-5 py-2 rounded-sm my-2" 
            placeholder="username" 
            onChange={(e) => setUsername(e.target.value)}
          />

          <h2 className="text-black text-2xl font-bold my-2">Password: </h2>
          <input 
            type="text" 
            className="w-full border-2 border-gray-500 px-5 py-2 rounded-sm my-2" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button 
            type="submit" 
            className="bg-blue-500 text-white rounded-sm shadow-md w-full my-2 py-2 transition-all duration-100 hover:bg-blue-600"
            data-button={DATA_BUTTON.LOGIN}
          >
            Log In
          </button>
          <button 
            type="submit" 
            className="bg-blue-500 text-white rounded-sm shadow-md w-full my-2 py-2 transition-all duration-100 hover:bg-blue-600"
            data-button={DATA_BUTTON.REGISTER}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
