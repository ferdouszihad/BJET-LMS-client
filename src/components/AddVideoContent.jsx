import { useForm } from "react-hook-form";
import { useState } from "react";

const AddVideoContent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [fileUrl, setFileUrl] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${import.meta.env.VITE_BASE_URL}upload/file`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadPercentage(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        setFileUrl(res.fileUrl);
        setUploadPercentage(0);
      }
    };

    xhr.send(formData);
  };

  const onSubmit = (data) => {
    console.log("Video Form Submitted", data);
    // Handle the API call for video submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control mb-4">
        <label className="label">Upload Video</label>
        {fileUrl ? (
          <video autoPlay controls className="w-full" src={fileUrl}></video>
        ) : (
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="file-input"
            required
          />
        )}
        {uploadPercentage > 0 && (
          <div>
            <progress
              className="progress"
              value={uploadPercentage}
              max="100"
            ></progress>
          </div>
        )}
        <input
          type="text"
          className="input input-bordered my-2"
          placeholder="Enter Content Title"
          {...register("contentTitle", { required: true })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Video
      </button>
    </form>
  );
};

export default AddVideoContent;
