export const getContent = (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name}! 🎉`,
    data: "Here’s the secret content only logged-in users can see. Have to be implemented soon.",
  });
};

//This isn't used anywhere, we should be able to delete it.
