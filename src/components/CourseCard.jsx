import { RiSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CourseCard = (props = {}) => {
  const { data } = props || {};
  const { thumbnail, courseName, description, _id } = data;
  return (
    <div className="card bg-base-100  border h-full">
      <figure>
        <img className="w-full" src={thumbnail} alt="Shoes" />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">{courseName}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <Link to={`/manage-course/${_id}`} className="btn btn-sm btn-primary">
            <RiSettingsFill></RiSettingsFill> Jump-In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
