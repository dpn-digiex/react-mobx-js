import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { rootStore } from "@stores/root";

import router from "./layouts/router";

const App = () => {
  useEffect(() => {
    return () => {
      rootStore.destroy();
    };
  }, []);

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
};

export default App;
