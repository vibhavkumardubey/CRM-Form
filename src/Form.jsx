import axios from "axios";
import { useState } from "react";
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      number,
    };
    axios
      .post(`http://46.202.164.93:5005/api/common/manual-leads`, payload)
      .then((result) => {
        console.log(result);
        alert("Data submitted Successfully!!!");
      })
      .catch((error) => {
        console.log(error);
        alert("Error while submitting data");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-md:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md  w-full border-t-4 border-orange-500"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Enquiry
        </h2>

        <div className="mb-6">
          <div className="flex justify-start">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name:
            </label>
          </div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-start">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email:
            </label>
          </div>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-start">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Number:
            </label>
          </div>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            placeholder="Enter your number"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-700 hover:bg-gradient-to-l"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
