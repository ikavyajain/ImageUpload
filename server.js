const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running at http://localhost:${process.env.PORT || 3000}` 
    // `server is running at http://localhost:3000}`
    // `server is running at https://192.168.1.123:${process.env.PORT || 3000}`
  );
});