import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 bg-[var(--background-content)] opacity-70 z-[999] w-full h-screen flex justify-center items-center">
      <Spin size="large"></Spin>
    </div>
  );
};

export default Loading;
