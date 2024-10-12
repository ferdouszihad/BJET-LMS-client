import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CourseInfo = (props = {}) => {
  const { course, refetch } = props || {};
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(course.thumbnail);
  const [newImage, setNewImage] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      courseName: course.courseName,
      description: course.description,
      enrollmentType: course.enrollmentType,
      status: course.status,
    },
  });

  // Open the modal and reset the form with current course info
  const handleOpenModal = () => {
    reset({
      courseName: course.courseName,
      description: course.description,
      enrollmentType: course.enrollmentType,
      status: course.status,
    });
    setShowModal(true);
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
    setNewImage(file);
    setShowSaveButton(true);
  };

  // Save the new image to ImageBB
  const handleSaveImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      const response = await axios.post(image_hosting_api, formData);

      if (response.data.success) {
        const imageUrl = response.data.data.display_url;

        // Call the API to update the course image
        const result = await axiosSecure.put(
          `/courses/update-thumbnail/${course._id}`,
          {
            thumbnail: imageUrl,
          }
        );
        console.log(result);
        if (result.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Image Updated",
            text: "The course image has been successfully updated!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error Occurred",
            text: "Unable to update the image. Please try again later.",
          });
        }
        refetch();

        setShowSaveButton(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: "Unable to update the image. Please try again later.",
      });
    }
  };

  // Handle Form Submit for Course Info Update
  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.put(
        `/courses/update/${course._id}`,
        data
      );

      if (response.data.modifiedCount > 0) {
        refetch();
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "Course Updated",
          text: "The course information has been successfully updated!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Course could not be updated. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="p-4">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={previewImage}
          alt="Course Cover"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute bottom-2 right-2 space-x-4">
          <label className="btn btn-primary">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            Change Image
          </label>
          {showSaveButton && (
            <button
              className="btn btn-secondary mt-4"
              onClick={handleSaveImage}
            >
              Save Image
            </button>
          )}
        </div>
      </div>

      {/* Save Button */}

      {/* Course Info */}
      <div className="space-y-4 p-2">
        <p>
          <strong>Course Name:</strong> {course.courseName}
        </p>
        <p>
          {" "}
          <strong>Desciption:</strong> {course.description}
        </p>
        <p>
          <strong>Enrollment Type:</strong> {course.enrollmentType}
        </p>
        <p>
          <strong>Course Status:</strong> {course.status}
        </p>

        {/* Update Info Button */}
        <button className="btn btn-primary mt-4" onClick={handleOpenModal}>
          Update Course Info
        </button>
      </div>

      {/* Modal for Updating Course Info */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Course Information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("courseName", { required: true })}
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>

              {/* Description */}
              <div className="form-control mt-2">
                <label className="label">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered"
                />
                {errors.description && (
                  <span className="text-red-500">Description is required</span>
                )}
              </div>

              {/* Enrollment Type */}
              <div className="form-control mt-2">
                <label className="label">Enrollment Type</label>
                <select
                  {...register("enrollmentType", { required: true })}
                  className="select select-bordered"
                >
                  <option value="open">Open</option>
                  <option value="secured">Secured</option>
                </select>
                {errors.enrollment_type && (
                  <span className="text-red-500">
                    Enrollment type is required
                  </span>
                )}
              </div>

              {/* Course Status */}
              <div className="form-control mt-2">
                <label className="label">Course Status</label>
                <select
                  {...register("status", { required: true })}
                  className="select select-bordered"
                >
                  <option value="archive">Archive</option>
                  <option value="publish">Publish</option>
                </select>
                {errors.course_status && (
                  <span className="text-red-500">Status is required</span>
                )}
              </div>

              {/* Modal Action */}
              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Update
                </button>
                <button
                  className="btn"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInfo;
