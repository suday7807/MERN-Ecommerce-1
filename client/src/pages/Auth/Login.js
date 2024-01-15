import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
