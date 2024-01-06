import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className=" notfound">
        <h1>404</h1>
        <p>Opps ! Page not Found</p>
        <Link className=" notfoundlink">Go back</Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
