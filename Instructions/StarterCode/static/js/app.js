// from data.js
const tableData = data;
//console.log(tableData)

// Use D3 to select the table body
const tbody = d3.select("tbody");


function buildtable(data){

    tbody.html("");
    data.forEach(element => {

        // Append one table row `tr` to the table body
        var row = tbody.append("tr");

        Object.values(element).forEach((val) => {
            var rowData = row.append("td");
            rowData.text(val);

        });
    });
}




// Make Button
var button = d3.select("#filter-btn");
button.on("click", handleClick);

// Grab info we need 



// This function is triggered when the button is clicked
function handleClick() {

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    buildtable(tableData);

}

buildtable(tableData);