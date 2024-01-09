import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth.js";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return <Layout>{JSON.stringify(auth, null, 4)}</Layout>;
};

export default HomePage;
