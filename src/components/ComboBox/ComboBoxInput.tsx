import { useFormContext } from "react-hook-form";

type ComboBoxInputProps = {
  name: string;
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsFocused: (isFocused: boolean) => void;
  handleOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const ComboBoxInput = ({
  name,
  inputRef,
  value,
  handleInputChange,
  handleOnKeyDown,
  setIsFocused,
  handleOnBlur,
  placeholder,
}: ComboBoxInputProps) => {
  const { register } = useFormContext();
  return (
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
  );
};

export default ComboBoxInput;
