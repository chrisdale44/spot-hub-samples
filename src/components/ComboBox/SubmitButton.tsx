import React from "react";

type SumbitButtonProps = {
  handleSubmit: () => void;
  icon: React.ReactNode;
};

const SubmitButton = ({ handleSubmit, icon }: SumbitButtonProps) => (
  <button
    type="button"
    className="bg-[#1e6cab] ml-[4px] mr-[0] my-[4px] p-[4px] w-[28px] text-[white] rounded-[2px] leading-[14px] text-[14px]"
    onClick={handleSubmit}
  >
    {icon}
  </button>
);

export default SubmitButton;
