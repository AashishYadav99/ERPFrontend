import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddWarehouse() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [countries, setCountries] = useState([]);
  let user_data = JSON.parse(localStorage.getItem("user_data"));

  const [formData, setFormData] = useState({
    whcode: "",
    whdesc: "",
    // whlongdesc: "",
    // whnegstock: "",
    // locdesc: "",
    // itmcatdt1: "",
    // itmcatdt2: "",
    // note1: "",
    // note2: "",
    // note3: "",
    // status: "1",
    // addedby: `${user_data.firstname} ${user_data.lastname}`,
    // createddt: new Date().toLocaleString(),
  });

  const fetchcountryList = async () => {
    const response = await axios.post(true, "location/loc_list");
    console.log("response is", response);

    if (response) {
      if (response.status) {
        setCountries(response.data);
      } else {
        ToastMassage(response.message, "error");
      }
    }
  };

  useEffect(() => {
    // OrderNuberRange();
    fetchcountryList();
  }, []);

  const handleSubmit = async (event) => {
    setisSubmit(true);
    event.preventDefault();
    let errors = validation(formData);
    console.log("errors", errors);

    if (Object.keys(errors).length > 0) {
      setisSubmit(false);
      setFormError(errors);
    } else {
      setFormError({});
      const response = await axios_post(
        true,
        "warehouse_master/store",
        formData
      );
      if (response) {
        setisSubmit(false);
        if (response.status) {
          ToastMassage(response.message, "success");
          navigate("/warehouse");
        } else {
          ToastMassage(response.message, "error");
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="pt-6 pb-3">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {/* <form onSubmit={handleSubmit} method="POST" action="#"> */}
            <form method="POST" action="#">
              <div className="shadow-lg">
                <div className="bg-blue-500 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
                  <h6 className="flex items-center">
                    <span className="material-icons text-sm mr-2">
                      shopping_cart
                    </span>
                    Add Warehouse
                  </h6>
                  <Link to="/warehouse">
                    <button className="bg-gray-200 text-blue-500 py-1 px-3 rounded hover:bg-gray-300">
                      Back
                    </button>
                  </Link>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="mb-1">Warehouse Code</div>
                      <input
                        type="text"
                        name="whcode"
                        //   value={formData.whcode}
                        onChange={handleChange}
                        disabled
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <div className="mb-1">Description</div>
                      <input
                        type="text"
                        name="whdesc"
                        //   value={formData.whdesc}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                      />
                      {/* {formError.whdesc && (
                      <p className="text-red-500 text-sm mt-1">
                        {formError.whdesc}
                      </p>
                    )} */}
                    </div>
                    <div>
                      <div className="mb-1">Long Description</div>
                      <input
                        type="text"
                        name="whlongdesc"
                        //   value={formData.whlongdesc}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                      />
                      {/* {formError.whlongdesc && (
                      <p className="text-red-500 text-sm mt-1">
                        {formError.whlongdesc}
                      </p>
                    )} */}
                    </div>
                    <div>
                      <div className="mb-1">Location Name</div>
                      {/* <Select
                      name="locdesc"
                      value={formData.locdesc}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                    >
                      {countries?.map((country) => (
                        <div key={country.id} value={country?.id}>
                          {country?.locname}
                        </div>
                      ))}
                    </Select>
                    {formError.locdesc && (
                      <p className="text-red-500 text-sm mt-1">
                        {formError.locdesc}
                      </p>
                    )} */}
                    </div>
                    <div>
                      <div className="mb-1">Negative Stock Allow</div>
                      {/* <Checkbox
                      name="whnegstock"
                      checked={formData.whnegstock === "1"}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "whnegstock",
                            value: e.target.checked ? "1" : "0",
                          },
                        })
                      }
                    />
                    {formError.whnegstock && (
                      <p className="text-red-500 text-sm mt-1">
                        {formError.whnegstock}
                      </p>
                    )} */}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className={`py-2 px-4 rounded text-white ${
                        isSubmit
                          ? "bg-gray-400"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={isSubmit}
                    >
                      {isSubmit ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddWarehouse;
