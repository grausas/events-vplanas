export const sortByDate = (results) => {
  const sortedResults =
    results &&
    results.slice(0).sort((a, b) => {
      const x = a.attributes.RENGINIO_PRADZIA;
      const y = b.attributes.RENGINIO_PRADZIA;
      return x < y ? -1 : x > y ? 1 : 0;
    });

  return sortedResults;
};
