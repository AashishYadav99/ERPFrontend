import React, { useState } from "react";
import CompanyAddress from "./CompanyAddress";
import constantApi from "../../constantApi";
import axios from "axios";
import CompanyBankForm from "./CompanyBankForm";
import CompanyDetail from "./CompanyDetail";
import CompanyLocation from "./CompanyLocation";

const ParentComponent = () => {
  const [formData, setFormData] = useState({
    compdesc: "",
    clogo: "",
    ccountry: "",
    compcode: "",
    itemdesclong: "",
    note1: "",
    note2: "",
    note3: "",
    ccompany: "",
    ccurrency: "",
    clicense: "",
    ctaxnumber: "",
    itmcatdt1: "",
    itmcatdt2: "",
    status: 1,
    addedby: 1,
    locations: [
      {
        company_id: "1",
        branch_name: "",
        address: "",
        currency_id: "",
      },
    ],
    banks: [
      {
        country_id: 1,
        bank_account_number: "",
        branch_name: "",
        beneficiary_name: "",
        contact_name: "",
        contact_no: "",
        email: "",
        address: "",
        paying_bank: "",

        currency_id: 1,
        postal_code: 123456,
        iban_no: "iban 1",
        fax_no: 1234567890,
        landline_no: 1234567890,
        toll_free_number: 1234567890,
        other_number_2: 9876543210,
        other_number_3: 9876543211,
        other_email_2: "test1@gmail.com",
        other_email_3: "test2@gamil.com",
        default_bank: 1,
      },
    ],
    address: [
      {
        company_id: 1,
        address_name: "",
        address: "",
        postal_code: "",
        country_id: "",
        city_id: 1,
        emirates_id: 1,
        contact_no: "",
        email: "ashish@gmail.com",
        contact_name: "",
        fax_no: "",
        landline_no: "",
        toll_free_number: "",
        other_number_2: 2222222,
        other_number_3: 22222222,
        other_email_2: "ashish@gmail.com",
        other_email_3: "ashish@gmail.com",
        default_address: false,
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try {
      const response = await axios.post(
        `${constantApi.baseUrl}/company/store`,
        formData
      );
      alert("Company added successfully!");
      navigation("/company");
      console.log(response.data);
    } catch (error) {
      alert("Error adding company. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {/* Test1 Component */}
        <CompanyDetail
          compdesc={formData.compdesc}
          // clogo= {formData.clogo},
          ccountry={formData.ccountry}
          compcode={formData.compcode}
          ccompany={formData.ccompany}
          ccurrency={formData.ccurrency}
          clicense={formData.clicense}
          ctaxnumber={formData.ctaxnumber}
          itmcatdt1={formData.itmcatdt1}
          itmcatdt2={formData.itmcatdt2}
          clogo={formData.clogo}
          setFormData={setFormData}
        />

        <CompanyAddress address={formData.address} setFormData={setFormData} />

        <CompanyBankForm banks={formData.banks} setFormData={setFormData} />

        <CompanyLocation
          locations={formData.locations}
          setFormData={setFormData}
        />
        <div className="flex justify-center items-center ">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentComponent;
