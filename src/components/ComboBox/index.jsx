import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IoClose } from "@/icons";
import { filterOptions, boldenString } from "./utils.jsx";

const ComboBox = ({
  allOptions,
  onSelection,
  onClear,
  onSubmit,
  submitIcon,
  placeholder,
  notFoundMessage,
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(
    allOptions?.length ? filterOptions(allOptions, value) : []
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setOptions(filterOptions(allOptions, value));
  }, [allOptions, value]);

  const handleInputChange = (event) => {
    event.persist();
    setValue(event.target.value);
    setOptions(filterOptions(allOptions, event.target.value));
  };

  const handleOnMouseDown = (e) => {
    // prevent onMouseDown triggering onBlur event before onClick event
    e.preventDefault();
  };

  const handleOnKeyDown = (e) => {
    e.persist();
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit(e.target.value);
      if (!onClear) {
        setValue("");
      }
    }
  };

  const handleClick = (e, id) => {
    e.persist();
    e.stopPropagation();

    onSelection(id);
    setValue("");
    setIsFocused(false);
    inputRef.current.blur();
  };

  const handleOnBlur = (e) => {
    e.persist();
    setIsFocused(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue("");
    if (onClear) onClear();
  };

  return (
    <div className="relative mb-[10px] h-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="tag"
          value={value}
          autoComplete={"off"}
          className="w-full px-4 py-2 text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          placeholder={placeholder}
        />
        {value && (
          <button
            type="button"
            className="bg-transparent absolute top-[4px] right-[2px] p-[6px] cursor-pointer text-[16px] leading-[16px] text-[#666]"
            onClick={handleClear}
          >
            <IoClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {isFocused ? (
        options?.length ? (
          <ul className="absolute top-[38px] left-[1px] right-[1px] bg-[#fff] min-h-[100px] max-h-[160px] overflow-y-auto text-[12px] text-[#666] z-[999] rounded-b shadow">
            {options.map((option, i) => (
              <li
                key={option.id || `option-${i}`}
                className="leading-[1em] p-[8px] no-underline cursor-pointer hover:bg-[#f0f0f0]  focus:bg-[#f0f0f0]"
                onClick={(e) => handleClick(e, option)}
                onMouseDown={handleOnMouseDown}
              >
                {boldenString(option.name, value)}
              </li>
            ))}
          </ul>
        ) : (
          <div className="absolute top-[38px] left-[1px] right-[1px] p-[8px] bg-[#ccc] overflow-y-auto text-[12px] text-[#666] z-[999] rounded-b shadow">
            {notFoundMessage}
          </div>
        )
      ) : null}
      {submitIcon && (
        <button
          type="button"
          className="bg-[#1e6cab] ml-[4px] mr-[0] my-[4px] p-[4px] w-[28px] text-[white] rounded-[2px] leading-[14px] text-[14px]"
          onClick={() => {
            onSubmit(value);
            setValue("");
          }}
        >
          {submitIcon}
        </button>
      )}
    </div>
  );
};

ComboBox.propTypes = {
  allOptions: PropTypes.arrayOf(PropTypes.object),
  onSelection: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitIcon: PropTypes.node,
  placeholder: PropTypes.string,
};

export default ComboBox;
