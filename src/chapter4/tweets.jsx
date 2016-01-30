import React from 'react'

const Tweets= ({tweets}) =>
  <ul>
    {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet}/>)}
  </ul>

const Tweet= ({tweet}) =>
  <li style={{display: 'flex', flexDirection: 'column', paddingBottom: 20}}>
    <div style={{display: 'flex'}}>
      <a href={'http://www.twitter.com/' + tweet.user.screen_name}>
        <img width={20} height={20} style={{marginRight: 10}} src={tweet.user.profile_image_url}/>
      </a>
      <div style={{flexGrow: 2}}>
        <a href={'http://www.twitter.com/' + tweet.user.screen_name}>
          @{tweet.user.name}
        </a>
      </div>
    </div>
    <div>{tweet.created_at}</div>
    <div style={{flexGrow: 2}}>
      <a
        href={linkToTweet(tweet)}
        style={{textDecoration: 'none', color: 'black'}}>
        {tweet.text}
      </a>
    </div>
  </li>

const linkToTweet= tweet => {
  let user= tweet.user.screen_name
  let id= tweet.id_str
  if(tweet.retweeted_status !== undefined) {
    user= tweet.retweeted_status.user.screen_name
    id= tweet.retweeted_status.id_str
  }
  return `http://www.twitter.com/${user}/status/${id}`
}

export default Tweets
