function convertDate(timeStamp){
    var date = new Date(timeStamp*1000);
// Hours part from the timestamp
var days = date.getDay();
// Minutes part from the timestamp
var month =   date.getMonth();
// Seconds part from the timestamp
var year = date.getFullYear();

// Will display time in 10:30:23 format
var formattedTime = days+"-"+month+"-"+year;
return formattedTime;
}

const Helper = {
    convertDate
}

export default Helper;