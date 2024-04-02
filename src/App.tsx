import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import i18n from "./i18n/i18n";
import LayoutWrapper from "./layouts/LayoutWrapper";

const App = () => {
  const [antdLocale, setAntdLocale] = useState(enUS);

  useEffect(() => {
    setAntdLocale(i18n.language === "en" ? enUS : enUS);
  }, []);

  return (
    <div id="app">
      <ConfigProvider locale={antdLocale}>
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
      </ConfigProvider>
    </div>
  );
};

export default App;
