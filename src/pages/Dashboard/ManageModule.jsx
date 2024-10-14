import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ModuleCollection from "../../components/ModuleCollection";
import useCourseModules from "../../hooks/useCourseModules";

const ManageModule = (props = {}) => {
  const { course } = props || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCourseModules();
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const moduleData = {
      moduleName: data.moduleTitle,
      creationDate: new Date(data.publishDateTime),
      teacher_email: user?.email,
      course_id: course._id,
      contents: [],
    };

    // Making a secure POST request to create the module
    axiosSecure
      .post(`/courses/modules/create`, moduleData)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((error) => {
        // Handling error and showing alert using Swal
        Swal.fire({
          title: "Error!",
          text: "There was an issue creating the module. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Module creation error:", error);
      })
      .finally(() => {
        setIsModalOpen(false); // Close the modal after the operation is complete
      });
  };

  // Get current date and time in a format compatible with datetime-local input
  const currentDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <div className="container mx-auto p-4">
      {/* Manage Module Title and Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Module Title</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create Module
        </button>
      </div>
      <ModuleCollection></ModuleCollection>

      {/* Modal for Creating Module */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create New Module</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Module Title Input */}
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text">Module Title</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    errors.moduleTitle && "input-error"
                  }`}
                  {...register("moduleTitle", {
                    required: "Module Title is required",
                  })}
                />
                {errors.moduleTitle && (
                  <span className="text-error">
                    {errors.moduleTitle.message}
                  </span>
                )}
              </div>

              {/* Publish DateTime Input */}
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text">Publish Date and Time</span>
                </label>
                <input
                  type="datetime-local"
                  className={`input input-bordered ${
                    errors.publishDateTime && "input-error"
                  }`}
                  defaultValue={currentDateTime}
                  {...register("publishDateTime", {
                    required: "Publish Date and Time is required",
                  })}
                />
                {errors.publishDateTime && (
                  <span className="text-error">
                    {errors.publishDateTime.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Create Module
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
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

export default ManageModule;
