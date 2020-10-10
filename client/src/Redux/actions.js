import { EXPECTATION, TRANSACTION } from "./constants";

export const addTransaction = (data) => ({
  type: TRANSACTION.ADD_DATA,
  payload: {
    data,
  },
});

export const addExpectation = (data) => ({
  type: EXPECTATION.ADD_DATA,
  payload: {
    data,
  },
});
