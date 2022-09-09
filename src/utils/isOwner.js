module.exports = (author, note) => {
  return JSON.stringify(author) == JSON.stringify(note) ? true : false;
};
