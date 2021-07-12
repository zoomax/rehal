export function getArrayItem(id, array = []) {
  const index = array.findIndex((item) => {
    return item.id.toString() === id.toString();
  });
  if (index !== -1) {
    return {
      item: array[index],
      index,
    };
  }
  return {
    item: null,
    index,
  };
}

export function filterArray(id, array = []) {
  const data = array.filter((item) => item.id.toString() !== id.toString());
  console.log(data , id);
  return data;
}
