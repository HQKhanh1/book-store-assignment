import App from "../App";
import appRoute from "./app/appRoute";

const route = () => {
  return [
    {
      // Go to default page
      // If the link missing language, add it back, default en
      path: "",
      element: <App />,
      children: [...appRoute()],
    },
  ];
};

export default route;
