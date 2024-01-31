import React from "react";

const CategoryForm = ({ handleSubmit, value, setvalue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={(e) => setvalue(e.target.value)}
            value={value}
            type="text"
            className="form-control"
            placeholder="Enter Category"
          />
        </div>
        <button type="submit" className="mt-2 btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
