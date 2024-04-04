import { ReactNode } from "react";
import LayoutDefault from "../LayoutDefault/LayoutDefault";

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
  const { children, ...restProps } = props;
  return <LayoutDefault {...restProps}>{children}</LayoutDefault>;
};

export default LayoutWrapper;
