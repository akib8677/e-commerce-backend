import { Request, Response, User, bcrypt, jwt } from "./user";

// Register a new user
export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Invalid credentials!");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { _id: user.id },
      process.env.SECRET_TOKEN || "",
      { expiresIn: "31h" }
    );

    return res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error!");
  }
}

// Login a user
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Invalid credentials!");
  }

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { _id: user.id },
        process.env.SECRET_TOKEN || "",
        { expiresIn: "31h" }
      );

      return res.status(200).send({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(400).send("Invalid credentials!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error!");
  }
}

// Get user information
export async function getMe(req: any, res: Response) {
  
  if (!req.user) {
    return res.status(401).send("Not authorized!");
  }
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    if (!user) {
      return res.status(404).send("User not found!");
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Server error!");
  }
}
