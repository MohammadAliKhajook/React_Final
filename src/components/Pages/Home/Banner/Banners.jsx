import { API_URL } from "../../../../api.js";
import { useEffect, useState } from "react";

const Banners = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${API_URL}/banners`);
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
    <section className="w-full max-w-334 mx-auto mt-8 px-4 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="w-full min-h-45 2xl:min-h-60 aspect-4/3 object-cover rounded-2xl"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Banners;
