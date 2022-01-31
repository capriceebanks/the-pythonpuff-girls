const app = require("./app");

let port = process.env.PORT || 8008;

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
