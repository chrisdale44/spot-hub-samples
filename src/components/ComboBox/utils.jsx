export const filterOptions = (options, value) =>
  value
    ? options.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    : options;

export const boldenString = (str, boldStr) => {
  const i = str.toLowerCase().indexOf(boldStr.toLowerCase());
  if (!boldStr || i === -1) return str;
  return (
    <>
      {str.substr(0, i)}
      <strong>{str.substr(i, boldStr.length)}</strong>
      {str.substr(i + boldStr.length)}
    </>
  );
};
