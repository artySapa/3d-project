import React, { useState } from "react";
import axios from "axios";

const ResponseDialog = ({ postId, setDialog, title, content }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    // Perform the submission logic here
    // axios to send the comment and file to the server
    // Make sure to include the postId in the request body or URL

    // Reset the form and close the dialog
    setComment("");
    setFile(null);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        <div class="m-7">
          <div class="message">
            <p class="sender">You:</p>
            <div class="bg-gray-300 rounded-lg p-4">
              <p class="text-xl font-semibold mb-4">{content}</p>
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
