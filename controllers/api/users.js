const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const uploadFile = require('../../routes/api/upload')

module.exports = {
  create,
  login,
  checkToken,
  index,
  getById,
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    // can I save the photo into a new variable and then use it after user creation? 
    const photoUrl = await uploadFile(req, res)
    console.log("photoUrl: ")
    console.log(photoUrl)
    // const location = JSON.parse(req.body.location);
    // const { name, email, role, password } = req.body;
    // const user = await User.create({ name, email, role, location, password, photoUrl });
    const user = await User.create({...req.body, photoUrl: photoUrl});
    console.log("user: ")
    console.log(user)
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}


async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

/*--- Org Functions --*/

async function index(req, res) {
  try {
    const orgs = await User.find({ role: 'organization' });
    res.status(200).json(orgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getById(req, res) {
  try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}