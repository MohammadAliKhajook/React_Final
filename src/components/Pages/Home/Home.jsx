import Footer from "../../Footer/Footer";
import useFetch from "../Hooks/Hooks";
import AmazingOffers from "./AmazingOffer/AmazingOffer";
import Banners from "./Banner/Banners";
import MiddleBanners from "./Banner/MiddleBanners";
import BestSelling from "./Categories/BestSelling";
import Categories from "./Categories/Categories";
import PhoneCases from "./Categories/PhoneCases";
import Vitamins from "./Categories/Vitamins";
import HomeProducts from "./HomeProducts";
import Services from "./Services/Services";
import Slider from "./Slider/Slider";

const Home = () => {
  const { data: vitamins, loading } = useFetch(
    "http://localhost:3000/vitamins",
  );
  return (
    <>
      <Slider />
      <Services />
      <AmazingOffers />
      <Banners />
      <Categories />
      <MiddleBanners />
      <Vitamins vitamins={vitamins} />
      <PhoneCases />
      <BestSelling />
      <HomeProducts />
      <Footer />
    </>
  );
};

export default Home;
