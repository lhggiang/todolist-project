import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  return (
    <AppContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};
export default AppProvider;
