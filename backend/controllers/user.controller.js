const User = require("../models/user.model");

exports.all_deleted_user = async (req, res) => {
    try {
      const user = await User.find({ deleted: true });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

exports.get_user = async (req, res) => {
    const name = req.params.name;
    try {
      const user = await User.find({ username: name });

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  exports.get_user_data = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('address favorite PLZ');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.soft_delete_user = async (req, res) => {
    try {
      const name = req.params.username;
      const user = await User.findOne({ username: name });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      user.deleted = true;
      const deletedUser = await user.save();
      res.status(200).send(deletedUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};

exports.update_user = async (req, res) => {
  try {
      console.log('Received request to update user:', req.params.username);
      console.log('Request data:', req.body);

      const name = req.params.username;
      const updateData = req.body;
      const user = await User.findOne({ username: name });
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }

      if (typeof updateData.favorite === 'string') {
          updateData.favorite = updateData.favorite.split(',').filter(fav => fav.trim() !== '').join(',');
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true });
      res.status(200).send(updatedUser);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};

  exports.check_username_exists = async (req, res) => {
    try {
      const name = req.params.username;
      const user = await User.findOne({ username: name });
  
      if (user) {
        return res.status(200).send({ exists: true, message: 'Username exists! Please use another username' });
      } else {
        return res.status(200).send({ exists: false, message: 'Username available' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  exports.update_user = async (req, res) => {
    try {
      const name = req.params.username;
      const updateData = req.body;
      const user = await User.findOne({ username: name });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true });
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  exports.check_email_exists = async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(200).send({ exists: true, message: 'E-Mail address exists! Please use another E-Mail address' });
      } else {
        return res.status(200).send({ exists: false, message: 'E-Mail address available' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  exports.get_user_favorites = async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ favorites: user.favorite });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };