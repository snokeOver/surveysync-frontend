import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const siteName = "SurveySync";
  const siteLogo = "/logo.svg";
  const [pageLoading, setPageLoading] = useState(false);
  const defaultTheme = "dark";
  const [currTheme, setCurrTheme] = useState(defaultTheme);
  const [toastMsg, setToastMsg] = useState("");
  const bannerImages = [
    {
      _id: "66411c9ed9f22b9dd0c71d5d",
      title: "Ha Long Bay",
      image_url: "https://i.ibb.co/NZxZ2D3/8.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d5b",
      title: "Bali",
      image_url: "https://i.ibb.co/K0sBgv9/2.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d5c",
      title: "Sundarban",
      image_url: "https://i.ibb.co/M666pmk/8.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d5a",
      title: "Hoi An Ancient Town",
      image_url: "https://i.ibb.co/87FHq87/3.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d60",
      title: "Hoi An Ancient Town",
      image_url: "https://i.ibb.co/xm99fyy/4.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d5e",
      title: "Phuket",
      image_url: "https://i.ibb.co/TWdD7x6/7.jpg",
    },
    {
      _id: "66411c9ed9f22b9dd0c71d5f",
      title: "Hoi An Ancient Town",
      image_url: "https://i.ibb.co/Vt4yY3G/5.jpg",
    },
  ];

  const dataItems = {
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    siteName,
    siteLogo,
    toastMsg,
    setToastMsg,
    bannerImages,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;