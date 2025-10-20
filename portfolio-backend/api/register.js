app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Username and password required.' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: 'Username already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
