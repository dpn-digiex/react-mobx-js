import { Outlet } from "react-router-dom";
import Footer from "@layouts/components/footer";
import Header from "@layouts/components/header";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
