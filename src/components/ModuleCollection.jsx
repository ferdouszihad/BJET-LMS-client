import { Link } from "react-router-dom";
import useCourseModules from "../hooks/useCourseModules";
import { useState } from "react";

const ModuleCollection = () => {
  const { modules } = useCourseModules();
  const [openIndex, setOpenIndex] = useState(null); // Track the index of the open accordion
  // Track Add Live Class modal state

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the selected index
  };

  return (
    <div className="container mx-auto p-4">
      {modules.map((module, index) => (
        <div key={module._id} className="mb-4 border rounded-lg shadow">
          <div
            className="accordion-header flex justify-between items-center p-4 cursor-pointer bg-gray-200"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="font-semibold text-lg">
              {index + 1}. {module.moduleName}
            </h3>
            <span className="text-lg">{openIndex === index ? "-" : "+"}</span>
          </div>
          {openIndex === index && (
            <div className="accordion-body p-4 bg-white">
              {module.content && module.content.length > 0 ? (
                <ul>
                  {module.content.map((item, idx) => (
                    <li key={idx} className="py-2">
                      {item}
                    </li> // Adjust this according to your content structure
                  ))}
                </ul>
              ) : (
                <div>
                  <p className="text-gray-500">No content available.</p>

                  <div className="border-t space-x-5">
                    <Link
                      to={`/module/create-content/${module._id}`}
                      className="btn btn-primary"
                    >
                      Add Content
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleCollection;
