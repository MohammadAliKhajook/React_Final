import { API_URL } from "../../api.js";
import { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaBlender,
  FaLeaf,
  FaHome,
  FaPaintBrush,
  FaTshirt,
  FaGem,
  FaCar,
  FaUserCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true",
  );

  const [adminUsername, setAdminUsername] = useState(
    localStorage.getItem("adminUsername") || "مدیر",
  );

  const cart = useSelector((state) => state.cart.value);
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");

      setAdminUsername(localStorage.getItem("adminUsername") || "مدیر");
    };

    window.addEventListener("authChange", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("authChange", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUsername");

    setIsLoggedIn(false);
    setAdminUsername("مدیر");

    setOpen(false);
    setActiveId(null);

    navigate("/");
  };

  const icons = [
    FaMobileAlt,
    FaLaptop,
    FaHeadphones,
    FaBlender,
    FaLeaf,
    FaHome,
    FaPaintBrush,
    FaTshirt,
    FaGem,
    FaCar,
  ];

  return (
    <header
      className="w-full bg-white border-b border-gray-200 relative z-50"
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-xl text-gray-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/" className="shrink-0">
              <img
                src="https://www.digikala.com/brand/full-horizontal.svg"
                alt="Digikala"
                className="w-28 md:w-36"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 w-full">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                className="w-full py-3 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 hover:border-gray-400"
            >
              <FaShoppingCart className="text-xl text-gray-700" />
              <span className="hidden md:inline text-sm">سبد خرید</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 md:px-4 py-3 hover:border-gray-400 cursor-pointer"
                >
                  <FaUserCircle className="text-xl text-gray-600" />
                  <span className="hidden sm:inline text-sm font-bold">
                    {adminUsername}
                  </span>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-box z-[100] w-52 p-2 shadow-lg border border-gray-100 mt-2"
                >
                  <li>
                    <Link to="/dashboard">
                      <FaUserCircle />
                      پنل مدیریت
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout} className="text-red-500">
                      <FaSignOutAlt />
                      خروج از حساب
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 md:px-4 py-3 text-xs md:text-sm font-bold whitespace-nowrap hover:border-gray-400"
              >
                <FaUserCircle className="text-lg" />
                <span>ورود | ثبت‌نام</span>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              className="w-full py-3 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <div className="relative group">
            <button className="flex items-center gap-2 py-4 font-bold text-gray-700 hover:text-red-600">
              <FaBars />
              دسته‌بندی کالاها
            </button>

            <div className="absolute right-0 top-full hidden group-hover:flex bg-white shadow-xl border border-gray-100 rounded-b-xl w-[850px] min-h-[350px] z-50">
              <div className="w-60 border-l border-gray-100 py-3">
                {menu.map((item, index) => {
                  const Icon = icons[index % icons.length];

                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setActiveId(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-right hover:bg-gray-100 ${
                        activeId === item.id
                          ? "text-red-600 bg-gray-50"
                          : "text-gray-700"
                      }`}
                    >
                      <Icon className="text-lg" />
                      {item.title}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 p-6">
                {menu
                  .filter((item) => item.id === activeId)
                  .map((item) => (
                    <div key={item.id}>
                      <h3 className="font-bold text-red-600 mb-5">
                        {item.title}
                      </h3>

                      <div className="grid grid-cols-3 gap-6">
                        {item.columns?.map((column, index) => (
                          <div key={index}>
                            <h4 className="font-bold text-gray-800 mb-3">
                              {column.title}
                            </h4>

                            {column.groups?.map((group, groupIndex) => (
                              <div key={groupIndex} className="mb-4">
                                <p className="text-sm font-bold text-gray-600 mb-2">
                                  {group.heading}
                                </p>

                                {group.items?.map((value, itemIndex) => (
                                  <p
                                    key={itemIndex}
                                    className="text-sm text-gray-500 py-1 hover:text-red-600 cursor-pointer"
                                  >
                                    {value}
                                  </p>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <Link to="/" className="py-4 hover:text-red-600">
            صفحه اصلی
          </Link>

          <Link to="/dashboard" className="py-4 hover:text-red-600">
            مدیریت فروشگاه
          </Link>

          <Link to="/cart" className="py-4 hover:text-red-600">
            سبد خرید
          </Link>
        </nav>

        {open && (
          <div className="lg:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-3 text-sm hover:text-red-600"
              >
                صفحه اصلی
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="py-3 text-sm hover:text-red-600"
              >
                سبد خرید
              </Link>

              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm hover:text-red-600"
                >
                  پنل مدیریت
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="py-3 text-right text-sm text-red-600"
                >
                  خروج از حساب
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm hover:text-red-600"
                >
                  ورود | ثبت‌نام
                </Link>
              )}

              <div className="border-t border-gray-200 mt-2 pt-2">
                <p className="font-bold text-sm mb-2">دسته‌بندی کالاها</p>

                {menu.map((item, index) => {
                  const Icon = icons[index % icons.length];

                  return (
                    <div key={item.id}>
                      <button
                        onClick={() =>
                          setActiveId(activeId === item.id ? null : item.id)
                        }
                        className="flex items-center justify-between w-full py-3 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <Icon />
                          {item.title}
                        </span>
                        <span>{activeId === item.id ? "−" : "+"}</span>
                      </button>

                      {activeId === item.id && (
                        <div className="pr-7 pb-3">
                          {item.columns?.map((column, columnIndex) => (
                            <div key={columnIndex} className="mb-3">
                              <p className="font-bold text-sm mb-2">
                                {column.title}
                              </p>

                              {column.groups?.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                  {group.items?.map((value, itemIndex) => (
                                    <p
                                      key={itemIndex}
                                      className="text-xs text-gray-500 py-1"
                                    >
                                      {value}
                                    </p>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
