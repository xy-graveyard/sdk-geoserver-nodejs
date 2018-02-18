var Node = require('./models/Node');
var CheckIn = require('./models/CheckIn');
var ethereumjs = require('ethereumjs-util');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes


  app.get('/', function(req, res) {
    res.status(200).json({'response': 'See /api/nodes'});
  });

  app.get('/api/nodes', function(req, res) {
    Node.find({}, (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        res.status(200).json(response);
      });
  });

  app.post('/api/nodes', function(req, res) {
    Node.create({
      name: req.body.name,
      publicKey: req.body.publicKey,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }, (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        res.status(200).json(response);
      });
  });

  app.get('/api/checkins', function(req, res) {
    CheckIn.find({}, (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        res.status(200).json(response);
      });
  });

  app.post('/api/checkin', function(req, res) {
    // Compute the key used to sign the message
    let signature = req.body.signature;
    result = ethereumjs.fromRpcSig(signature.signature)
    pub = ethereumjs.ecrecover(ethereumjs.toBuffer(signature.messageHash), result.v, result.r, result.s);
    addrBuf = ethereumjs.pubToAddress(pub);
    address = ethereumjs.toChecksumAddress(ethereumjs.bufferToHex(addrBuf));

    if (address != req.body.node) {
      // Incorrect public key
      return res.status(500).send();
    }
    Node.find({ publicKey: address }, (err, response) => {
      if (!response || err) {
        console.log(err);
        return res.status(500).send();
      }
      CheckIn.create({
        userToken: req.body.userToken,
        timestamp: req.body.timestamp,
        signature: req.body.signature,
        node: response._id
      }, (err, checkin) => {
        res.status(200).json(checkin);
      });
    });
  });

};