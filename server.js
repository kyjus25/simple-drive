const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sizeOf = require('image-size');
const fs = require('fs');

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      // callback(null, req.params.id + '.' + mime.extension(file.mimetype));
      callback(null, file.originalname);
    }
  })
}).array("file", 3); //Field name and max count

const name = 'Highline Admin';
const email = 'admin@highlinemedia.org';
const password = '12345678';
const hash = 'test';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('dist'))

app.post('/login', (req, res) => {
    if (req.body.email === email && req.body.password === password) {
        res.send({token: generateToken(email + ':' + password)})
    } else {
        res.send({error: true});
    }
});

app.get('/files', (req, res) => {
    const validity = validateToken(req);
    if (validity.status === 'success') {
        res.send({files: "TRUE"})
    } else {
        res.send({error: true});
    }
});

app.get('/uploads', function(req, res){
    fs.readdir('./uploads', (err, files) => {
        files = files.filter(i => i !== '.gitkeep' && i !== '.DS_Store')
        const payload = [];
        files.forEach(i => {
            let size = Math.round(fs.statSync('./uploads/' + i).size * 0.001);
            let sizeUnit = 'KB';
            if (size > 1024) {
                size = size * 0.001;
                sizeUnit = 'MB';
            }
            payload.push({
                name: i,
                size: Math.round(size),
                sizeUnit: sizeUnit,
                path: '/uploads/' + i,
                type: getType(i),
                width: isImage(i) ? sizeOf('./uploads/' + i).width : null,
                height: isImage(i) ? sizeOf('./uploads/' + i).height : null
            })
        })
        res.send(payload);
    });
  });
  app.post('/uploads', function(req, res){
    upload(req, res, function(err, body) {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: 'Could not upload file' });
      } else {
        res.send({'200': 'ok'});
      }
    });
  });
  app.delete('/uploads/:id', function(req, res){
    try {
      fs.unlinkSync('./uploads/' + req.params.id);
      res.send({'200': 'ok'});
    } catch(err) {
      console.error(err);
      res.status(500).send({'500': 'error'});
    }
  });

app.listen(3000, () => console.log('Gator app listening on port 3000!'));

function isImage(i) {
    return i.toUpperCase().indexOf('.JPG') !== -1 ||
    i.toUpperCase().indexOf('.PNG') !== -1 ||
    i.toUpperCase().indexOf('.GIF') !== -1;
}

function isAudio(i) {
  return i.toUpperCase().indexOf('.MP3') !== -1 ||
    i.toUpperCase().indexOf('.WAV') !== -1;
}

function getType(i) {
  if (isImage(i)) {
    return 'image';
  } else if (isAudio(i)) {
    return 'audio';
  } else if (i.toUpperCase().indexOf('.MP4') !== -1) {
    return 'video';
  } else if (i.toUpperCase().indexOf('.PDF') !== -1) {
    return 'pdf';
  } else if (i.toUpperCase().indexOf('.') === -1) {
    return 'folder';
  } else {
    return 'unknown';
  }
}

function generateToken(id) {
    return jwt.sign({ id: id }, hash, { expiresIn: 86400 });
}

function validateToken(req) {
    const header = req.headers.authorization;
    if (header) {
        const auth = header.replace('access_token ', '');
        if (auth && auth !== '') {
        try {
            const decoded = jwt.verify(auth, hash);
            var current_time = new Date().getTime() / 1000;
            if (decoded && (current_time < decoded.exp)) {
                return {status: 'success', id: decoded.id};
            } else {
                return {status: 'expired', id: null};
            }
        } catch(e) {
            return {status: 'fail', id: null};
        }
        } else {
            return {status: 'none', id: null};
        }
    } else {
        return {status: 'none', id: null};
    }
}
