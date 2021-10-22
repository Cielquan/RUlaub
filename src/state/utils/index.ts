interface DBData<T> {
  [k: string]: T;
}

export const addData = <T>(currentData: DBData<T>, dataToAdd: T[]): DBData<T> => {
  const rv: DBData<T> = JSON.parse(JSON.stringify(currentData));
  const highestID = Math.max(...Object.keys(currentData).map((id) => Number(id)));
  dataToAdd.forEach((data, idx) => {
    rv[highestID + idx + 1] = data;
  });
  return rv;
};

export const removeData = <T>(
  currentData: DBData<T>,
  IDsToRemove: string[]
): DBData<T> => {
  const rv: DBData<T> = JSON.parse(JSON.stringify(currentData));
  IDsToRemove.forEach((ID) => {
    delete rv[ID];
  });
  return rv;
};

export const updateData = <T>(
  currentData: DBData<T>,
  updatePayload: [string, T][]
): DBData<T> => {
  const rv: DBData<T> = JSON.parse(JSON.stringify(currentData));
  updatePayload.forEach((update) => {
    const [id, updatedData] = update;
    rv[id] = updatedData;
  });
  return rv;
};
