import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import a rich text editor like React-Quill
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Title from "../../components/Title";

const CreateModule = () => {
  const [dynamicText, setDynamicText] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [moduleType, setModuleType] = useState("");
  const [file, setFile] = useState(null);

  const [publishLaterDate, setPublishLaterDate] = useState(""); // New state to track publish later date
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]); // Append the file

    // Use XMLHttpRequest to track file upload progress
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${import.meta.env.VITE_BASE_URL}upload/file`, true); // API route for uploading

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100); // Calculate percentage
        setUploadPercentage(percentComplete); // Update progress state
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("File and content uploaded successfully");
        setUploadPercentage(0); // Reset progress bar after completion
      } else {
        console.error("Upload failed");
      }
    };

    xhr.send(formData); // Send form data to the server
  };

  const handleFileUpload = (e) => () => {};

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("moduleName", data.moduleName);
    formData.append("moduleDescription", data.moduleDescription);
    formData.append("moduleType", moduleType);

    if (moduleType === "video" || moduleType === "slide") {
      if (file) formData.append("file", file);
    }

    if (moduleType === "live") {
      formData.append("zoomLink", data.zoomLink);
      formData.append("passCode", data.passCode);
      formData.append("meetingCode", data.meetingCode);
      formData.append("time", data.time);
    }

    if (moduleType === "dynamic") {
      formData.append("dynamicContent", dynamicText);
      // Store rich text content
    }

    console.log(dynamicText);

    setIsModalOpen(false);

    // Handling publish mode

    // try {
    //   const response = await axiosSecure.post("/api/modules/create", formData);

    //   if (response.data.success) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Module Created",
    //       text: "The module has been successfully created!",
    //     });
    //     reset();
    //     setIsModalOpen(false); // Close the modal after successful submission
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error Occurred",
    //     text: "Something went wrong. Please try again later.",
    //   });
    // }
  };

  const handlePublishNowClick = () => {
    setIsModalOpen(true); // Open the modal when "Publish Now" is clicked
  };

  return (
    <div className="p-4">
      <Title>Create New Module</Title>
      {uploadPercentage > 0 && (
        <progress
          className="progress progress-secondary "
          value={uploadPercentage}
          max="100"
        ></progress>
      )}

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Module Name */}
        <div className="form-control mb-4">
          <label className="label">Module Name</label>
          <input
            type="text"
            {...register("moduleName", { required: true })}
            className="input input-bordered"
            placeholder="Enter module name"
          />
          {errors.moduleName && (
            <span className="text-red-500">Module name is required</span>
          )}
        </div>

        {/* Module Description */}
        <div className="form-control mb-4">
          <label className="label">Module Description</label>
          <textarea
            {...register("moduleDescription", { required: true })}
            className="textarea textarea-bordered"
            placeholder="Enter module description"
          />
          {errors.moduleDescription && (
            <span className="text-red-500">Module description is required</span>
          )}
        </div>

        {/* Module Type Selection */}
        <div className="form-control mb-4">
          <label className="label">Module Type</label>
          <select
            {...register("moduleType", { required: true })}
            className="select select-bordered"
            onChange={(e) => setModuleType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="video">Video</option>
            <option value="slide">Slide</option>
            <option value="live">Live Class</option>
            <option value="dynamic">Dynamic Text</option>
          </select>
          {errors.moduleType && (
            <span className="text-red-500">Module type is required</span>
          )}
        </div>

        {/* Conditional Fields Based on Module Type */}
        {(moduleType === "video" || moduleType === "slide") && (
          <div className="form-control mb-4">
            <label className="label">
              Upload {moduleType === "video" ? "Video" : "Slide"}
            </label>
            <input
              type="file"
              className="file-input file-input-bordered"
              accept={moduleType === "video" ? "video/*" : "application/pdf"}
              onChange={handleFileChange}
            />
          </div>
        )}

        {moduleType === "live" && (
          <>
            <div className="form-control mb-4">
              <label className="label">Zoom Link</label>
              <input
                type="text"
                {...register("zoomLink", { required: true })}
                className="input input-bordered"
                placeholder="Enter Zoom link"
              />
              {errors.zoomLink && (
                <span className="text-red-500">Zoom link is required</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Pass Code</label>
              <input
                type="text"
                {...register("passCode", { required: true })}
                className="input input-bordered"
                placeholder="Enter pass code"
              />
              {errors.passCode && (
                <span className="text-red-500">Pass code is required</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Meeting Code</label>
              <input
                type="text"
                {...register("meetingCode", { required: true })}
                className="input input-bordered"
                placeholder="Enter meeting code"
              />
              {errors.meetingCode && (
                <span className="text-red-500">Meeting code is required</span>
              )}
            </div>

            <div className="form-control mb-4">
              <label className="label">Time</label>
              <input
                type="datetime-local"
                {...register("time", { required: true })}
                className="input input-bordered"
              />
              {errors.time && (
                <span className="text-red-500">Time is required</span>
              )}
            </div>
          </>
        )}

        {moduleType === "dynamic" && (
          <ReactQuill
            theme="snow"
            value={dynamicText}
            onChange={(content) => setDynamicText(content)}
            className="textarea textarea-bordered"
            placeholder="Enter dynamic text here..."
          />
        )}

        {/* Publish Now and Publish Later */}
        <div className="mt-4 flex gap-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePublishNowClick}
          >
            Publish Now
          </button>
        </div>

        {/* Show date-time picker when 'Publish Later' is selected */}
      </form>

      {/* Modal for Publish Now confirmation */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Publish Now</h2>
            <p>Please confirm the publish date and time.</p>
            <p className="text-sm text-red-600">Publish Time is Required</p>
            <input
              type="datetime-local"
              required
              className="input input-bordered mt-4"
              onChange={(e) => setPublishLaterDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)} // Ensures only future dates can be selected
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  if (publishLaterDate.length != 0) {
                    setIsModalOpen(false);
                    handleSubmit(onSubmit)();
                  } // Close the modal
                  // Submit the form
                }}
              >
                Publish
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModule;
