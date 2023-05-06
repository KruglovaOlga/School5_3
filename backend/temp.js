exports.deleteUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });

    //const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      // }
      // if (user.category === "student") {
      //   await Student.findOneAndRemove({ username: username });
      //   //await Student.findByUsernameAndDelete(username);
      // } else if (user.category === "teacher") {
      //   await Teacher.findOneAndRemove({ username: username });
      //   //await Teacher.findByUsernameAndDelete(username);
    } else {
      await User.findOneAndRemove({ username: username });
      //await User.findByUsernameAndDelete(username);
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
