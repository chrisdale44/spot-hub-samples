const boldenString = (str: string, boldStr: string | null): React.ReactNode => {
  if (!boldStr) return str;
  const i = str.toLowerCase().indexOf(boldStr.toLowerCase());
  if (i === -1) return str;
  return (
    <>
      {str.slice(0, i)}
      <strong>{str.slice(i, i + boldStr.length)}</strong>
      {str.slice(i + boldStr.length)}
    </>
  );
};

export default boldenString;
