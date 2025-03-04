import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const { tagName } = useParams();
  const token = localStorage.getItem("token");
  const [singleFormData, setSingleFormData] = useState();
  const [responses, setResponses] = useState([]);

  const API_BASE_URL = 'http://192.168.1.12:7000/api';

  console.log("token --->", token);


  useEffect(() => {
    if (tagName) {
      getSingleFormData(tagName);
    }
  }, [tagName]);

  useEffect(() => {
    if (singleFormData) {
      setResponses(singleFormData.fields
        .filter(field => field.type !== "button") // Exclude buttons from responses
        .map(field => ({ label: field.label, value: "" }))
      );
    }
  }, [singleFormData]);

  // Handle input change
  const handleChange = (e, field) => {
    const { value } = e.target;
    setResponses(prev => prev.map(resp => resp.label === field.label ? { ...resp, value } : resp));
  };



  const getSingleFormData = (tagName) => {

    if (!tagName) {
      console.error("Invalid form ID:", tagName);
      return;
    }

    axios
      .get(`${API_BASE_URL}/user/form/${tagName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("Full API Response:", result);
        console.log("Fetched Form Data:", result?.data?.data);
        setSingleFormData(result?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        if (error.response) {
          console.error("Server Response:", error.response.data);
        }
      });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      tagName: singleFormData?.tagName || "",
      responses,
    };

    try {
      await axios.post(`${API_BASE_URL}/user/responses`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Form submitted successfully");
      setResponses(singleFormData.fields.map(field => ({ label: field.label, value: "" })));
    } catch (error) {
      console.log(error);
      alert("Failed to submit form");
    }
  };



  if (!singleFormData) {
    return <p className="text-center mt-4">Loading form details...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen max-md:px-4 mt-6">
      <form onSubmit={handleSubmit}  className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-t-4 border-orange-500 max-h-[80vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">{singleFormData.formName}</h2>

        {singleFormData.fields.map((field) => (
          <div key={field._id} className="mt-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">{field.type === "button" ? "" : `${field.label}`}</label>

            {["text", "email", "number"].includes(field.type) ? (
              <input
                type={field.type}
                value={responses.find(resp => resp.label === field.label)?.value || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
                placeholder={field.label}
              />
            ) : field.type === "radio" ? (
              <div className="flex gap-4">
                {field.options.map((option) => (
                  <label key={option._id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={field.label}
                      value={option.value}
                      checked={responses.find(resp => resp.label === field.label)?.value === option.value}
                      onChange={(e) => handleChange(e, field)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : field.type === "select" ? (
              <select
                value={responses.find(resp => resp.label === field.label)?.value || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
              >
                {field.options.map((option) => (
                  <option key={option._id} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : field.type === "date" || field.type === "time" || field.type === "file" ? (
              <input
                type={field.type}
                value={responses.find(resp => resp.label === field.label)?.value || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
              />
            ) : field.type === "button" ? (
              <button
                type="submit"
                className="w-full text-white py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-700 hover:bg-gradient-to-l"
              >
                {field.label}
              </button>
            ) : null}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Form;












// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [number, setNumber] = useState("");
// const { id } = useParams()

// console.log(id);


// const handleSubmit = (e) => {
//   e.preventDefault();
//   const payload = {
//     name,
//     email,
//     number,
//   };
//   axios
//     .post(`http://46.202.164.93:5005/api/common/manual-leads`, payload)
//     .then((result) => {
//       console.log(result);
//       alert("Data submitted Successfully!!!");
//     })
//     .catch((error) => {
//       console.log(error);
//       alert("Error while submitting data");
//     });
// };
