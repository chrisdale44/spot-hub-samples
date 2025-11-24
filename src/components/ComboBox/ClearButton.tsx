import { IoClose } from "@/icons";

type ClearButtonProps = {
  handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ClearButton = ({ handleClear }: ClearButtonProps) => (
  <button
    type="button"
    className="bg-transparent absolute top-[4px] right-[2px] p-[6px] cursor-pointer text-[16px] leading-[16px] text-[#666]"
    onClick={handleClear}
  >
    <IoClose className="w-5 h-5" data-testid="close-icon" />
  </button>
);

export default ClearButton;
