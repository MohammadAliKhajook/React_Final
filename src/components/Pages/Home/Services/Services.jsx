import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      const data = await response.json();

      setServices(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="w-full mt-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-start gap-x-4 gap-y-6">
        {services.map((service) => (
          <a
            key={service.id}
            href={service.link}
            target={service.external ? "_blank" : "_self"}
            rel={service.external ? "noreferrer" : undefined}
            className="flex flex-col items-center w-20 sm:w-24 text-center"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-[52px] h-[52px] object-contain"
            />

            <span className="text-xs text-gray-700 mt-2 leading-5">
              {service.title}
            </span>
          </a>
        ))}

        <button className="flex flex-col items-center w-20 sm:w-24">
          <div className="w-[52px] h-[52px] rounded-full bg-gray-100 flex items-center justify-center">
            <FaEllipsisH className="text-gray-600 text-xl" />
          </div>

          <span className="text-xs text-gray-700 mt-2">بیشتر</span>
        </button>
      </div>
    </section>
  );
};

export default Services;
