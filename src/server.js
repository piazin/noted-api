const app = require('./app');
const { port } = require('./config');

app.listen(port, () =>
  console.log(`server running in http://localhost:${port}`)
);
