import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const siteName = "SurveySync";
  const siteLogo = "/logo.svg";
  const [pageLoading, setPageLoading] = useState(false);
  const defaultTheme = "dark";
  const [currTheme, setCurrTheme] = useState(defaultTheme);
  const [toastMsg, setToastMsg] = useState("");

  const dataItems = {
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    siteName,
    toastMsg,
    setToastMsg,
    siteLogo,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
