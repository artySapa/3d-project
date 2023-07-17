import React, { useState } from "react";
import axios from "axios";

const ResponseDialog = ({ postId, setDialog }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    // Perform the submission logic here
    // axios to send the comment and file to the server
    // Make sure to include the postId in the request body or URL

    // Reset the form and close the dialog
    setComment("");
    setFile(null);
    setDialog(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Respond</h2>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="px-4 py-2 ml-4 bg-gray-300 rounded"
            onClick={() => {setDialog(false)}}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseDialog;
