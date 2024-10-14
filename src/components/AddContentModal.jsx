import { useState } from "react";

const AddContentModal = ({ isOpen, onClose, onSubmit }) => {
  const [contentTitle, setContentTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    const [fileUrl, setFileUrl]=  useState()
    e.preventDefault();
    onSubmit({ contentTitle, file });
    onClose(); // Close modal after submission
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Add Content</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="contentTitle">
                Content Title
              </label>
              <input
                type="text"
                id="contentTitle"
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="fileInput">
                Upload File
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                className="input input-bordered w-full"
                accept=".doc,.ppt,.pdf,.mp4"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default AddContentModal;
