const HowItWorksSkeleton = () => {
  const totalCard = [...Array(3).keys()];
  return (
    <div className="container bg-base-100 mx-auto flex justify-center py-10 lg:py-24 min-h-screen">
      <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-14 xl:gap-20  w-[90%] ">
        {totalCard.map((card) => (
          <div
            key={card}
            className="bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500 h-fit p-2"
          >
            <div className=" flex justify-center">
              <div className="skeleton h-14 w-14 md:h-20 md:w-20 rounded-full bg-gray-600 "></div>
            </div>

            <div className="skeleton h-6 md:h-8 bg-gray-600 my-2 mx-4"></div>

            <div className="skeleton h-14 bg-gray-600 my-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSkeleton;
