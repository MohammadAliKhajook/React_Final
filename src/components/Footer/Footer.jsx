import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaChevronUp,
  FaChevronLeft,
  FaHeadset,
  FaTruck,
  FaCreditCard,
  FaUndo,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

const features = [
  {
    title: "امکان تحویل اکسپرس",
    icon: <FaTruck />,
  },
  {
    title: "امکان پرداخت در محل",
    icon: <FaCreditCard />,
  },
  {
    title: "۷ روز هفته، ۲۴ ساعته",
    icon: <FaHeadset />,
  },
  {
    title: "هفت روز ضمانت بازگشت کالا",
    icon: <FaUndo />,
  },
  {
    title: "ضمانت اصل بودن کالا",
    icon: <FaShieldAlt />,
  },
];

const footerGroups = [
  {
    title: "با فروشگاه",
    links: [
      "اتاق خبر",
      "فروش در فروشگاه",
      "فرصت‌های شغلی",
      "گزارش تخلف",
      "تماس با ما",
      "درباره ما",
    ],
    urls: ["/news", "/seller", "/careers", "/report", "/contact", "/about"],
  },
  {
    title: "خدمات مشتریان",
    links: [
      "پاسخ به پرسش‌های متداول",
      "رویه‌های بازگرداندن کالا",
      "شرایط استفاده",
      "حریم خصوصی",
      "گزارش باگ",
    ],
    urls: ["/faq", "/returns", "/terms", "/privacy", "/report-bug"],
  },
  {
    title: "راهنمای خرید",
    links: ["نحوه ثبت سفارش", "رویه ارسال سفارش", "شیوه‌های پرداخت"],
    urls: ["/order-guide", "/shipping", "/payment"],
  },
];

