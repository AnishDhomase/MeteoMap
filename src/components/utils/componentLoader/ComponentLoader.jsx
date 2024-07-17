import { ColorRing } from "react-loader-spinner";

function ComponentLoader() {
  return (
    <div className="componentLoaderBox">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["blue", "blue", "blue", "blue", "blue"]}
      />
    </div>
  );
}

export default ComponentLoader;
