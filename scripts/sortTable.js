/* specific to RW_Standings table since points are buried in the meter element in the second column and are numeric */
/* improve someday by making a generic sort function and passing in correct variables, or other solution */
//window.addEventListener('load', function() {sortTable('pointsTable', 'desc', 1);}, false);
function sortTable(table, d, n) {
    table = document.getElementById(table);
    let dir = d ? d : "asc";
    let rows = table.getElementsByTagName("tr");
    let l = rows.length;
    let switching = true;
    let x;
    let y;
    let shouldSwitch = true;
    let switchcount = 0;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (var i = 1; i < l - 1; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            /*points are in the meter element*/
            if (n === 1) {
                x = parseInt(rows[i].getElementsByTagName("td")[n].firstChild.innerHTML);
                y = parseInt(rows[i + 1].getElementsByTagName("td")[n].firstChild.innerHTML);
                /*teams are in the td*/
            } else {
                x = rows[i].getElementsByTagName("td")[n].innerHTML;
                y = rows[i + 1].getElementsByTagName("td")[n].innerHTML;
            }
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x > y) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x < y) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}