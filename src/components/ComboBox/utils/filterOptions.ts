import { Option } from "../types";

const filterOptions = (options: Option[], value: string | null): Option[] =>
  value
    ? options.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    )
    : options;

export default filterOptions;
