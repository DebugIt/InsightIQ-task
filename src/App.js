import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField';
import { useState } from 'react';
import Button from './components/Button';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const BASE_USER_URL = process.env.REACT_APP_USER_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/csrf-token`, { withCredentials: true });
      return response.data?.csrfToken;
    } catch (error) {
      setMessage("Failed to fetch CSRF token");
      setOpen(true);
      console.error(error);
    }
  };

  const handleAuth = async (type) => {
    const csrfToken = await fetchToken();
    if (!csrfToken) return;

    if (!username || !password) {
      setMessage("All fields are required");
      setOpen(true);
      return;
    }

    const data = { username, password };
    const endpoint = `${BASE_USER_URL}${type === "register" ? "register" : "login"}`;

    axios.post(endpoint, data, {
      headers: {
        "X-XSRF-TOKEN": csrfToken,
      },
      withCredentials: true,
    })
      .then((response) => {
        setMessage(response.data?.message || "Success");
        setOpen(true);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || error.message);
        setOpen(true);
        console.error(error);
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
      <div id="container" className="h-screen p-4 flex items-center justify-center">
        <div id="form" className="border p-4 rounded-md shadow-md hover:shadow-2xl transition-all hover:border-black w-[95%] md:w-[30%]">
          <p className="font-extrabold text-xl">
            Get Started <br />
            <span className="text-xs font-semibold">To continue further - Login/Register</span>
          </p>

          <InputField type="text" placeholder="Username" value={username} textfunc={(e) => setUsername(e.target.value)} />
          <InputField type="password" placeholder="Password" value={password} textfunc={(e) => setPassword(e.target.value)} />

          <div id="buttons" className="flex gap-1 w-full">
            <Button title="Login" clickFunction={() => handleAuth("login")} />
            <Button title="SignUp" clickFunction={() => handleAuth("register")} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
