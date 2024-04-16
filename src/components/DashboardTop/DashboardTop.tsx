import { ArrowRightOutlined } from "@ant-design/icons";
function DashboardTop() {
  return (
    <section className="container pt-[150px] pb-5">
      <div className="w-[1092px] relative top-0 flex">
        <div className="w-[35%] mr-[175px] mt-[60px]">
          <h2 className="text-[4.5rem] font-[500] leading-[1.4]">
            Birds gonna be Happy
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut
            magna velit eleifend. Amet, quis urna, a eu.
          </p>
          <button className="group bg-transparent transition duration-500 font-[700] p-3 border border-solid border-[var(--accent-color)] text-[var(--accent-color)] hover:duration-500 hover:border-[var(--dark-color)] hover:text-[var(--dark-color)]">
            Read More
            <ArrowRightOutlined className="pl-[10px] group-hover:pl-15" />
          </button>
        </div>
        <img
          src="https://i.ibb.co/LhD09Zy/main-banner2.jpg"
          alt="main-banner"
        />
      </div>
    </section>
  );
}

export default DashboardTop;
