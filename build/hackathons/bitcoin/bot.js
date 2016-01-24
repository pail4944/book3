
var buffer = [];
var trends = {};

function decideWhetherOrNotToTrade(item){
	item.tweet = item.tweet.toLowerCase();

	buffer = _.takeRight(buffer.concat(item), 20);
	
	var start = _.sum(_.take(buffer, 3), 'price')/3;
	var end = _.sum(_.takeRight(buffer, 3), 'price')/3;
	var trend = end/start;

	var keywords = _.chain(buffer).take(3).map(function(item){
		return item.tweet.split(' ');
	}).flatten().groupBy(_.identity).map(function(g, word){
		trends[word] = trends[word]||{values : [], avg : 0};
		trends[word].values.push(trend);
		trends[word].avg = _.sum(trends[word].values)/trends[word].values.length;
		
		return trends[word].values.length>100?trends[word].avg:false;
	}).compact().value();

	var predictedTrend = _.sum(keywords)/(keywords.length||1);
	console.log(predictedTrend);
	return (bank.currency == 'USD' && predictedTrend > 1) || (bank.currency != 'USD' && predictedTrend < 1);
}