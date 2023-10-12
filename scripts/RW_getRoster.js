/**** Roster Script for 2023/24 Red Wings site ****/

// create an array to hold the Red Wings roster
var RWroster = [];

// use async/await function to fetch the roster and stats data
// because I am doing two different fetches, I have to await the proper responses
async function getRoster() {
    let rosterResponse = await fetch('https://statsapi.web.nhl.com/api/v1/teams/17/roster?expand=roster.person');
    let data = await rosterResponse.json();

    for (var i = 0, l = data.roster.length; i < l; i++) {
        let rank = '';
        let rookie = '';

        ID = data.roster[i].person.id;

        nmbr = data.roster[i].jerseyNumber;
        if (!nmbr) { nmbr = '--'; }

        fName = data.roster[i].person.firstName;
        lName = data.roster[i].person.lastName;
        fullname = data.roster[i].person.fullName;

        if (data.roster[i].person.captain === true) { rank = "C"; }
        else if (data.roster[i].person.alternateCaptain === true) { rank = "A"; }

        rookie = data.roster[i].person.rookie;
        rookie = (rookie) ? 'rookie' : '';

        position = data.roster[i].position.name;
        type = data.roster[i].position.type;

        age = data.roster[i].person.currentAge;
        ht = data.roster[i].person.height;
        wt = data.roster[i].person.weight;
        shoots = data.roster[i].person.shootsCatches;

        city = data.roster[i].person.birthCity;
        stateProv = data.roster[i].person.birthStateProvince;
        if (!stateProv) { stateProv = ''; }
        country = data.roster[i].person.birthCountry;

        // using the player ID, get that player's stats
        let statsResponse = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${ID}/stats?stats=statsSingleSeason`);
        playerStats = await statsResponse.json();

        // stats is an object containing games, goals, assists, plusMinus, points, hits
        let games, goals, assists, plusMinus, points, hits;

        // goalie stats are games, starts, wins, losses, savePerc, shutouts;
        const goalieStats = {
            games: 0,
            starts: 0,
            wins: 0,
            losses: 0,
            savePerc: 0,
            shutouts: 0
        };

        // without this if/else I get error: TypeError: playerStats.stats[0].splits[0] is undefined
        if (!playerStats.stats[0].splits[0]) {
            games = 0;
            goals = 0;
            assists = 0;
            plusMinus = 0;
            points = 0;
            hits = 0;
        } else if (position === 'Goalie') {
            games = (playerStats.stats[0].splits[0].stat.games) ? playerStats.stats[0].splits[0].stat.games : 0;
            starts = (playerStats.stats[0].splits[0].stat.gamesStarted) ? playerStats.stats[0].splits[0].stat.gamesStarted : 0;
            wins = (playerStats.stats[0].splits[0].stat.wins) ? playerStats.stats[0].splits[0].stat.wins : 0;
            losses = (playerStats.stats[0].splits[0].stat.losses) ? playerStats.stats[0].splits[0].stat.losses : 0;
            savePerc = (playerStats.stats[0].splits[0].stat.savePercentage) ? playerStats.stats[0].splits[0].stat.savePercentage : 0;
            shutouts = (playerStats.stats[0].splits[0].stat.shutouts) ? playerStats.stats[0].splits[0].stat.shutouts : 0;
            goalieStats.games = games;
            goalieStats.starts = starts;
            goalieStats.wins = wins;
            goalieStats.losses = losses;
            goalieStats.savePerc = savePerc;
            goalieStats.shutouts = shutouts;
        } else {
            games = (playerStats.stats[0].splits[0].stat.games) ? playerStats.stats[0].splits[0].stat.games : 0;
            goals = (playerStats.stats[0].splits[0].stat.goals) ? playerStats.stats[0].splits[0].stat.goals : 0;
            assists = (playerStats.stats[0].splits[0].stat.assists) ? playerStats.stats[0].splits[0].stat.assists : 0;
            plusMinus = (playerStats.stats[0].splits[0].stat.plusMinus) ? playerStats.stats[0].splits[0].stat.plusMinus : 0;
            points = (playerStats.stats[0].splits[0].stat.points) ? playerStats.stats[0].splits[0].stat.points : 0;
            hits = (playerStats.stats[0].splits[0].stat.hits) ? playerStats.stats[0].splits[0].stat.hits : 0;
        }
        if (position === 'Goalie') {
            stats = goalieStats;
        } else {
            stats = {
                games: games,
                goals: goals,
                assists: assists,
                plusMinus: plusMinus,
                points: points,
                hits: hits
            };
        }


        RWroster.push({
            ID: ID,
            nmbr: nmbr,
            fName: fName,
            lName: lName,
            fullname: fullname,
            rank: rank,
            rookie: rookie,
            position: position,
            type: type,
            age: age,
            ht: ht,
            wt: wt,
            shoots: shoots,
            city: city,
            stateProv: stateProv,
            country: country,
            stats: stats
        });
    }
    makeCards();
}


function makeCards() {
    for (var i = 0, l = RWroster.length; i < l; i++) {
        var card = document.createElement("article");
        card.setAttribute("id", RWroster[i].ID);
        card.classList.add(RWroster[i].type);
        card.classList.add("flip");
        card.setAttribute("tabindex", 0);

        var flip_inner = document.createElement("div");
        flip_inner.setAttribute("class", "flip-inner");

        var flip_front = document.createElement("div");
        flip_front.setAttribute("class", "flip-front");

        var flip_back = document.createElement("div");
        flip_back.setAttribute("class", "flip-back");

        card.appendChild(flip_inner);
        flip_inner.appendChild(flip_front);
        flip_inner.appendChild(flip_back);

        if (RWroster[i].position === 'Goalie') {
            flip_front.innerHTML = "<h1>#" + RWroster[i].nmbr + "<br/>" +
                RWroster[i].lName + "</h1>" +
                "<p class='rank'>" + RWroster[i].rank + RWroster[i].rookie + "</p>" +
                "<h2 class='position " + RWroster[i].type + "'>" + RWroster[i].position + "</h2>" +
                "<p>Games Played: " + RWroster[i].stats.games + " : " + "Starts: " + RWroster[i].stats.starts + "</p>" +
                "<p>Wins: " + RWroster[i].stats.wins + " : " + "Losses: " + RWroster[i].stats.losses + "</p>" +
                "<p>Save %: " + RWroster[i].stats.savePerc + "</p>" +
                "<p>SHUTOUTS: " + RWroster[i].stats.shutouts + "</p>";
        } else {
            flip_front.innerHTML = "<h1>#" + RWroster[i].nmbr + "<br/>" +
                RWroster[i].lName + "</h1>" +
                "<p class='rank'>" + RWroster[i].rank + RWroster[i].rookie + "</p>" +
                "<h2 class='position " + RWroster[i].type + "'>" + RWroster[i].position + "</h2>" +
                "<p>Games Played: " + RWroster[i].stats.games + "</p>" +
                "<p>Points: " + RWroster[i].stats.points + "</p>" +
                "<p>Goals: " + RWroster[i].stats.goals + " : Assists: " + RWroster[i].stats.assists + "</p>" +
                "<p>Plus / Minus: " + RWroster[i].stats.plusMinus + "</p>" +
                "<p>Hits: " + RWroster[i].stats.hits + "</p>";
        }
        flip_back.innerHTML += "<h2>" + RWroster[i].fullname + "</h2>" +
            "<p>Age: " + RWroster[i].age + "</p>" +
            "<p>Ht: " + RWroster[i].ht + ", Wt: " + RWroster[i].wt + "</p>" +
            "<p>Shoots: " + RWroster[i].shoots + "</p>" +
            "<p>From: " + RWroster[i].city + ", " + RWroster[i].stateProv + "<br/>" +
            RWroster[i].country + "</p><br/>" +
            "<a href='https://www.nhl.com/player/" + RWroster[i].ID + "' target='_blank' class='linkButton'>Player Info</a>";

        document.getElementById("deck").appendChild(card);
    }
}

getRoster();