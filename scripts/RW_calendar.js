/**** Calendar Scripts for 2023 Red Wings site ****/
/*** and call getGames.js for game info ***/

window.addEventListener('load', getGames(processGames));
window.addEventListener('load', startMonth);

// on initial load show current month
function startMonth() {

	// get current month
	let month = new Date().getMonth();
	console.log(month);

	// if it is out of season, open to October (main season)
	// September (training camp) through May (playoffs) = hockey season
	if (month < 8 && month > 4) {
		month = 9;
	}

	// get the tab number from the month number
	const monthTab = 
	[
		8,    //tab 0 - September
		9,    //tab 1 - October
		10,   //tab 2 - November
		11,   //tab 3 - December
		0,    //tab 4 - January
		1,    //tab 5 - February
		2,    //tab 6 - March
		3,    //tab 7 - April
		4     //tab 8 - May
	];

	// convert month to tab
	let t = monthTab.findIndex(v => v === month);

	showMonth(t);
}

function showMonth(t) {
	// create an array 'season' containing all the month divs in RW_calendar.html
	let season = document.querySelectorAll(".month");
	// create an array 'tabs' of the navigation tabs in RW_calendar.html
	let tabs = document.querySelectorAll(".monthtab");

	// set display to none and no active tabs to start
	season.forEach(i => i.style.display = "none");
	tabs.forEach(i => i.classList.remove("active"));
	
	//if season is over or no month is selected, show October
	let tab = (t >= season.length) ? 1 : t;
	
	//display selected month and give class active
	season[tab].style.display = "block";
	tabs[tab].classList += " active";
}



/***  Fill in the games  ***/
// callback from getGames()

function processGames() {
	for (let i = 0, l = games.length; i < l; i++) {

		let rowID = document.getElementById(games[i].gameDate);
		let detScore = 0;
		let oppScore = 0
		
		let teams = document.createElement("p");
		teams.setAttribute("class", "teams");
		rowID.appendChild(teams);

		if (games[i].homeAway === 'home') {
			teams.innerHTML = games[i].homeTeamAbbr + ' vs ' + games[i].awayTeamAbbr;
			rowID.setAttribute("class", "home");
			detScore = games[i].homeScore;
			oppScore = games[i].awayScore;
		} else {
			teams.innerHTML = games[i].awayTeamAbbr + ' @ ' + games[i].homeTeamAbbr;
			rowID.setAttribute("class", "away");
			detScore = games[i].awayScore;
			oppScore = games[i].homeScore;
		}

		if ( games[i].gameDate < dayID ) {
			let score = document.createElement("p");
			score.setAttribute("class", "score");
			rowID.appendChild(score);

			let points = document.createElement("p");
			points.setAttribute("class", "points");
			rowID.appendChild(points);

			score.innerHTML = detScore + ' - ' + oppScore;
			points.innerHTML = games[i].detRecord;
			rowID.classList.add(games[i].gameResult);
		}

		if (games[i].gameNo === 'Pre'){
			rowID.setAttribute("class", "pre");
		}
	}
}
