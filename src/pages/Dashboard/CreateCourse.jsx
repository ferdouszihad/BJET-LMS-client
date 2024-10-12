import { useContext, useState } from "react";
import Title from "../../components/Title";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  //   const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();
  const enrollmentType = watch("enrollmentType", "open"); // Watching the value of enrollmentType to conditionally show email list
  const [students, setStudents] = useState([]);

  const onSubmit = async (data) => {
    let { thumbnail, ...courseData } = data;
    console.log(thumbnail, courseData);

    courseData = { ...courseData, students, teacher: [user?.email] };
    const formData = new FormData();
    formData.append("image", thumbnail[0]);
    console.log(formData);
    const res = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      courseData.thumbnail = res.data.data.display_url; // Update the courseData with the image URL
    } else {
      courseData.thumbnail =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdbgK5RvawybzSuAJuufqXz6HMdX-FoqrQw&s";
    }

    axiosSecure
      .post("/courses/create", courseData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("success", "Course created successfully", "success");
          resetField(); // Reset form fields
          setStudents([]); // Reset email list
          navigate("/");
        }
      })
      .catch(() => {
        Swal.fire("error", "Error creating course", "error happended");
      });
  };

  // Function to handle adding emails from input when space/comma is pressed
  const handleEmailInput = (e) => {
    const input = e.target.value.trim();
    const delimiter = /[\s,]+/; // Split on spaces or commas

    if (e.key === " " || e.key === ",") {
      e.preventDefault(); // Prevent adding the space/comma to the input field
      const newEmails = input.split(delimiter);

      const validEmails = newEmails.filter(
        (email) => validateEmail(email) && !students.includes(email)
      ); // Filter out invalid or duplicate emails
      if (validEmails.length > 0) {
        setStudents([...students, ...validEmails]); // Add new valid emails to the state
      }

      resetField("emailInput"); // Clear the input field
    }
  };

  // Email Validation Function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Remove email from list
  const removeEmail = (emailToRemove) => {
    setStudents(students.filter((email) => email !== emailToRemove));
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <Title>Create Course</Title>
      <div className="flex justify-center mt-10">
        <form
          className="w-full  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold mb-6">Create Course</h2>

          {/* Course Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="courseName"
            >
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              {...register("courseName", {
                required: "Course Name is required",
              })}
              className="input input-bordered w-full"
              placeholder="Enter Course Name"
            />
            {errors.courseName && (
              <span className="text-red-500 text-sm">
                {errors.courseName.message}
              </span>
            )}
          </div>

          {/* Thumbnail */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="thumbnail"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              className="file-input file-input-bordered w-full"
              accept=".jpg, .jpeg, .png"
            />
            {errors.thumbnail && (
              <span className="text-red-500 text-sm">
                {errors.thumbnail.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full"
              placeholder="Enter Course Description"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Enrollment Type */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="enrollmentType"
            >
              Enrollment Type
            </label>
            <select
              id="enrollmentType"
              {...register("enrollmentType")}
              className="select select-bordered w-full"
            >
              <option value="open">Open</option>
              <option value="secured">Secured</option>
            </select>
          </div>

          {/* Conditional Email List (Shown when enrollment type is 'secured') */}
          {enrollmentType === "secured" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="emailList"
              >
                Email List
              </label>

              {/* Display Emails */}
              <div className="mb-2">
                {students.map((email, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-primary mr-2"
                  >
                    {email}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => removeEmail(email)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              {/* Input to add emails */}
              <input
                type="text"
                id="emailInput"
                {...register("emailInput")}
                className="input input-bordered w-full"
                placeholder="Enter emails separated by space/comma"
                onKeyDown={handleEmailInput}
              />
            </div>
          )}

          {/* Publish Course Button */}
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary">
              Publish Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
