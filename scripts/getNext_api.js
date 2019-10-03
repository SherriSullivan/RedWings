// jshint esversion: 6

/**** Index Scripts for 2020 Red Wings site ****/

window.onload = getGame;

function getGame() {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let nextDate, year, mo, month, day;
	let nextGameDate;
	let nextHomeTeam, nextHWins, nextHLoss, nextHOtl;
	let nextAwayTeam, nextAWins, nextALoss, nextAOtl;
	let nextVenue;

	fetch('https://statsapi.web.nhl.com/api/v1/teams/17?expand=team.schedule.next&season=20192020')
	.then((results) => results.json())
	.then((next) => {
		nextDate = next.teams[0].nextGameSchedule.dates[0].date.split('-');
		year = nextDate[0];
		mo = nextDate[1] - 1;
		month = months[mo];
		day = nextDate[2];
		nextGameDate = `${month} ${day}, ${year}`;

		nextHomeTeam = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
		if (nextHomeTeam === 'Detroit Red Wings') {
			document.querySelector('#nextHomeTeam').setAttribute('class', 'det');
		}
		nextHWins = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.wins;
		nextHLoss = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.losses;
		nextHOtl = (!next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot) ? 
			0 : next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot;

		nextAwayTeam = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;
		if (nextAwayTeam === 'Detroit Red Wings') {
			document.querySelector('#nextAwayTeam').setAttribute('class', 'det');
		}
		nextAWins = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.wins;
		nextALoss = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.losses;
		nextAOtl  = (!next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot) ? 
			0 : next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot;

		nextVenue = next.teams[0].nextGameSchedule.dates[0].games[0].venue.name;

		document.querySelector('#nextGameDate').innerHTML += nextGameDate;
		document.querySelector('#nextHomeTeam').innerHTML = nextHomeTeam;
		document.querySelector('#nextHRecord').innerHTML = nextHWins + ' - ' + nextHLoss + ' - ' + nextHOtl;
		document.querySelector('#nextAwayTeam').innerHTML = nextAwayTeam;
		document.querySelector('#nextARecord').innerHTML = nextAWins + ' - ' + nextALoss + ' - ' + nextAOtl;
		document.querySelector('#nextVenue').innerHTML = nextVenue;
	});

	fetch('https://statsapi.web.nhl.com/api/v1/teams/17?expand=team.schedule.previous&season=20192020')
	.then((results) => results.json())
	.then((prev) => {
		//console.log(prev);
		prevDate = prev.teams[0].previousGameSchedule.dates[0].date.split('-');
		year = prevDate[0];
		mo = prevDate[1] - 1;
		month = months[mo];
		day = prevDate[2];
		prevGameDate = `${month} ${day}, ${year}`;
		prevHomeTeam = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
		if (prevHomeTeam === 'Detroit Red Wings') { document.querySelector('#prevHomeTeam').style.color = '#c8102e' }
		prevHomeScore = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
		prevHWins = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.wins;
		prevHLoss = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.losses;
		prevHOtl = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot;
		prevAwayTeam = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
		if (prevAwayTeam === 'Detroit Red Wings') { document.querySelector('#prevAwayTeam').style.color = '#c8102e' }
		prevAwayScore = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
		prevAWins = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.wins;
		prevALoss = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.losses;
		prevAOtl = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot;
		if (prevHomeScore > prevAwayScore) {
			document.querySelector('#prevHomeTeam').setAttribute('class', 'win');
			document.querySelector('#prevAwayTeam').setAttribute('class', 'loss');
		} else {
			document.querySelector('#prevAwayTeam').setAttribute('class', 'win');
			document.querySelector('#prevHomeTeam').setAttribute('class', 'loss')}
		prevVenue = prev.teams[0].previousGameSchedule.dates[0].games[0].venue.name;
		document.querySelector('#prevGameDate').innerHTML += prevGameDate;
		document.querySelector('#prevHomeTeam').innerHTML = prevHomeTeam + ': ' + prevHomeScore;
		document.querySelector('#prevHRecord').innerHTML = prevHWins + ' - ' + prevHLoss + ' - ' + prevHOtl;
		document.querySelector('#prevAwayTeam').innerHTML = prevAwayTeam + ': ' + prevAwayScore;
		document.querySelector('#prevARecord').innerHTML = prevAWins + ' - ' + prevALoss + ' - ' + prevAOtl;
		document.querySelector('#prevVenue').innerHTML = prevVenue;
		console.log(prevGameDate);
		console.log(prevHomeTeam + ': ' + prevHomeScore);
		console.log(prevAwayTeam + ': ' + prevAwayScore);
	});
}
