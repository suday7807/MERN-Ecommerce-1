import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About"}>
      <div className="row contactus middle mx-auto ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            accusantium delectus fuga ab necessitatibus rem ex eaque quisquam
            maxime magni animi atque labore possimus expedita nam, doloribus
            dolorum minima molestiae illum! Quas, dignissimos quos? Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Rerum, sint!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
