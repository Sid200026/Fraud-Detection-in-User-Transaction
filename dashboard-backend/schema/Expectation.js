cube(`Expectation`, {
  sql: `SELECT * FROM public.expectation`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    }
  },
  
  dimensions: {
    expected: {
      sql: `expected`,
      type: `string`
    },
    
    month: {
      sql: `month`,
      type: `string`
    },

    year: {
      sql: `year`,
      type: `string`
    }
  }
});
