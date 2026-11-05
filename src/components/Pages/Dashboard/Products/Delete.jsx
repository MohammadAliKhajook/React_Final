import axios from "axios";

const Delete = ({ id, onDelete }) => {
  const deleteProduct = async () => {
    const confirmDelete = window.confirm("از حذف این محصول مطمئن هستید؟");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      onDelete(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={deleteProduct} className="btn btn-error btn-sm text-white">
      حذف
    </button>
  );
};

export default Delete;
