import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DisplayModel from "../canvas/DisplayModel";
import { useSelector } from "react-redux";

const ResponseDialog = ({ postId, setDialog, title, content, userName }) => {
  const fileInputRef = useRef(null);
  const dialogRef = useRef(null); // Ref for the dialog content
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDragIndicator, setShowDragIndicator] = useState(true);

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
      .then((response) => {
        const allComments = response.data;
        const relativeComments = allComments.filter(
          (el) => el.postId === postId
        );
        setComments(relativeComments);
      })
      .catch((error) => console.log("ERROR", error))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async () => {
    if (base64 || comment.trim() !== "") {
      const formData = new FormData();
      formData.append("file", base64);
      formData.append("user", user.username);
      formData.append("postId", postId);
      formData.append("comment", comment);

      try {
        setLoading(true);
        await axios.post(local + "/comment/new", formData);
        setComment("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        setFile(null);
        setBase64("");
        getComments();
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
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

  const handleModelInteraction = () => {
    setShowDragIndicator(false);
  };

  // Handle closing the dialog when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDialog]);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 text-black">
      <div
        ref={dialogRef} // Attach ref to the dialog content
        className="bg-main rounded shadow-lg w-full max-w-[90%] md:max-w-[800px] h-[90%] md:h-[900px] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 md:p-[20px] flex justify-between items-center border-b">
          <h2 className="text-lg md:text-2xl font-semibold">{title}</h2>
          <button
            onClick={() => setDialog(false)}
            className="text-black hover:text-red-500"
          >
            <svg
              className="h-6 w-6 md:h-7 md:w-7"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-grow overflow-y-auto p-4 md:p-[20px] h-[calc(100%-150px)]">
          <div className="message mb-4">
            <p className="sender">{userName}:</p>
            <div className="bg-gray-300 rounded-lg p-2 md:p-4">
              <p className="text-sm md:text-xl font-semibold mb-4">{content}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-full">
              {/* Loading Spinner */}
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 md:w-8 md:h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                className="message mb-4 p-2 md:p-4 bg-white shadow-lg rounded-lg border border-gray-300 w-full"
                key={index}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm md:text-lg font-semibold text-gray-700">
                    {comment.user}
                  </p>
                  {comment.file && (
                    <a
                      href={comment.file}
                      download={`file_${index}.stl`}
                      className="text-blue-500 hover:underline"
                    >
                      Download model
                    </a>
                  )}
                </div>
                <div className="bg-gray-100 p-2 md:p-4 rounded-md mb-4">
                  {comment.comment}
                </div>
                {comment.file && (
                  <div className="flex justify-center relative">
                    {showDragIndicator && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-50">
                        Drag to rotate
                      </div>
                    )}
                    <DisplayModel
                      file={comment.file}
                      onMouseDown={handleModelInteraction}
                      onTouchStart={handleModelInteraction}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Comment Input Section (fixed at the bottom) */}
        {user.username && (
          <div
            className={`p-4 md:p-[20px] border-t flex text-white flex-col bg-main sticky bottom-0 left-0 right-0 w-full ${
              file ? "h-[100%]" : "h-[30%]"
            }`}
          >
            <textarea
              className="w-full p-2 md:p-3 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-3"
              ref={fileInputRef}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {file && (
              <div className="m-2 max-w-[40%]">
                <DisplayModel file={file} size="small" />
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="px-4 py-4 md:px-6 md:py-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center whitespace-nowrap overflow-hidden"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="px-4 py-4 md:px-6 md:py-4 ml-4 bg-gray-300 rounded hover:bg-gray-400 transition text-center whitespace-nowrap overflow-hidden"
                onClick={() => setDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseDialog;
