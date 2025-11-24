import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "@/icons";
import { filterOptions, boldenString } from "./utils";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Option } from "./types";

type ComboBoxProps<
  TFormValues extends Record<string, any> = Record<string, any>
> = {
  allOptions: Option[];
  onSelection: (option: Option) => void;
  onClear?: () => void;
  onSubmit: (value: string) => void;
  submitIcon?: React.ReactNode;
  placeholder?: string;
  notFoundMessage?: string;
  register?: UseFormRegister<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  name: keyof TFormValues;
};

const ComboBox = ({
  allOptions,
  onSelection,
  onClear,
  onSubmit,
  submitIcon,
  placeholder,
  notFoundMessage,
  register,
  errors,
  name,
}: ComboBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Array<Option>>(
    allOptions?.length ? filterOptions(allOptions, value) : []
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (allOptions?.length) {
      setOptions(filterOptions(allOptions, value));
    }
  }, [allOptions, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setValue(e.target.value);
    if (allOptions?.length) {
      setOptions(filterOptions(allOptions, e.target.value));
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
    // prevent onMouseDown triggering onBlur event before onClick event
    e.preventDefault();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.persist();
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e.currentTarget.value);
      if (!onClear) {
        setValue("");
      }
    }
  };

  const handleClick = (e: React.MouseEvent, option: Option) => {
    e.persist();
    e.stopPropagation();

    onSelection(option);
    setValue("");
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.persist();
    setIsFocused(false);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue("");
    if (onClear) onClear();
  };

  return (
    <div className="relative" data-testid="combobox">
      <div className="relative">
        <input
          {...(register ? register(name) : {})}
          ref={inputRef}
          type="text"
          name={name}
          value={value}
          autoComplete={"off"}
          className="w-full px-4 py-2 text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          onChange={handleInputChange}
          onKeyDown={handleOnKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          placeholder={placeholder}
          data-testid="combobox-input"
        />
        {value && (
          <button
            type="button"
            className="bg-transparent absolute top-[4px] right-[2px] p-[6px] cursor-pointer text-[16px] leading-[16px] text-[#666]"
            onClick={handleClear}
          >
            <IoClose className="w-5 h-5" data-testid="close-icon" />
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
        ) : notFoundMessage ? (
          <div className="absolute top-[38px] left-[1px] right-[1px] p-[8px] bg-[#ccc] overflow-y-auto text-[12px] text-[#666] z-[999] rounded-b shadow">
            {notFoundMessage}
          </div>
        ) : null
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
      {typeof errors?.[name]?.message === "string" && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

ComboBox.displayName = "ComboBox";

export default ComboBox;
