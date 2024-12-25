import React, { useEffect } from "react";
import constantApi from "../constantApi";
import axios from "axios";

function Test() {
  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => {
        console.log("response is from module master ", res.data.data);
      })
      .catch((err) => {
        console.error("Error is ", err);
      });
  }, []);

  return (
    <>
      <h1>ashish</h1>
    </>
  );
}

export default Test;
