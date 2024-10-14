import { useForm } from "react-hook-form";

const AddLiveClassContent = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Live Class Form Submitted", data);
    // Handle the API call for live class submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control mb-4">
        <label className="label">Zoom Link</label>
        <input
          type="text"
          className="input input-bordered"
          placeholder="Enter Zoom link"
          {...register("zoomLink", { required: true })}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">Pass Code</label>
        <input
          type="text"
          className="input input-bordered"
          placeholder="Enter pass code"
          {...register("passCode", { required: true })}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">Meeting Code</label>
        <input
          type="text"
          className="input input-bordered"
          placeholder="Enter meeting code"
          {...register("meetingCode", { required: true })}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">Time</label>
        <input
          type="datetime-local"
          className="input input-bordered"
          {...register("time", { required: true })}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Live Class
      </button>
    </form>
  );
};

export default AddLiveClassContent;
