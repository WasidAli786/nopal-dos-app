import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="viewport_height">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
