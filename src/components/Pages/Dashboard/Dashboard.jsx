import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="bg-base-100 rounded-box p-5 shadow">
          <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>

          <ul className="menu gap-2">
            <li>
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link to="/dashboard/products">مدیریت محصولات</Link>
            </li>
            <li>
              <Link to="/dashboard/products/create">افزودن محصول</Link>
            </li>
          </ul>
        </aside>

        <main className="md:col-span-3 bg-base-100 rounded-box p-6 shadow">
          <Outlet />
          <h1 className="text-2xl font-bold">خوش آمدید</h1>
          <p className="mt-3 text-base-content/60">
            از منوی کناری برای مدیریت محصولات استفاده کنید.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
