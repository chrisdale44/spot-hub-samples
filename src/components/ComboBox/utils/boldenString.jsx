const boldenString = (str, boldStr) => {
  if (!boldStr) return str;
  const i = str.toLowerCase().indexOf(boldStr.toLowerCase());
  if (i === -1) return str;
  return (
    <>
      {str.substr(0, i)}
      <strong>{str.substr(i, boldStr.length)}</strong>
      {str.substr(i + boldStr.length)}
    </>
  );
};

export default boldenString;
