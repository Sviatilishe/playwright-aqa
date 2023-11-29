function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(7);
  return `itsallgoodman+${randomString}@dispostable.com`;
}
export { generateRandomEmail };

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}
export { getRandomNumber };
