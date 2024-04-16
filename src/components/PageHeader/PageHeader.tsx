import { useNavigate } from "react-router-dom";

export function PageHeader() {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <header className="bg-[var(--background-header)] w-[var(--width-header)] px-[var(--padding-x-header)] py-[var(--padding-y-header)] z-50 flex absolute left-2/4 -translate-x-2/4 top-0 items-center justify-between">
      <div
        onClick={goToHomePage}
        className="flex flex-row items-center justify-center rounded-md hover:cursor-pointer"
      >
        <img
          className="w-12 h-12 "
          src="/src/assets/logo/logo.jpg"
          alt="logo"
        />
        <h1 className="ml-2 text-2xl font-bold">Book Store</h1>
      </div>
      <div className="flex items-center gap-5 md:gap-10">
        <div className="cursor-pointer transition duration-200 hover:scale-105 font-semibold bg-cyan-500 text-white shadow-md text-[14px] md:text-[18px] px-6 md:px-10 py-1 rounded-3xl">
          Login
        </div>
      </div>
    </header>
  );
}
