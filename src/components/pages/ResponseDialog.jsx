import React, { useState } from "react";
import axios from "axios";

import DisplayModel from "../canvas/DisplayModel";
import { useSelector } from "react-redux";

const ResponseDialog = ({ postId, setDialog, title, content }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user);

  const handleSubmit = async () => { // makes response 
    // Create a FormData object to send the STL file
    const formData = new FormData();
    formData.append("stlFile", file); // Use "stlFile" key instead of "file"
    formData.append('user', user.username);
    formData.append('id', postId);
  
    try {
      // Make a POST request to upload the STL file to the backend
      await axios.post("/comment/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Reset form fields after successful submission
      setComment("");
      setFile(null);
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error("Error uploading file:", error);
    }
  };
  

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 text-black">
      <div className="bg-main rounded shadow-lg p-[50px]">
        <div className="justify-end flex">
        <button
          onClick={() => {
            setDialog(false);
          }}
        >
          <svg
            className="h-7 w-7 text-black"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="18" y1="6" x2="6" y2="18" />{" "}
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        </div>
        <h2 className="text-3xl align-center text-center font-semibold mb-4">
          {title}
        </h2>
        <div className="m-7">
          <div className="message">
            <p className="sender">You:</p>
            <div className="bg-gray-300 rounded-lg p-4">
              <p className="text-xl font-semibold mb-4">{content}</p>
            </div>
          </div>
        </div>
        <textarea
          className="w-full p-4 mb-4 border border-gray-300 rounded text-white"
          placeholder="Enter your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {file && <DisplayModel file={file}/>}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 ml-4 bg-gray-300 rounded"
            onClick={() => {
              setDialog(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseDialog;