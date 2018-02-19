
const dateQueryBuilder = (since, until) => {
  const query = {};
  if (since) query.$gte = since;
  if (until) query.$lte = until;
  return query;
};

module.exports = dateQueryBuilder;
