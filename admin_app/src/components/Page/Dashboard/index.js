import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import Dashboard from "./Dashboard";

function index() {
  return (
    <>
      <Header />
      <Sidebar />
      <Dashboard />
    </>
  );
}

export default index;
