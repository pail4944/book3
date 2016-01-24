---
layout: layout.hbs
---

# Hackathon - Bitcoin Trading

Your mission is to build an automatic trading bot to buy and sell Bitcoins to
maximize returns in a market. Your initial investment is $100,000.

## Market

Suppose a hypothetical market for trading bitcoins is governed by the following
principles:

- Only two currencies are available: bitcoins and USD.
- The price of a bitcoin is quoted in USD (e.g., 1 bitcoin = $1000 USD)
- The price of a bitcoin is influenced by certain words being said on Twitter.
- The price change does not happen immediately; it will take effect after 2 to 5 tweets
- When a word _x_ is said, the price is changed by _d(x)_.
- Only these words matter:
  - game, news, money, fun, good, actor, news, movies, tech, music, people, apple, google

## Bot

[bot.js](bot.js)

Your job is to implement the logic of this trading bot. This bot will
observe the twitter stream and identify relevant keywords to make trading decision.
There is only one decision to make---to trade or not to trade.


Implement the function below in `bot.js`.

```
function decideWhetherOrNotToTrade(){
  return Math.random() < 0.1
}
```

The default logic of this function is to randomly decide to trade every one out
of ten times. Replace the code with a more reasonable logic. You do know what
keywords are influential. But you don't know which are positive and which are
negative. Your challenge is to guess or estimate them.

## History Data

[history](history.html)

A history of about 10000 tweets and prices is provided for testing purposes.
While you are developing the code for your bot, you can test its performance against
this history data to see how much profit it wold have generated.

## Live Data

[live](live.html)

Whenever you are ready, you can test your bot on the live streaming data.

## Contest

At the end of the hackathon, we will organize an informal contest to see whose
bot is able to make the most profits on live data.

## Contributors

The team members who contributed to this hackathon are:

- (Name)
- (Name)
- (Name)
- (Name)
- (Name)
- (Name)
