const seasons = [
    ["Team", "id", 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996],
    ["Stanley", "", "col", "tbl", "tbl", "stl", "wsh", "pit", "pit", "chi", "lak", "chi", "lak", "bos", "chi", "pit", "det", "ana", "car", "", "tbl", "njd", "det", "col", "njd", "dal", "det", "det", "col"],
    ["Anaheim Ducks", "ana", 76, 43, 67, 80, 101, 105, 103, 109, 116, 66, 80, 99, 89, 91, 102, 110, 98, "", 76, 95, 69, 66, 83, 83, 65, 85, 78],
    ["Arizona Coyotes", "ari", 57, 54, 74, 86, 70, 70, 78, 56, 89, 51, 97, 99, 107, 79, 83, 67, 81, "", 68, 78, 95, 90, 90, 90, 82, 83, ""],
    ["Atlanta Thrashers", "atl", "", "", "", "", "", "", "", "", "", "", "", 80, 83, 76, 76, 97, 90, "", 78, 74, 54, 60, 39, "", "", "", ""],
    ["Boston Bruins", "bos", 107, 73, 100, 107, 112, 95, 93, 96, 117, 62, 102, 103, 91, 116, 94, 76, 74, "", 104, 87, 101, 88, 73, 91, 91, 61, 91],
    ["Buffalo Sabres", "buf", 75, 37, 68, 76, 62, 78, 81, 54, 52, 48, 89, 96, 100, 91, 90, 113, 110, "", 85, 72, 82, 98, 85, 91, 89, 92, 73],
    ["Calgary Flames", "cgy", 111, 55, 79, 107, 84, 94, 77, 97, 77, 42, 90, 94, 90, 98, 94, 96, 103, "", 94, 75, 79, 73, 77, 72, 67, 73, 79],
    ["Carolina Hurricanes", "car", 116, 80, 81, 99, 83, 87, 86, 71, 83, 42, 82, 91, 80, 97, 92, 88, 112, "", 76, 61, 91, 88, 84, 86, 74, "", ""],
    ["Chicago Blackhawks", "chi", 68, 55, 72, 84, 76, 109, 103, 102, 107, 77, 101, 97, 112, 104, 88, 71, 65, "", 59, 79, 96, 71, 78, 70, 73, 81, 94],
    ["Colorado Avalanche", "col", 119, 82, 92, 90, 95, 48, 82, 90, 112, 39, 88, 68, 95, 69, 95, 95, 95, "", 100, 105, 99, 118, 96, 98, 95, 107, 104],
    ["Columbus Blue Jackets", "cbj", 81, 48, 81, 98, 97, 108, 76, 89, 93, 55, 65, 81, 79, 92, 80, 73, 74, "", 62, 69, 57, 71, "", "", "", "", ""],
    ["Dallas Stars", "dal", 98, 60, 82, 93, 92, 79, 109, 92, 91, 48, 89, 95, 88, 83, 97, 107, 112, "", 97, 111, 90, 106, 102, 114, 109, 104, 66],
    ["Detroit Red Wings", "det", 74, 48, 39, 74, 73, 79, 93, 100, 93, 56, 102, 104, 102, 112, 115, 113, 124, "", 109, 110, 116, 111, 108, 93, 103, 94, 131],
    ["Edmonton Oilers", "edm", 104, 72, 83, 79, 78, 103, 70, 62, 67, 45, 74, 62, 62, 85, 88, 71, 95, "", 89, 92, 92, 93, 88, 78, 80, 81, 68],
    ["Florida Panthers", "fla", 122, 79, 78, 86, 96, 81, 103, 91, 66, 36, 94, 72, 77, 93, 85, 86, 85, "", 75, 70, 60, 66, 98, 78, 63, 89, 92],
    ["Hartford Whalers", "hrt", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 75, 77],
    ["Los Angeles Kings", "lak", 99, 49, 64, 71, 98, 86, 102, 95, 100, 59, 95, 98, 101, 79, 71, 68, 89, "", 81, 78, 95, 92, 94, 69, 87, 67, 66],
    ["Minnesota Wild", "min", 113, 75, 77, 83, 101, 106, 87, 100, 98, 55, 81, 86, 84, 89, 98, 104, 84, "", 83, 95, 73, 68, "", "", "", "", ""],
    ["Montreal Canadiens", "mtl", 55, 59, 71, 96, 71, 103, 82, 110, 100, 63, 78, 96, 88, 93, 104, 90, 93, "", 93, 77, 87, 70, 83, 75, 87, 77, 90],
    ["Nashville Predators", "nsh", 97, 64, 78, 100, 117, 94, 96, 104, 88, 41, 104, 99, 100, 88, 91, 110, 106, "", 91, 74, 69, 80, 70, 63, "", "", ""],
    ["New Jersey Devils", "njd", 63, 45, 68, 72, 97, 70, 84, 78, 88, 48, 102, 81, 103, 106, 99, 107, 101, "", 100, 108, 95, 111, 103, 105, 107, 104, 86],
    ["New York Islanders", "nyi", 84, 71, 80, 103, 80, 94, 100, 101, 79, 55, 79, 73, 79, 61, 79, 92, 78, "", 91, 83, 96, 52, 58, 58, 71, 70, 54],
    ["New York Rangers", "nyr", 110, 60, 79, 78, 77, 102, 101, 113, 96, 56, 109, 93, 87, 95, 97, 94, 100, "", 69, 78, 80, 75, 73, 77, 68, 86, 96],
    ["Ottawa Senators", "ott", 73, 51, 62, 64, 67, 98, 85, 99, 88, 56, 92, 74, 94, 83, 94, 105, 113, "", 102, 113, 94, 109, 95, 103, 83, 77, 41],
    ["Philadelphia Flyers", "phi", 61, 58, 89, 82, 98, 88, 96, 84, 94, 49, 103, 106, 88, 99, 95, 56, 101, "", 101, 107, 97, 100, 105, 93, 95, 103, 103],
    ["Pittsburgh Penguins", "pit", 103, 77, 86, 100, 100, 111, 104, 98, 109, 72, 108, 106, 101, 99, 102, 105, 58, "", 58, 65, 69, 96, 88, 90, 98, 84, 102],
    ["Seattle Kraken", "sea", 60, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["San Jose Sharks", "sjs", 77, 49, 63, 101, 100, 99, 98, 89, 111, 57, 96, 105, 113, 117, 108, 107, 99, "", 104, 73, 99, 95, 87, 80, 78, 62, 47],
    ["St Louis Blues", "stl", 109, 63, 94, 99, 94, 99, 107, 109, 111, 60, 109, 87, 90, 92, 79, 81, 57, "", 91, 99, 98, 103, 114, 87, 98, 83, 80],
    ["Tampa Bay Lightning", "tbl", 110, 75, 92, 128, 113, 94, 97, 108, 101, 40, 84, 103, 80, 66, 71, 93, 92, "", 106, 93, 69, 59, 54, 47, 44, 74, 88],
    ["Toronto Maple Leafs", "tor", 115, 77, 81, 100, 105, 95, 69, 68, 84, 57, 80, 85, 74, 81, 83, 91, 90, "", 103, 98, 100, 90, 100, 97, 69, 68, 80],
    ["Vancouver Canucks", "van", 92, 50, 78, 81, 73, 69, 75, 101, 83, 59, 111, 117, 103, 100, 88, 105, 92, "", 101, 104, 94, 90, 83, 58, 64, 77, 79],
    ["Vegas Golden Knights", "vgk", 94, 82, 86, 93, 109, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["Washington Capitals", "wsh", 100, 77, 90, 104, 105, 118, 120, 101, 90, 57, 92, 107, 121, 108, 94, 70, 70, "", 59, 92, 85, 96, 102, 68, 92, 75, 89],
    ["Winnipeg Jets", "wpg", 89, 63, 80, 99, 114, 87, 78, 99, 84, 51, 84, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 78]
];

// for (let season of seasons) {
//     console.log(season[0], season.length);
// }