const partnerLogos = [
  { name: "مجله اینترنتی", image: "/statics/img/svg/footer/digimag.svg" },
  { name: "دیجی‌پی", image: "/statics/img/svg/footer/digipay.svg" },
  { name: "دیجی‌استایل", image: "/statics/img/svg/footer/digistyle.svg" },
  { name: "دیجی‌پلاس", image: "/statics/img/svg/footer/digiplus.svg" },
  { name: "دیجی‌کلاب", image: "/statics/img/svg/footer/digiclub.svg" },
  { name: "دیجی‌جت", image: "/statics/img/svg/footer/jet.svg" },
  { name: "دیجی‌کالا ادز", image: "/statics/img/svg/footer/digikala-ads.svg" },
  { name: "دیجی‌مهر", image: "/statics/img/svg/footer/digiMehr.svg" },
  { name: "دیجی‌نکست", image: "/statics/img/svg/footer/diginext.svg" },
  { name: "دیجی‌اکسپرس", image: "/statics/img/svg/footer/digiexpress.svg" },
  { name: "گنجه", image: "/statics/img/svg/footer/ganjeh.svg" },
  { name: "دیجی‌فای", image: "/statics/img/svg/footer/digify.svg" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showMore, setShowMore] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setEmail("");
  };

  return (
    <footer dir="rtl" className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center py-6">
          <Link to="/">
            <img
              src="/brand/full-horizontal.svg"
              alt="فروشگاه"
              className="w-[150px] md:w-[195px]"
            />
          </Link>

          <button
            onClick={goToTop}
            className="btn btn-outline btn-sm border-gray-300 text-gray-600"
          >
            بازگشت به بالا
            <FaChevronUp />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8">
          <p>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
          <span className="hidden md:block text-gray-300">|</span>
          <p>۰۲۱-۹۱۰۰۰۱۰۰</p>
          <span className="hidden md:block text-gray-300">|</span>
          <p>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
        </div>

        <div className="hidden lg:flex justify-between items-center gap-5 my-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-center flex-1"
            >
              <div className="text-4xl text-gray-500">{feature.icon}</div>

              <span className="text-xs text-gray-600">{feature.title}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {footerGroups.map((group, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-800 mb-4">{group.title}</h3>

              <ul className="space-y-4">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={group.urls[i]}
                      className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-gray-800 mb-4">همراه ما باشید!</h3>

            <div className="flex items-center gap-5 text-2xl text-gray-500 mb-8">
              <a
                href="https://www.instagram.com/digikalacom/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com/digikalacom"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.linkedin.com/company/digikala/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

              <a href="https://t.me/" target="_blank" rel="noreferrer">
                <FaTelegram />
              </a>
            </div>

            <h3 className="font-bold text-gray-800 mb-3">
              از تخفیف‌های جدید باخبر شوید
            </h3>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل شما"
                className="input input-bordered input-sm w-full"
                required
              />

              <button type="submit" className="btn btn-primary btn-sm">
                ثبت
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#3c4b6d] rounded-xl p-5 flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">
          <div className="flex items-center gap-3 text-white">
            <div className="text-4xl">📱</div>
            <h3 className="font-bold text-lg">دانلود اپلیکیشن فروشگاه</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="btn btn-sm bg-white text-gray-700 border-0">
              کافه بازار
            </a>

            <a href="#" className="btn btn-sm bg-white text-gray-700 border-0">
              مایکت
            </a>

            <a href="#" className="btn btn-sm bg-white text-gray-700 border-0">
              نسخه اندروید
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-8 py-8 border-t border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-700 mb-4">
              فروشگاه اینترنتی؛ خرید آسان و مطمئن
            </h2>

            <div
              className={`text-sm text-gray-500 leading-8 ${showMore ? "" : "line-clamp-4"}`}
            >
              <p>
                فروشگاه اینترنتی ما با ارائه تنوع گسترده‌ای از محصولات، تجربه‌ای
                آسان و مطمئن برای خرید آنلاین فراهم می‌کند. شما می‌توانید
                محصولات مورد نیاز خود را بررسی کنید، مشخصات آن‌ها را مقایسه کنید
                و سفارش خود را به‌راحتی ثبت کنید.
              </p>

              <p className="mt-3">
                پشتیبانی مناسب، ارسال سریع، امکان بازگشت کالا و ارائه محصولات
                متنوع از ویژگی‌های فروشگاه ما است. هدف ما فراهم کردن تجربه‌ای
                رضایت‌بخش برای مشتریان است.
              </p>
            </div>

            <button
              onClick={() => setShowMore(!showMore)}
              className="text-sm text-blue-600 mt-3 flex items-center gap-2"
            >
              {showMore ? "مشاهده کمتر" : "مشاهده بیشتر"}
              <FaChevronLeft />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap lg:w-[300px]">
            <div className="w-[85px] h-[85px] border rounded-lg flex items-center justify-center text-xs text-gray-500">
              نشان اعتماد
            </div>

            <div className="w-[85px] h-[85px] border rounded-lg flex items-center justify-center text-xs text-gray-500">
              نماد کسب‌وکار
            </div>

            <div className="w-[85px] h-[85px] border rounded-lg flex items-center justify-center text-xs text-gray-500">
              نشان ملی
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            {
              name: "مجله اینترنتی",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digimag.svg",
            },
            {
              name: "دیجی‌پی",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digipay.svg",
            },
            {
              name: "دیجی‌استایل",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digistyle.svg",
            },
            {
              name: "دیجی‌پلاس",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digiplus.svg",
            },
            {
              name: "دیجی‌کلاب",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digiclub.svg",
            },
            {
              name: "دیجی‌جت",
              image: "https://www.digikala.com/statics/img/svg/footer/jet.svg",
            },
            {
              name: "دیجی‌کالا ادز",
              image:
                "https://dkstatics-public.digikala.com/digikala-static/6d8b4e67f90b80c581949f1e680aeaa60fa49d0e_1770621595.svg",
            },
            {
              name: "دیجی‌مهر",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digiMehr.svg",
            },
            {
              name: "دیجی‌نکست",
              image:
                "https://www.digikala.com/statics/img/svg/footer/diginext.svg",
            },
            {
              name: "دیجی‌اکسپرس",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digiexpress.svg",
            },
            {
              name: "گنجه",
              image:
                "https://www.digikala.com/statics/img/svg/footer/ganjeh.svg",
            },
            {
              name: "دیجی‌فای",
              image:
                "https://www.digikala.com/statics/img/svg/footer/digify.svg",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center h-12"
            >
              <img
                alt={item.name}
                title={item.name}
                src={item.image}
                className="max-w-full max-h-8 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 py-7 text-center text-xs text-gray-500 leading-7">
          تمامی حقوق این وب‌سایت متعلق به فروشگاه است. استفاده از مطالب با ذکر
          منبع مجاز است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
