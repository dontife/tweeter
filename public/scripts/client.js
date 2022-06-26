/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  tweets.map(tweet => {
    // calls createTweetElement for each tweet
    let $createTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(".old-tweets").append($createTweet);
  })
}

const createTweetElement = function(tweet) {
  let date = new Date(tweet.created_at);
  date = date.toDateString();
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
    <textarea class="old-tweets-text">${tweet.content.text}</textarea>
    <footer class="footer-info">
      <output name="date" id="date">${date}</output>
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

renderTweets(data);

});