/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


const renderTweets = function(tweets) {
  $(".old-tweets").empty();
  // loops through tweets
  tweets.map(tweet => {
    // calls createTweetElement for each tweet
    let $createTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(".old-tweets").prepend($createTweet);
  })
}

const createTweetElement = function(tweet) {
  let date = new Date(tweet.created_at);
  let $tweet =  $(`
  <article class = "timeline">
    <header class='timeline-tweet'>
       <div class="leftside-info">
        <img class="mini-avatar" src=${tweet.user.avatars}>
        <p class="user">${tweet.user.name}</p>
      </div >
      <div class="rightside-info">
        <p class="username">${tweet.user.handle}</p>
      </div>
    </header> 
    <div class="old-tweets-text">${tweet.content.text}</div>
    <hr class = 'line'>
    <footer class="footer-info">
      <output name="date" id="date">${timeago.format(date)}</output>
      <div id="icons">
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </div>
    </footer>
  </article> 
  `);  
  return $tweet;
}


  $('form').submit(function(event) {
    event.preventDefault();
    let $str = $('#tweet-text').serialize();
    console.log("MY Tweet:",$str);
    const tweetText = $("#tweet-text").val();
    // Prints an error message if the input is empty or the characters inputted is greater than 140
    if (tweetText < 1) {
      return alert('The message is empty, Please try again');
    } else if($str.length > 140){
      resetInput();
      return alert('The maximum characters cannot be greater than 140');
    }
    $.ajax('/tweets', {method: 'POST', data: $str})
    .then(function () {
      resetInput();
      loadTweets();
    });
  });

  
  const resetInput = function() {
    const tweetInput = $('#tweet-text');
    tweetInput.val('');
    tweetInput.focus();
    $('#counter').text(140);
  } 



  // using jQuery to make a request to /tweets
  const loadTweets = function () {
    $.get("/tweets").then(function (data) {
      console.log("Success! loadTweets was called.");
      return renderTweets(data);
    });
  }
  loadTweets();


})
