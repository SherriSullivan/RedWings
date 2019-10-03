// jshint esversion: 6

/**** getGames Scripts for 2020 Red Wings site ****/
/*** feeds calendar and gamelog ***/

window.onload = getGames;

//create an array of game info to be accessed by gameLog and calendar
const games = [];

//get today's date - format to match gameDate from api and format in my preferred format
//const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const d = new Date();
const yyyy = d.getFullYear();
let m = d.getMonth();
//let month = months[m];
let mm = m + 1 < 10 ? '0' + (m + 1) : (m + 1);
let dd = d.getDate();
dd = dd < 10 ? '0' + dd : dd;
const dayID = `${yyyy}-${mm}-${dd}`;
//const formDate = `${month} ${dd}, ${yyyy}`;

//has getGames() finished yet?
let done = false;

//assign team abbreviations
function teamAbbr(id) {
	switch(id) {
		case 1: return 'NJD';
		case 2: return 'NYI';
		case 3: return 'NYR';
		case 4: return 'PHI';
		case 5: return 'PIT';
		case 6: return 'BOS';
		case 7: return 'BUF';
		case 8: return 'MTL';
		case 9: return 'OTT';
		case 10: return 'TOR';
		case 12: return 'CAR';
		case 13: return 'FLA';
		case 14: return 'TBL';
		case 15: return 'WSH';
		case 16: return 'CHI';
		case 17: return 'DET';
		case 18: return 'NSH';
		case 19: return 'STL';
		case 20: return 'CGY';
		case 21: return 'COL';
		case 22: return 'EDM';
		case 23: return 'VAN';
		case 24: return 'ANA';
		case 25: return 'DAL';
		case 26: return 'LAK';
		case 28: return 'SJS';
		case 29: return 'CBJ';
		case 30: return 'MIN';
		case 52: return 'WPG';
		case 53: return 'ARI';
		case 54: return 'VGK';
	}
}

//Regular Season
//https://statsapi.web.nhl.com/api/v1/schedule?teamId=17&startDate=2018-10-01&endDate=2019-04-10

//Pre- and Regular Season
//https://statsapi.web.nhl.com/api/v1/schedule?teamId=17&season=20182019

function getGames() {
	fetch('https://statsapi.web.nhl.com/api/v1/schedule?teamId=17&startDate=2019-09-01&endDate=2020-04-30')
	.then((results) => results.json())
	.then((data) => {
		//console.log(data);
		let gameNo = 0;
		let prevOtl = 0;
		let gameResult = '';
		let detScore = 0;
		let oppScore = 0;
		let detWins = 0;
		let detLoss = 0;
		let detOtl = 0;
		let detRecord = '';
		let detPoints;
		for (let i = 0, l = data.dates.length; i < l; i++) {
			gameNo++;
			let gamePk = data.dates[i].games[0].gamePk;
			let gameDate = data.dates[i].date;
			let date = new Date(gameDate);

			let homeTeam = data.dates[i].games[0].teams.home.team.name;
			let homeTeamID = data.dates[i].games[0].teams.home.team.id;
			let homeTeamAbbr = teamAbbr(homeTeamID);
			let homeScore = data.dates[i].games[0].teams.home.score;

			let awayTeam = data.dates[i].games[0].teams.away.team.name;
			let awayTeamID = data.dates[i].games[0].teams.away.team.id;
			let awayTeamAbbr = teamAbbr(awayTeamID);
			let awayScore = data.dates[i].games[0].teams.away.score;

			let homeAway = 'away';

			if ( homeTeam === 'Detroit Red Wings') {
				homeAway = 'home';
				detWins = data.dates[i].games[0].teams.home.leagueRecord.wins;
				detLoss = data.dates[i].games[0].teams.home.leagueRecord.losses;
				detOtl = data.dates[i].games[0].teams.home.leagueRecord.ot;
				detScore = homeScore;
				oppScore = awayScore;
			} else if ( awayTeam === 'Detroit Red Wings') {
				detWins = data.dates[i].games[0].teams.away.leagueRecord.wins;
				detLoss = data.dates[i].games[0].teams.away.leagueRecord.losses;
				detOtl = data.dates[i].games[0].teams.away.leagueRecord.ot;
				detScore = awayScore;
				oppScore = homeScore;
			}

			if ( detScore !== 0 && oppScore !== 0 ) { 
				gameResult = detScore > oppScore ? 'win' : 'loss';
				if ( detOtl > prevOtl ) {
					gameResult = 'otl';
					prevOtl++;
				}
				detRecord = `${detWins} - ${detLoss} - ${detOtl}`;
				detPoints = (detWins * 2) + detOtl;
			}
			
			if ( data.dates[i].games[0].gameType === "PR") {
				detRecord = '';
				detPoints = '';
				gameNo = 0;
			}

			games.push({
				gameNo: (gameNo !== 0) ? gameNo : 'Pre',
				gameDate: gameDate,
				awayTeam: awayTeam,
				awayTeamAbbr: awayTeamAbbr,
				homeTeam: homeTeam,
				homeTeamAbbr: homeTeamAbbr,
				awayScore: awayScore,
				homeScore: homeScore,
				detScore: detScore,
				oppScore: oppScore,
				detRecord: detRecord,
				detPoints: detPoints,
				gameResult: gameResult,
				homeAway: homeAway
			});
		}
		
		done = true;
	});
}