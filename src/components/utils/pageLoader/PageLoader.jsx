import { MagnifyingGlass } from "react-loader-spinner";
import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="loaderBox">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="gray"
      />
    </div>
  );
}

export default PageLoader;
