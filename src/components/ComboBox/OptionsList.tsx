import { boldenString } from "./utils";
import { Option } from "./types";

type OptionsListProps = {
  options: Option[];
  handleClick: (e: React.MouseEvent<HTMLLIElement>, option: Option) => void;
  handleOnMouseDown: (e: React.MouseEvent<HTMLLIElement>) => void;
  value: string;
};

const OptionsList = ({
  options,
  handleClick,
  handleOnMouseDown,
  value,
}: OptionsListProps) => (
  <ul className="absolute top-[38px] left-[1px] right-[1px] bg-[#fff] min-h-[100px] max-h-[160px] overflow-y-auto text-[12px] text-[#666] z-[999] rounded-b shadow">
    {options.map((option, i) => (
      <li
        role="listitem"
        key={option.id || `option-${i}`}
        data-testid={`option-${option.id || i}`}
        className="leading-[1em] p-[8px] no-underline cursor-pointer hover:bg-[#f0f0f0]  focus:bg-[#f0f0f0]"
        onClick={(e) => handleClick(e, option)}
        onMouseDown={handleOnMouseDown}
      >
        {boldenString(option.name, value)}
      </li>
    ))}
  </ul>
);

export default OptionsList;
