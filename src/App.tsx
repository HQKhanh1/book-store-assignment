import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import i18n from "./i18n/i18n";

import { RootState, useAppSelector } from "@/redux/store";
import LayoutWrapper from "./layouts/LayoutWrapper/LayoutWrapper";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [antdLocale, setAntdLocale] = useState(enUS);

  const isLoading = useAppSelector(
    (state: RootState) => state.loading
  ).initialState;
  useEffect(() => {
    setAntdLocale(i18n.language === "en" ? enUS : enUS);
  }, []);

  return (
    <div id="app">
      {isLoading && <Loading />}
      <ConfigProvider locale={antdLocale}>
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
      </ConfigProvider>
    </div>
  );
};

export default App;
