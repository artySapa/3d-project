import React, { useState } from "react";
import axios from "axios";

import DisplayModel from "../canvas/DisplayModel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ResponseDialog = ({ postId, setDialog, title, content }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState('');
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  const user = useSelector((state) => state.user);

  const local = "http://localhost:8080";

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const getComments = () => {
    axios
      .get(local + '/all-comments')
      .then(async (response) => {
        const allComments = response.data;
        console.log(allComments);
        const relativeComments = allComments.filter((el) => {
          if (el.postId == postId) {
            return el;
          }
        });
        await setComments(relativeComments);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    if (base64) {
      const formData = new FormData();
      formData.append("file", base64);
      formData.append("user", user.username);
      formData.append("postId", postId);

      try {
        const response = await axios.post(local + "/comment/new", formData);
        setComment("");
        setFile(null);
        console.log(response);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };



  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleFileChange = async (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    try {
      const base64Data = await convertToBase64(e.target.files[0]);
      setBase64(base64Data);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
    }
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
        {file && <DisplayModel file={file} />}
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
