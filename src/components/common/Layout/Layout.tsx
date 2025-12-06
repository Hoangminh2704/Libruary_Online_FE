import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default Layout;
