import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTemplates, setActiveTemplate } from "@/features/templateSlice";
import { FaCog } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const templates = useSelector(selectTemplates);
  const activeTemplate = useSelector((state) => state.templates.activeTemplate);

  const handleTemplateChange = (event) => {
    const selectedTemplateId = event.target.value;
    dispatch(setActiveTemplate(selectedTemplateId));
  };

  return (
    <nav className="">
      <div className="flex items-center justify-between px-4 pt-4 mx-auto ">
        <Link to="/">
          <span className="text-2xl font-bold text-black">FosterHealth</span>
        </Link>

        <div className="flex items-center space-x-4">
          <select
            value={activeTemplate || templates[0]?.id || ""}
            onChange={handleTemplateChange}
            className="p-2 bg-gray-100 rounded"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
          <Link to="/settings">
            <button className="text-white hover:text-gray-200">
              <FaCog size={24} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
