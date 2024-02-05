import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Product = () => {
  const [produts, setProduts] = useState([]);

  //getall Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/produts/get-product");
      if (data.success) {
        console.log(data.products);
        setProduts(data.products);
      } else {
        toast.error("Something went wrong while getting alll the products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting all Products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row container-fluid m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All products List</h1>
          <div className="d-flex">
            {produts.map((p) => (
              <Link
                className="product-link"
                to={`/dashboard/admin/products/${p.slug}`}
                key={p._id}
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`/api/v1/produts/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
