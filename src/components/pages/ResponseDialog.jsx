import React, { useState } from "react";
import axios from "axios";

import DisplayModel from "../canvas/DisplayModel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ResponseDialog = ({ postId, setDialog, title, content, userName }) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

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
      .get(local + "/all-comments")
      .then(async (response) => {
        const allComments = response.data;
        const relativeComments = allComments.filter(
          (el) => el.postId === postId
        );
        await setComments(relativeComments);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getComments();
  }, []);
  useEffect(() => {
    getComments();
  }, [comment]);
  //   useEffect(() => {
  //     console.log(comments);
  //   }, [comments]);

  const handleSubmit = async () => {
    if (base64) {
      const formData = new FormData();
      formData.append("file", base64);
      formData.append("user", user.username);
      formData.append("postId", postId);

      try {
        setLoading(true);
        const response = await axios.post(local + "/comment/new", formData);
        setLoading(false);
        setComment("");
        setFile(null);
        getComments();
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
            <p className="sender">{userName}:</p>
            <div className="bg-gray-300 rounded-lg p-4">
              <p className="text-xl font-semibold mb-4">{content}</p>
            </div>
          </div>
          {comments.map((comment, index) => {
            console.log(comment);
            return (
              <div className="message">
                <p className="sender">{comment.user}</p>
                <DisplayModel file={comment.file}></DisplayModel>
              </div>
            );
          })}
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
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
