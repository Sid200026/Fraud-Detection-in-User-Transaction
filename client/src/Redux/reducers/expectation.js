import { EXPECTATION } from "../constants";

const monthMapping = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const initialState = EXPECTATION.INITIAL;

const expectationReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPECTATION.ADD_DATA: {
      return action.payload.data.map((ele) => ({
        expected: ele["Expectation.expected"],
        month: ele["Expectation.month"],
        year: ele["Expectation.year"],
        monthIndex: monthMapping.findIndex(
          (element) => element === ele["Expectation.month"]
        ),
      }));
    }
    default: {
      return state;
    }
  }
};

export default expectationReducer;
