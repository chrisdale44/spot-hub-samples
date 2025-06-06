const filterOptions = (options, value) =>
  value
    ? options.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    : options;

export default filterOptions;
