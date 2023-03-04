const date = new Date();
exports.getDate = function () {
  const options = {
    weekday: "long",
    day: "numeric",
    month : "long"
  }
  return date.toLocaleDateString("en-US",options);
}

exports.getDay = function () {
  const options = {
    weekday: "long"
  }
  return date.toLocaleDateString("en-US",options);
}