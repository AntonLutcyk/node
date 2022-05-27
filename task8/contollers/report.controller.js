module.exports = {
  getReports: (req, res) => {
    res.json([
      { PC: 200 },
      { TV: 300 },
    ]);
  }
}
