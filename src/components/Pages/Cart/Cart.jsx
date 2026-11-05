import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  removeCart,
  clearCart,
} from "../../../redux/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.qty,
    0,
  );

  if (cart.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16 text-center" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 mb-6">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        </p>
        <Link to="/" className="btn btn-primary">
          مشاهده محصولات
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">سبد خرید</h2>

        <button
          onClick={() => dispatch(clearCart())}
          className="btn btn-error btn-outline btn-sm"
        >
          خالی کردن سبد خرید
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 border border-base-300 shadow-sm"
            >
              <div className="card-body p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.image || "https://placehold.co/150"}
                    alt={item.title}
                    className="w-full sm:w-32 h-32 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{item.title}</h3>

                    {item.category && (
                      <p className="text-sm text-gray-500 mb-3">
                        {item.category}
                      </p>
                    )}

                    <p className="font-bold text-primary">
                      {Number(item.price || 0).toLocaleString("fa-IR")} تومان
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => dispatch(increment(item.id))}
                          className="btn btn-sm btn-square btn-outline"
                        >
                          <FaPlus size={11} />
                        </button>

                        <span className="font-bold">
                          {item.qty.toLocaleString("fa-IR")}
                        </span>

                        <button
                          onClick={() => dispatch(decrement(item.id))}
                          className="btn btn-sm btn-square btn-outline"
                          disabled={item.qty <= 1}
                        >
                          <FaMinus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeCart(item.id))}
                        className="btn btn-ghost btn-sm text-error"
                      >
                        <FaTrash />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-sm h-fit">
          <div className="card-body">
            <h3 className="font-bold text-lg">خلاصه سفارش</h3>

            <div className="flex justify-between text-sm">
              <span>تعداد محصولات</span>
              <span>
                {cart
                  .reduce((total, item) => total + item.qty, 0)
                  .toLocaleString("fa-IR")}
              </span>
            </div>

            <div className="divider my-1"></div>

            <div className="flex justify-between font-bold">
              <span>مبلغ قابل پرداخت</span>
              <span className="text-primary">
                {totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <button className="btn btn-primary mt-4">ادامه فرایند خرید</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
