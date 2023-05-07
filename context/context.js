import React from "react";

export const HomeContext = React.createContext();

export const HomeContextProvider = ({ children }) => {
 
  return (
    <HomeContext.Provider
      value={{
       posts : [],
       handlePosts: undefined
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
