import { useState } from "react";

const ProductForm = ({ product = {}, onSubmit, buttonText }) => {
  const [form, setForm] = useState({
    title: product.title || "",
    image: product.image || "",
    price: product.price ?? "",
    oldPrice: product.oldPrice ?? "",
    discount: product.discount ?? "",
    rating: product.rating ?? "",
    reviewCount: product.reviewCount ?? "",
    delivery: product.delivery || "",
    link: product.link || "",
    category: product.category || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      price: Number(form.price) || 0,
      oldPrice: Number(form.oldPrice) || 0,
      discount: Number(form.discount) || 0,
      rating: Number(form.rating) || 0,
      reviewCount: Number(form.reviewCount) || 0,
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="نام محصول"
        className="input input-bordered w-full"
        required
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="دسته‌بندی"
        className="input input-bordered w-full"
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="آدرس تصویر"
        className="input input-bordered w-full"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="قیمت"
        className="input input-bordered w-full"
        required
      />

      <input
        name="oldPrice"
        type="number"
        value={form.oldPrice}
        onChange={handleChange}
        placeholder="قیمت قبلی"
        className="input input-bordered w-full"
      />

      <input
        name="discount"
        type="number"
        value={form.discount}
        onChange={handleChange}
        placeholder="درصد تخفیف"
        className="input input-bordered w-full"
      />

      <input
        name="rating"
        type="number"
        step="0.1"
        value={form.rating}
        onChange={handleChange}
        placeholder="امتیاز"
        className="input input-bordered w-full"
      />

      <input
        name="reviewCount"
        type="number"
        value={form.reviewCount}
        onChange={handleChange}
        placeholder="تعداد نظرات"
        className="input input-bordered w-full"
      />

      <input
        name="delivery"
        value={form.delivery}
        onChange={handleChange}
        placeholder="نوع ارسال"
        className="input input-bordered w-full"
      />

      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="لینک محصول"
        className="input input-bordered w-full"
      />

      <button type="submit" className="btn btn-success md:col-span-2">
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
