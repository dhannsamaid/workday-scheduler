

const workHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM"];

for (let i = 0; i < workHours.length ; i++) {
    const newHourRow = $("<div class='row' time-block>").attr('data-hour', workHours[i]);
    // const hourBlock = $("<div class='col hour'>").html(workHours[i]);
    // newHourRow.append(hourBlock);
    newHourRow.append("<textarea class='col description'>");
    newHourRow.append("<button class='col saveBtn'><span class='material-symbols-outlined'>save</span></button>");

    const timeline = $(`<div class='row timeline'><div class='hour'>${workHours[i]}</div><div class='hr'></div></div>`);
    $('.container').append(timeline);
    $('.container').append(newHourRow);
}

function displayDateTime() {
    const currentDateDisplay = moment().format("ddd MMM DD YYYY");
    const currentHourDisplay = moment().format("hh");
    const currentMinDisplay = moment().format("mm");
    $('#currentDay').text(currentDateDisplay);
    $('#currentHour').text(currentHourDisplay);
    $('#currentMin').text(currentMinDisplay);
}

function saveEvent() {
    const textToSave = $(this).prev('textarea').val();
    const hourToSave = $(this).parent('.row').attr('data-hour');
    // console.log(`textToSave: ${textToSave}\nhourToSave: ${hourToSave}`);

    localStorage.setItem(hourToSave, textToSave);
}

function getSavedData() {
    //find keys that match workHours

    for (let i = 0; i < workHours.length; i++) {
        const hourToGet = workHours[i];

        // is there an key saved in localstorage that matches?
        const storedText = localStorage.getItem(hourToGet);

        if (storedText) {
            $(`[data-hour=${hourToGet}]`).find('textarea').val(storedText);
        }

    }
}

function indicatorValue() {
    const currentHour = moment().format('k');
    const hour9offset = currentHour - 9;
    // console.log('currentHour:', currentHour);
    // console.log('hour9offset: ', hour9offset);
    const gradPercent = `${hour9offset/8 * 100}%`;
    $('.container-outer').css('--grad-percent', gradPercent);  
}

const clock = setInterval(() => {
    displayDateTime();
    indicatorValue();
}, 1000);


$('.container').on('click', '.saveBtn', saveEvent);
getSavedData();
displayDateTime();
indicatorValue();