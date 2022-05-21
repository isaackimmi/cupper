let newCafes;

export const filterCafe = (cafes, rating, price, order) => {
  if (rating !== -1.0 && price !== -1) {
    newCafes = cafes.filter((element) => {
      return element.rating <= rating && element.price_level <= price;
    });
  }

  if (rating !== -1.0 && price === -1) {
    newCafes = cafes.filter((element) => {
      return element.rating <= rating;
    });
  }

  if (rating === -1.0 && price !== -1) {
    newCafes = cafes.filter((element) => {
      return element.price_level <= price;
    });
  }

  if (rating === -1.0 && price === -1) {
    newCafes = cafes;
  }

  return sortCafes(newCafes, order);

  // setCafes(sortCafes(newCafes, order));
};

const sortCafes = (cafes, order) => {
  if (order === 2) {
    cafes.sort((a, b) => {
      return b.distance - a.distance;
    });
  } else {
    return cafes.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  return cafes;
};
