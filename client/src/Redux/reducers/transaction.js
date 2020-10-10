import { TRANSACTION } from "../constants";

const initialState = TRANSACTION.INITIAL;

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION.ADD_DATA: {
      return action.payload.data.map((ele) => {
        const dateOfTransaction = new Date(
          ele["Transaction.dateOfTransaction"]
        );
        return {
          amount: ele["Transaction.amount"],
          date: dateOfTransaction,
          category: ele["Transaction.category"],
          year: dateOfTransaction.getFullYear(),
        };
      });
    }
    default: {
      return state;
    }
  }
};

export default transactionReducer;
