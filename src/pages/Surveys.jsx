import InitialPageStructure from "../components/dashboard/shared/InitialPageStructure";
import useGetPublicData from "../hooks/useGetPublicData";
import SurveyCard from "../components/shared/cards/SurveyCard";

import { TfiLayoutGrid3, TfiLayoutMenuV } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import PrimaryButton from "../components/shared/PrimaryButton";
import { useEffect, useState } from "react";
import PaginationBtns from "../components/shared/pagination/PaginationBtns";
import useData from "../hooks/useData";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";

const Surveys = () => {
  const { surveyCategories } = useData();

  const [search, setSearch] = useState("");
  const [currSort, setCurrSort] = useState("");
  const [currCategory, setCurrCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const numberOfPages = Math.ceil(totalSurveys / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [layoutSelect, setLayoutSelect] = useState(false);

  const {
    data: validSurveys,
    isPending,
    error,
    refetch: refetchValidSurveys,
  } = useGetPublicData({
    apiRoute: "surveys",
    additionalQuerry: `page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${currSort}&category=${currCategory}`,
  });

  //   handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   handle Next page
  const handleNext = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Set when the next and previous button will be visible and disable
  useEffect(() => {
    if (currentPage === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    if (currentPage === numberOfPages) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    if (currentPage === 1 && numberOfPages === 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    }
  }, [currentPage, numberOfPages]);

  //   set Total Post Numbers
  useEffect(() => {
    //  if (totalData) setTotalSurveys(totalData.length);
    if (validSurveys) setTotalSurveys(validSurveys[1] || 0);
  }, [validSurveys]);

  // Handle the Search functionality
  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.parentNode.querySelector(
      'input[name="searchVal"]'
    ).value;
    setSearch(searchValue);
    e.target.parentNode.querySelector('input[name="searchVal"]').value = "";
    setCurrentPage(1);
  };

  // Refetch data when currentPage or itemsPerPage changes
  useEffect(() => {
    //  totalDataNumber();

    refetchValidSurveys();
  }, [currentPage, itemsPerPage, search, currSort, currCategory]);

  return (
    <InitialPageStructure
      pageName="Surveys"
      pageTitle="Discover & Participate in Our Surveys"
      error={error}
      isPending={isPending}
      data={[...Array(validSurveys[1]).keys()]}
      emptyDataMsg="No Valid Surveys Found!"
      totalName="Matched Survey"
    >
      {/* navigation bar */}

      <div className="flex items-center flex-col lg:flex-row gap-10 justify-between min-h-0 bg-blue-200 dark:bg-gray-800 rounded-lg w-[98%] lg:w-[90%] mx-auto py-5 lg:py-2 px-5">
        {/* start part */}
        <div className="flex flex-1 w-full">
          <div className="flex gap-5 justify-between items-center w-full">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="w-full">
              <fieldset className="form-control w-full">
                <div className=" relative text-gray-400 text-xl font-semibold">
                  <input
                    type="text"
                    name="searchVal"
                    placeholder="Search . . . "
                    className="input search-input  w-full bg-transparent rounded-md  placeholder-gray-600 dark:placeholder-gray-100 border-sky-500 dark:border-yellow-100"
                  />
                  <IoIosSearch
                    onClick={handleSearch}
                    className="absolute cursor-pointer hover:text-primary right-5  top-3"
                  />
                </div>
              </fieldset>
            </form>

            {/* Reset button */}
            <div onClick={() => setSearch("")}>
              <PrimaryButton text="Reset" />
            </div>
          </div>
        </div>

        {/* End part */}
        <div className="flex items-center gap-10 flex-1 w-full lg:justify-end">
          {/* Filter Part */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="form-control min-w-44">
              <select
                onChange={(e) => {
                  setCurrentPage(1);
                  setCurrCategory(e.target.value);
                }}
                type="text"
                className="select category-select select-bordered w-full bg-sky-100 dark:bg-gray-800 border-sky-500 dark:border-yellow-100"
              >
                <option value="">Select a Category</option>
                {surveyCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sorting Part */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="form-control min-w-36">
              <select
                onChange={(e) => {
                  setCurrentPage(1);
                  setCurrSort(e.target.value);
                }}
                type="text"
                className="select category-select select-bordered w-full bg-sky-100 dark:bg-gray-800 border-sky-500 dark:border-yellow-100"
              >
                <option value="">Select A Filter</option>
                <option value="deadline:asc">Deadline ⬆️</option>
                <option value="deadline:des">Deadline ⬇️</option>
                <option value="voteCount:asc">Vote Count ⬆️</option>
                <option value="voteCount:des">Vote Count ⬇️</option>
              </select>
            </div>
          </div>

          {/* Option part */}
          <div className="flex gap-4 w-fit">
            <div className="hover:scale-125 duration-500">
              <TfiLayoutGrid3
                onClick={() => setLayoutSelect(false)}
                className={`cursor-pointer hover:text-primary text-2xl ${
                  !layoutSelect ? "text-primary" : ""
                }`}
              />
            </div>
            <div className="hover:scale-125 duration-500">
              <TfiLayoutMenuV
                onClick={() => setLayoutSelect(true)}
                className={`cursor-pointer hover:text-primary text-2xl ${
                  layoutSelect ? "text-primary" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card View Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 px-5 group mt-2 md:mt-10">
        {validSurveys[0]?.map((survey) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <PaginationBtns
        pages={pages}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        setCurrentPage={setCurrentPage}
        prevDisabled={prevDisabled}
        handlePrevious={handlePrevious}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setPrevDisabled={setPrevDisabled}
        nextDisabled={nextDisabled}
        handleNext={handleNext}
      />
    </InitialPageStructure>
  );
};

export default Surveys;
