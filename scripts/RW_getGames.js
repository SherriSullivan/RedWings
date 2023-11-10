/** ** getGames Scripts for 2023/24 Red Wings site ****/
/** * feeds calendar and gamelog ***/

import gameData from '../files/gameData.js'

// create an array of game info to be accessed by gameLog and calendar
const games = []

// get today's date - format to match gameDate from api
const d = new Date()
const yyyy = d.getFullYear()
const m = d.getMonth()
const mm = m + 1 < 10 ? '0' + (m + 1) : (m + 1)
let dd = d.getDate()
dd = dd < 10 ? '0' + dd : dd
const dayID = `${yyyy}-${mm}-${dd}`

// assign team abbreviations
function teamAbbr (id) {
  switch (id) {
    case 1: return 'NJD'
    case 2: return 'NYI'
    case 3: return 'NYR'
    case 4: return 'PHI'
    case 5: return 'PIT'
    case 6: return 'BOS'
    case 7: return 'BUF'
    case 8: return 'MTL'
    case 9: return 'OTT'
    case 10: return 'TOR'
    case 12: return 'CAR'
    case 13: return 'FLA'
    case 14: return 'TBL'
    case 15: return 'WSH'
    case 16: return 'CHI'
    case 17: return 'DET'
    case 18: return 'NSH'
    case 19: return 'STL'
    case 20: return 'CGY'
    case 21: return 'COL'
    case 22: return 'EDM'
    case 23: return 'VAN'
    case 24: return 'ANA'
    case 25: return 'DAL'
    case 26: return 'LAK'
    case 28: return 'SJS'
    case 29: return 'CBJ'
    case 30: return 'MIN'
    case 52: return 'WPG'
    case 53: return 'ARI'
    case 54: return 'VGK'
    case 55: return 'SEA'
  }
}

// function getGames(callback) {
//   // fetch('https://statsapi.web.nhl.com/api/v1/schedule?teamId=17&season=20232024')
//   fetch('https://api-web.nhle.com/v1/club-schedule-season/det/20232024')
//     .then(response => console.log(response))
//     .catch(error => console.error(error))
//     .then((results) => results.json())
//     .then((data) => {

function buildGames () {
  // initialize variables
  let gameNo = 0
  let gameResult = ''
  let detScore = 0
  let oppScore = 0
  let detWins = 0
  let detLoss = 0
  let detOtl = 0
  let detRecord = ''
  let detPoints

  for (let i = 0, l = gameData.games.length; i < l; i++) {
    gameNo++
    const finished = gameData.games[i].gameState === 'FINAL' || gameData.games[i].gameState === 'OFF'
    const gameDate = gameData.games[i].gameDate
    const date = new Date(gameDate)
    const homeTeamID = gameData.games[i].homeTeam.id
    const homeTeamAbbr = teamAbbr(homeTeamID)
    const homeScore = gameData.games[i].homeTeam.score
    const awayTeamID = gameData.games[i].awayTeam.id
    const awayTeamAbbr = teamAbbr(awayTeamID)
    const awayScore = gameData.games[i].awayTeam.score
    let homeAway = 'away'

    if (homeTeamAbbr === 'DET') {
      homeAway = 'home'
      detScore = homeScore
      oppScore = awayScore
    } else if (awayTeamAbbr === 'DET') {
      detScore = awayScore
      oppScore = homeScore
    }

    if (finished) {
      const wentOT = gameData.games[i].gameOutcome.lastPeriodType === 'OT'
      gameResult = detScore > oppScore ? 'win' : 'loss'

      if (wentOT && gameResult === 'loss') {
        gameResult = 'otl'
      }

      if (gameResult === 'win') {
        detWins++
      } else if (gameResult === 'loss') {
        detLoss++
      } else if (gameResult === 'otl') {
        detOtl++
      } else {
        console.log('error processing record')
      }

      detRecord = `${detWins} - ${detLoss} - ${detOtl}`
      detPoints = (detWins * 2) + detOtl
    }

    if (gameData.games[i].gameType === 1) {
      detRecord = ''
      detPoints = ''
      gameNo = 0
    }

    games.push({
      gameNo: (gameNo !== 0) ? gameNo : 'Pre',
      finished: finished,
      gameDate: gameDate,
      awayTeamAbbr: awayTeamAbbr,
      homeTeamAbbr: homeTeamAbbr,
      awayScore: awayScore,
      homeScore: homeScore,
      detScore: detScore,
      oppScore: oppScore,
      detRecord: detRecord,
      detPoints: detPoints,
      gameResult: gameResult,
      homeAway: homeAway
    })
  }
}

buildGames()
export { games }
