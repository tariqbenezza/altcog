var Twit = require('twit')

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,
});

// ecoute tous les tweet qui contiennent 'connard'
var stream = T.stream('statuses/filter', { track: ['#cogedim', 'cogedim', '#altarea', 'altarea'] })

// a chaque tweet
stream.on('tweet', function (tweet) {
  //console.log('@'+ tweet.user.screen_name + ' a dit : ' + tweet.text);
  var user = tweet.user.screen_name;
  var reponse = {
    status : '@'+user+' 5 ans et les réserves ne sont toujours pas levées. Fuyez ce promoteur qui vous oublie une fois le dernier chèque remis.',
    in_reply_to_status_id: tweet.id_str
  };
  //console.log('ON REPOND:' + reponse)

  T.post('statuses/update', reponse, function(err, data, response) {
      console.log(data)
  });
})