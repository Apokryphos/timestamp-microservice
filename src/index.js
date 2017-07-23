const express = require('express');
const path = require('path');

const port = process.argv[2] || process.env.PORT;

const app = express();

function getDate(timestamp) {

  const date = new Date(isNaN(timestamp) ? timestamp : parseInt(timestamp, 10) * 1000);

  if (isNaN(date.getTime())) {
    return {
      natural: null,
      unix: null,
    };
  } else {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    };

    return {
      natural: date.toLocaleDateString('en-US', options),
      unix: Math.floor(+date / 1000),
    };
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:timestamp', (req, res) => {
  console.log(getDate(req.params.timestamp));
  res.json(getDate(req.params.timestamp));
});

const listener = app.listen(port, function(){
  console.log(`Listening on port ${listener.address().port}...`);
});
