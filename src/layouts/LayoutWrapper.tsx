import { ReactNode } from "react";
import LayoutA from "./LayoutA";

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
  const { children, ...restProps } = props;
  return <LayoutA {...restProps}>{children}</LayoutA>;
};

export default LayoutWrapper;
