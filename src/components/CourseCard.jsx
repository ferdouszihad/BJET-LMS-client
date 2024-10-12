const CourseCard = (props = {}) => {
  const { data } = props || {};
  const { thumbnail, courseName, description } = data;
  return (
    <div className="card bg-base-100  border h-full">
      <figure>
        <img src={thumbnail} alt="Shoes" />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">{courseName}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <button className="btn btn-sm btn-primary">Manage </button>
          <button className="btn btn-sm btn-primary">content</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
