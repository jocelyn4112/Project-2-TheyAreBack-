function optionChanged(id) {
    getData(id);
}

function getData(id) {
    d3.json('test').then(function(response){
        console.log('this is a function')
        selectedyear = response.filter(s => s.Year.toString() === id);
        loop(selectedyear)
        submitID = d3.select("#submit");
        submitID.on("click", function(){
            d3.event.preventDefault();
                Input_city = d3.select("#city");
                Input_state = d3.select("#state");
                Input_shape = d3.select("#shape");
                loopData = selectedyear.filter(ufo =>{
                    return (ufo.city===Input_city.property("value") || !Input_city.property("value")) &&
                    (ufo.state===Input_state.property("value") || !Input_state.property("value")) &&
                    (ufo.shape===Input_shape.property("value") || !Input_shape.property("value"))
                })
        loop(loopData);
        });
        filterData = d3.selectAll('.form-control');
        Reset = d3.select("#clear");
        Reset.on('click', function () {
            clearEntries(filterData)
        });
    });
};

d3.json('test').then(function(response){
    selectedyear = response.filter(s => s.Year.toString() === "1993");    
    yeardrops = []
    for (var i=0; i < response.length; i++){
        yeardrops.push(response[i].Year);
    };
    uyeardrops = Array.from(new Set(yeardrops));
    select = document.getElementById("selDataset");
    for (var i=0; i < uyeardrops.length; i++){
        var optn = uyeardrops[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
    };
    loop(selectedyear)
    submitID = d3.select("#submit");
    submitID.on("click", function() {
        d3.event.preventDefault();
        Input_city = d3.select("#city");
        Input_state = d3.select("#state");
        Input_shape = d3.select("#shape");
        loopData = selectedyear.filter(ufo =>{
            return (ufo.city===Input_city.property("value") || !Input_city.property("value")) &&
            (ufo.state===Input_state.property("value") || !Input_state.property("value")) &&
            (ufo.shape===Input_shape.property("value") || !Input_shape.property("value"))
        })
        loop(loopData);
    });
    filterData = d3.selectAll('.form-control');
    Reset = d3.select("#clear");
    Reset.on('click', function () {
        clearEntries(filterData)
    });
});

// Create a loop & use Object
function loop(something){
    tbody = d3.select("tbody")
    tbody.text("")
    something.forEach(function(ufo){
        tr_data = tbody.append("tr")
        Object.entries(ufo).forEach(function([key, value]){
            addRow = tr_data.append("td").text(value)   
        })
    })
};

function clearEntries(filt) {
    filters = {};
    filt._groups[0].forEach(par => {
        if (par.value != 0) {
            d3.select('#' + par.id).node().value = "";
        }
    });
};
