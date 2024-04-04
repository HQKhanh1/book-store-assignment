import { Layout } from "antd";
import { ReactNode } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader";
import PageFooter from "../components/PageFooter/PageFooter";
const { Content } = Layout;

type LayoutAProps = {
  children: ReactNode;
};

const LayoutDefault = (props: LayoutAProps) => {
  const { children } = props;

  return (
    <>
      <PageHeader />
      <Layout>
        <Content className="min-h-[1000px] bg-[var(--background-main)]">
          {children}
        </Content>
      </Layout>
      <PageFooter />
    </>
  );
};

export default LayoutDefault;
