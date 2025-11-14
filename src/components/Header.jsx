import React from "react";
import PropTypes from "prop-types";
import { HandCoins } from "lucide-react";

const Header = ({ title, onBack, isDetailView }) => (
  <header className="bg-indigo-700 text-white shadow-xl p-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
    <div className="flex items-center">
      {isDetailView && (
        <button
          onClick={onBack}
          className="mr-3 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-200"
          aria-label="Back to Customer List"
        />
      )}
      <div className="flex items-center space-x-2">
        <HandCoins />
        <h1 className="text-xl md:text-2xl font-extrabold truncate max-w-[200px] sm:max-w-none">
          {title}
        </h1>
      </div>
    </div>
    <span className="hidden sm:block text-sm font-medium bg-indigo-500 rounded-full px-3 py-1">
      Analytics Portal
    </span>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  isDetailView: PropTypes.bool,
};

export default Header;
