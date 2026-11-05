import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="w-full max-w-334 mx-auto mt-10 px-4">
      <div className="w-full mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center lg:text-right">
          دسته‌بندی‌ها
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-y-8 gap-x-4">
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.link}
            className="flex flex-col items-center justify-start gap-2 group"
          >
            <div className="w-22.5 h-22.5 sm:w-25 sm:h-25 flex items-center justify-center">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="text-xs sm:text-sm text-gray-800 text-center leading-6 h-10 line-clamp-2">
              {category.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories;
