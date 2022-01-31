const app = require("./app");

let port = 8008;
app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
