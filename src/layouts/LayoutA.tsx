import { Layout } from "antd";
import { ReactNode } from "react";
const { Content } = Layout;

type LayoutAProps = {
  children: ReactNode;
};

const LayoutA = (props: LayoutAProps) => {
  const { children } = props;

  return (
    <Layout>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutA;
