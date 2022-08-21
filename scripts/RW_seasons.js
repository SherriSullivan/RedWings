/**** createTable Script for 2021 Red Wings site ****/
/*** specific to seasons because of row:Stanley before the meat of the table
/*** feeds seasons ***/

window.onload = function () { years.reset(); };
window.onload = function() { createTable(2022); };

// The table looks like this:
//  rows are [i], columns are [j]
//  TeamName           id   2018   2017   2016   ...
//  Stanley	           --   tm-id  tm-id  tm-id  ...
//  Detroit Red Wings  det  101    98     110    ... 

function createTable(year) {
	// declare variables
	let i, j, l, t;
	let table, thead, thr, th1, th2, tr, td;

    let standings = document.querySelector("#standings");
    standings.innerHTML = "";

    // create the table
    table = document.createElement("table");
    table.setAttribute("id", "seasonStandings");

    // create the table header
    thead = document.createElement("thead");
    thr = document.createElement("tr");

    th1 = document.createElement("th");
    th1.innerText = "Team";
    thr.appendChild(th1);

    th2 = document.createElement("th");
    th2.innerText = "Points";
    thr.appendChild(th2);

    thead.appendChild(thr);
    table.appendChild(thead);

    // create the table body
    // loop through all the teams in seasons.js
    // teams start in row 3
    for (let i = 2, l = seasons.length; i < l; i++) {
        // create a row for each team
        tr = document.createElement("tr");
        // loop through all the years and seasons for that team
        for (let j = 0, t = seasons[i].length; j < t; j++) {
            // j1 is team abbreviation - skip j1
            if (j !== 1) {
                // add team and seasons as data cells
                td = document.createElement("td");
                td.innerText = seasons[i][j];
            	tr.appendChild(td);
            }

            // add team abbr as id to team row
            tr.setAttribute("id", seasons[i][1]);

            // display only selected year
            if ((j > 1) && (seasons[0][j] != year)) { td.style.display = "none"; }

            // if teamID matches stanleyID add class 'stanley'
            if ((seasons[0][j] == year) && (seasons[i][1] == seasons[1][j])) {
                tr.setAttribute("class", "stanley");
            }

            // if there is no team data for that year, don't display the row
            if ((seasons[0][j] == year) && (seasons[i][j] === '') || (seasons[i][j] === null)) {
            	tr.style.display = "none"; 
            }
        }
        table.appendChild(tr);
    }
    standings.appendChild(table);
    sortTable("seasonStandings", "desc", year);
}



/***   sort the table based on table id, direction, column number (year)   ***/
function sortTable(tbl, dir, year) {
    let rows, switching, i, l, n, x, xData, y, yData, shouldSwitch, switchcount = 0;

    // locate the table you want to switch
    let table = document.querySelector('#' + tbl);

    // change year to column number
    n = 2023 - year;

    // switching is true until the table is completely sorted
    switching = true;

    // if no dir given do ascending sort
    //if (!dir) { dir = "asc"; }

    // continue until no more switching
    while (switching) {

        // nothing has been switched yet
        switching = false;

        // get the table rows
        rows = table.querySelectorAll("tr");
        l = rows.length - 1;

        //iterate through rows skipping table headers
        for (i = 1; i < l; i++) {
            // nothing should switch yet
            shouldSwitch = false;

            // compare this row's year data to next
            x = rows[i].querySelectorAll("td")[n];
            // string sort - ensure 3 characters
            xData = ("00" + x.innerText.toString()).slice(-3);

            // compare the next row's year data to this
            y = rows[i + 1].getElementsByTagName("td")[n];
            // string sort - ensure 3 characters
            yData = ("00" + y.innerText.toString()).slice(-3);

            //  ascending sort
            if (dir === "asc") {
                if (xData > yData) {
                    shouldSwitch = true;
                    // break out of row iteration loop to if(shouldSwitch) then restart row iteration
                    break;
                }
            // descending sort
            } else if (dir === "desc") {
                if (xData < yData) {
                    shouldSwitch = true;
                    // break out of row iteration loop to if(shouldSwitch) then restart row iteration
                    break;
                }
            } // end asc/desc sort
        } // end iterating through rows 

        // if we got to here, everything is correctly sorted
        // if shouldSwitch is true
        if (shouldSwitch) {
            // switch the rows (i is the same as it was at the break - that's why it was initialized up top)
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
            // mark switching as true to continue sorting ( while(switching) - remember? )
            switching = true;
            //increment switchcount - this factors into the else portion of the if/else
            switchcount++;

        // if shouldSwitch is false, it must be time to sort in the other direction
        } else {
            //sort in the opposite direction
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}