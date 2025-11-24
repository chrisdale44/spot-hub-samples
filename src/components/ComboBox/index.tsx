import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { filterOptions } from "./utils";
import { Option } from "./types";
import SubmitButton from "./SubmitButton";
import OptionsList from "./OptionsList";
import ComboBoxInput from "./ComboBoxInput";
import ClearButton from "./ClearButton";

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
  name,
}: ComboBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Array<Option>>(
    allOptions?.length ? filterOptions(allOptions, value) : []
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {
    formState: { errors },
  } = useFormContext();

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

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <div className="relative" data-testid="combobox">
      <div className="relative">
        <ComboBoxInput
          name={name}
          inputRef={inputRef}
          value={value}
          handleInputChange={handleInputChange}
          handleOnKeyDown={handleOnKeyDown}
          setIsFocused={setIsFocused}
          handleOnBlur={handleOnBlur}
          placeholder={placeholder}
        />
        {value && <ClearButton handleClear={handleClear} />}
      </div>

      {isFocused ? (
        options?.length ? (
          <OptionsList
            options={options}
            handleClick={handleClick}
            handleOnMouseDown={handleOnMouseDown}
            value={value}
          />
        ) : notFoundMessage ? (
          <div className="absolute top-[38px] left-[1px] right-[1px] p-[8px] bg-[#ccc] overflow-y-auto text-[12px] text-[#666] z-[999] rounded-b shadow">
            {notFoundMessage}
          </div>
        ) : null
      ) : null}
      {submitIcon && (
        <SubmitButton handleSubmit={handleSubmit} icon={submitIcon} />
      )}
      {typeof errors?.[name]?.message === "string" && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

ComboBox.displayName = "ComboBox";

export default ComboBox;
