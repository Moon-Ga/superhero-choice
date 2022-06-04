const randomId = () => {
  const minimum = Math.ceil(1);
  const maximum = Math.floor(731);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export { randomId };
