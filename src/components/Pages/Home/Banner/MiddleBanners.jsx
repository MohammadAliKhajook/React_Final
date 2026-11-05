import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";

const MiddleBanners = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_URL}/middleBanners`);
      const data = await response.json();

      setBanners(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className="w-full max-w-334 mx-auto mt-6 px-4 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <a
            key={banner.id}
            href={banner.link}
            target="_blank"
            rel="noreferrer"
            className="block w-full overflow-hidden rounded-2xl"
          >
            <img
              src={banner.image}
              alt={banner.title}
              title={banner.title}
              className="w-full aspect-5/2 min-h-45 2xl:min-h-60 object-cover rounded-2xl"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default MiddleBanners;
