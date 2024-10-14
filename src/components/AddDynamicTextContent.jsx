import { useState } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";

const AddDynamicTextContent = () => {
  const { handleSubmit, reset } = useForm();
  const [dynamicText, setDynamicText] = useState("");

  const onSubmit = (data) => {
    const submissionData = { ...data, dynamicText };
    console.log("Dynamic Text Form Submitted", submissionData);
    // Handle the API call for dynamic text submission
    reset();
    setDynamicText("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control mb-4">
        <label className="label">Dynamic Text</label>
        <ReactQuill
          value={dynamicText}
          onChange={setDynamicText}
          className="textarea textarea-bordered"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Dynamic Text
      </button>
    </form>
  );
};

export default AddDynamicTextContent;
