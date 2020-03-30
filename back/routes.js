// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", (req, res) => {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});
// Export API routes
module.exports = router;
