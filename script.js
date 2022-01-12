let fetchedData;

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        fetchedData = data;
        main();
    });

function clearButtons(timeframe) {
    let buttons = document.getElementsByClassName('button');

    for(i=0; i<buttons.length; i++) {
        if(buttons[i].id === timeframe)
            buttons[i].style.color = "white";
        else
            buttons[i].style.color = "hsl(235, 45%, 61%)";
    }
}

function changeTimeframe(timeframe) {
    fetchedData.forEach(element => {
        let timeSelector = `#${element.title.toLowerCase().replace(' ', '')} .currentTime`;
        let time = element.timeframes[timeframe].current;
        let preText;

        if(time == 1) time = time + 'hr';
        else time = time + 'hrs';

        document.querySelector(timeSelector).innerHTML = time;

        timeSelector = `#${element.title.toLowerCase().replace(' ', '')} .prevTime`;
        time = element.timeframes[timeframe].previous;

        if(time == 1) time = time + 'hr';
        else time = time + 'hrs';

        if(timeframe === 'daily') preText = 'Yesterday - ';
        else if (timeframe === 'weekly') preText = 'Last-week - ';
        else preText = 'Last-month - ';

        document.querySelector(timeSelector).innerHTML = preText + time;
    });
    clearButtons(timeframe);
}; 

function main() {
    console.log(fetchedData);
    let currentTimeframe = "weekly"
    changeTimeframe(currentTimeframe);
}
