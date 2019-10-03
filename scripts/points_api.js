// jshint esversion: 6

/**** Points Scripts for 2020 Red Wings site ****/
/*** feeds standings ***/

window.onload = getPoints;

// let there always be a min/max for meters
let teamid, teampoints, maxPts = 20, minPts = 10;
let points = {};

function getPoints() {
	fetch('https://statsapi.web.nhl.com/api/v1/standings?season=20192020')
	.then((results) => results.json())
	.then((data) => {
		for (let i = 0, l = data.records.length; i < l; i++) { // division level
			for (let j = 0, t = data.records[i].teamRecords.length; i < t; j++) { //get team records
				teamid = data.records[i].teamRecords[j].team.id;
				teampoints = data.records[i].teamRecords[j].points;
				assignPoints(teamid, teampoints);
			}
		}
		setPoints();
	});
}


function assignPoints(team, pts) {
	switch(team) {
		case 1: points.njd_pts = pts; break;
		case 2: points.nyi_pts = pts; break;
		case 3: points.nyr_pts = pts; break;
		case 4: points.phi_pts = pts; break;
		case 5: points.pit_pts = pts; break;
		case 6: points.bos_pts = pts; break;
		case 7: points.buf_pts = pts; break;
		case 8: points.mtl_pts = pts; break;
		case 9: points.ott_pts = pts; break;
		case 10: points.tor_pts = pts; break;
		case 12: points.car_pts = pts; break;
		case 13: points.fla_pts = pts; break;
		case 14: points.tbl_pts = pts; break;
		case 15: points.wsh_pts = pts; break;
		case 16: points.chi_pts = pts; break;
		case 17: points.det_pts = pts; break;
		case 18: points.nsh_pts = pts; break;
		case 19: points.stl_pts = pts; break;
		case 20: points.cgy_pts = pts; break;
		case 21: points.col_pts = pts; break;
		case 22: points.edm_pts = pts; break;
		case 23: points.van_pts = pts; break;
		case 24: points.ana_pts = pts; break;
		case 25: points.dal_pts = pts; break;
		case 26: points.lak_pts = pts; break;
		case 28: points.sjs_pts = pts; break;
		case 29: points.cbj_pts = pts; break;
		case 30: points.min_pts = pts; break;
		case 52: points.wpg_pts = pts; break;
		case 53: points.ari_pts = pts; break;
		case 54: points.vgk_pts = pts; break;
	}
}

function getMinMax() {
	for ( let key in points ) {
		if (maxPts < points[key]) { maxPts = points[key]; }
		if (minPts > points[key] - 2) { minPts = (points[key] - 2); }
	}
}
	
function setPoints() {
	getMinMax();
	for ( let key in points) {
		document.getElementById(key).innerHTML = points[key];
		document.getElementById(key).setAttribute('value', points[key]);
		document.getElementById(key).setAttribute('min', minPts);
		document.getElementById(key).setAttribute('max', maxPts);
	}
	sortTable('pointsTable', 'desc', 1);
}