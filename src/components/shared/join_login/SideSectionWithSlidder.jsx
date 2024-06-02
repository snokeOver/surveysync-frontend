import useData from "../../../hooks/useData";

const SideSectionWithSlidder = ({ writings }) => {
  const { siteName } = useData();
  return (
    <>
      <div>
        <div className="px-2 text-center lg:text-left flex flex-col gap-5">
          <h1 className="text-4xl text-primary font-bold">
            Welcome to {siteName}
          </h1>
          <h2 className="font-rubik text-2xl xl:text-3xl font-semibold text-gray-700">
            {writings}
          </h2>
        </div>
      </div>
      <div className="flex w-full">
        <img src="./loginImage.svg" alt="" />
        {/* <LoginSlidder /> */}
      </div>
    </>
  );
};

export default SideSectionWithSlidder;
