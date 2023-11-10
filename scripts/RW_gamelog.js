/** ** Gamelog Scripts for 2023/2024 Red Wings site ****/
/** * pulls info from getGames.js ***/
import { games } from './RW_getGames.js'

window.addEventListener('load', processGames)

// assign values based on screen width (full name/abbreviation)
let w = window.innerWidth

window.addEventListener('resize', () => {
  w = window.innerWidth
  processGames()
})

// create rows and cells from games array created by getGames.js
function processGames () {
  var table = document.querySelector('#currentSeason')

  // create a row for each game
  for (let i = 0, l = games.length; i < l; i++) {
    const row = document.createElement('tr')
    row.setAttribute('id', games[i].gameDate)

    if (games[i].gameNo === 'Pre') {
      continue
    }

    // if opponenet is TOR set row class to 'tor'
    if (games[i].homeTeamAbbr === 'TOR' || games[i].awayTeamAbbr === 'TOR') {
      row.classList.add('tor')
    }

    // create a table cell for game number
    const gameNo = document.createElement('td')
    gameNo.innerHTML = games[i].gameNo
    row.appendChild(gameNo)

    // create a table cell for date
    const date = document.createElement('td')
    date.innerHTML = games[i].gameDate
    row.appendChild(date)

    // create a table cell for home/away
    const gameAt = document.createElement('td')
    row.appendChild(gameAt)

    // create a table cell for opponent
    const opp = document.createElement('td')
    row.appendChild(opp)

    // set away games to '@'
    if (games[i].homeAway === 'away') {
      gameAt.innerHTML = '@'
      opp.innerHTML = games[i].homeTeamAbbr
    }

    // set home games to 'vs'
    if (games[i].homeAway === 'home') {
      gameAt.innerHTML = 'vs'
      opp.innerHTML = games[i].awayTeamAbbr
    }

    // create a table cell for score
    const score = document.createElement('td')
    row.appendChild(score)

    // create a table cell for DET record
    const record = document.createElement('td')
    row.appendChild(record)

    // create a table cell for DET points
    const points = document.createElement('td')
    row.appendChild(points)

    // display according to past or future game and screen size
    // if game is finished
    if (games[i].finished) {
      // remove opacity and make background white
      row.style.removeProperty('opacity')
      row.style.background = 'white'

      // and on a small screen
      if (w < 900) {
        // display only scores (DET first)
        score.innerHTML = games[i].detScore + ' | ' + games[i].oppScore
        // on a large screen
      } else {
        // display DET: and score
        score.innerHTML = 'DET: ' + games[i].detScore + ' | '
        // if home game display away abbr else home abbr
        score.innerHTML += games[i].homeAway === 'home' ? games[i].awayTeamAbbr : games[i].homeTeamAbbr
        // and score
        score.innerHTML += ': ' + games[i].oppScore
      }

      // set record and points to record and points
      record.innerHTML = games[i].detRecord
      points.innerHTML = games[i].detPoints

      // add 'win' 'loss' 'otl' to score and row classes
      score.classList.add(games[i].gameResult)
      row.classList.add(games[i].gameResult)

      // if game hasn't happened yet set opacity to two-thirds
    } else {
      row.style.opacity = 0.67
    }
    table.appendChild(row)
  }
}
