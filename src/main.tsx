import ReactDOM from "react-dom/client";
import "./i18n/i18n";
import store from "./redux/store";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import route from "./routes/route";

const routes = route();
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
