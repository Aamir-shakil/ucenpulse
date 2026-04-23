
/**
 * Server Entry Point
 *
 * Loads environment variables and starts the Express server.
 */

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});