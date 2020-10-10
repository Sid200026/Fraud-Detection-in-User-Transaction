cube(`Transaction`, {
  sql: `SELECT * FROM public.transaction`,

  joins: {},
  refreshKey: {
    every: `1 hour`,
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [dateOfTransaction],
    },
  },

  dimensions: {
    category: {
      sql: `category`,
      type: `string`,
    },

    amount: {
      sql: `amount`,
      type: `string`,
    },

    dateOfTransaction: {
      sql: `date_of_transaction`,
      type: `time`,
    },
  },
});
