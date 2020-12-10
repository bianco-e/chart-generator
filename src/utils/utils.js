export const getPercentage = (total, quantity) =>
  ((quantity * 100) / total).toFixed(2);

export const getPeriodsTotal = (data, periodsNumber) => {
  return new Array(periodsNumber)
    .fill(0)
    .map((i, idx) =>
      data.reduce((acc, current) => acc + current.quantity[idx], i)
    );
};

const sortFunctions = {
  quantityAsc: (data, period) =>
    data.sort((a, b) => a.quantity[period] < b.quantity[period]),
  quantityDesc: (data, period) =>
    data.sort((a, b) => a.quantity[period] > b.quantity[period]),
  alphaAsc: (data) => data.sort((a, b) => a.name < b.name),
  alphaDesc: (data) => data.sort((a, b) => a.name > b.name),
};

export const sortBy = (data, sortParam = "none", period) => {
  if (sortParam === "none" || !sortFunctions[sortParam]) return data;
  return sortFunctions[sortParam](data, period);
};

export const getHighestValue = (data) => {
  const values = data.reduce(
    (acc, current) => acc.concat(current.quantity),
    []
  );
  return values.reduce((acc, current) => (current > acc ? current : acc), 0);
};

export const getBottomDistance = (myValue, total) =>
  (myValue * 100) / total - 0.5;
