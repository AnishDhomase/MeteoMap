import { MagnifyingGlass } from "react-loader-spinner";
import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="loaderBox">
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="gray"
      />
    </div>
  );
}

export default PageLoader;
