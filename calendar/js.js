
function Calendar( source ) {

    this.source = source;
    var $ = this;

    this.date = new Date();

    this.elements = {

        calendar: document.createElement("div"),

        topLine: document.createElement("div"),
        prevArrow: document.createElement("span"),
        month: document.createElement("p"),
        year: document.createElement("p"),
        nextArrow: document.createElement("span"),

        table: document.createElement("table"),
        thead: document.createElement("thead"),
        tbody: document.createElement("tbody")

    };

    function init() {
        events();
        drawCalendar();
    }
    function events() {

        $.source.addEventListener('click', function () {
            $.elements.calendar.classList.toggle("hide");
        });

        $.elements.nextArrow.addEventListener('click', function(e) {
            var calendar = getCalendarDate();
            var newMonth = new Date(calendar.date).setMonth(calendar.month + 1);
            updateDate(newMonth);
            clearDays();
            drawTopLine();
            drawCalendarTable();
        });

        $.elements.prevArrow.addEventListener('click', function(e) {
            var calendar = getCalendarDate();
            var newMonth = new Date(calendar.date).setMonth(calendar.month - 1);
            updateDate(newMonth);
            clearDays();
            drawTopLine();
            drawCalendarTable();
        });

        $.elements.tbody.addEventListener('click', function (e) {
            var value = Number(e.target.innerText);
            var selectDate = new Date($.date);
            selectDate.setDate(value);
            $.source.valueAsDate = selectDate;
        });
    }

    function updateDate(date) {
        $.date = new Date(date);
    }


    function clearDays() {
        $.elements.tbody.textContent = "";
    }

    function drawCalendar() {

        $.elements.calendar.classList.add("calendar", "hide");

        drawTopLine();
        drawWeek();
        drawCalendarTable();

        document.body.appendChild($.elements.calendar);

        return $.elements.calendar;
    }

    function drawTopLine() {

        $.elements.topLine.classList.add("topline");
        $.elements.prevArrow.classList.add("prev");
        $.elements.nextArrow.classList.add("next");

        $.elements.topLine.appendChild($.elements.prevArrow);
        $.elements.topLine.appendChild(drawMonth(getCalendarDate().month));
        $.elements.topLine.appendChild(drawYear());
        $.elements.topLine.appendChild($.elements.nextArrow);

        $.elements.calendar.appendChild($.elements.topLine);

    }

    function drawCalendarTable() {

        $.elements.table.classList.add("table");

        drawDays();

        $.elements.calendar.appendChild($.elements.table);
    }

    function drawWeek() {

        var week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС", ];
        $.elements.thead.classList.add("thead");
        var tr = document.createElement("tr"),
            td;

        week.forEach(function (day) {
            td = document.createElement("td");
            td.textContent = day;
            tr.appendChild(td);
        });

        $.elements.thead.appendChild(tr);
        $.elements.table.appendChild($.elements.thead);
    }

    function drawMonth(number) {
        var monthList = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
        $.elements.month.textContent = monthList[number];
        return $.elements.month;
    }

    function drawYear() {
        $.elements.year.textContent = getCalendarDate().year;
        return $.elements.year;
    }
    function drawDays() {

        $.elements.tbody.classList.add("tbody");
        var days = generateDays(getCalendarDate().countDays);
        var tr, td;

        var weekDay = (getCalendarDate().weekDay == 0) ? 7 : getCalendarDate().weekDay;

        var countDays = getCalendarDate().countDays;

        var i = 0;
        var countWeek = 0;
        while (days[i] <= countDays){
            tr = document.createElement("tr");
            for (var j = 1; j <= 7; j++) {
                td = document.createElement("td");
                if(countWeek == 0 && j < weekDay ){
                    td.textContent = '';
                }else{
                    if(days[i] == undefined){
                        break;
                    }else{
                        td.textContent = days[i];
                        i++;
                    }
                }
                tr.appendChild(td);
            }
            $.elements.tbody.appendChild(tr);
            countWeek++;
        }

        $.elements.table.appendChild($.elements.tbody);
    }

    function getCalendarDate() {
        var date = new Date($.date);

        return {
            date: date,
            day: date.getDate(),
            weekDay: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
            countDays: countDaysMonth(date),
            firstDay: getFirstDay(date),
        }

    }

    function getFirstDay(date) {

        var d = countMonthYear(date);
        return  new Date(d.year, d.month, 1).getDate();

    }

    function countDaysMonth(date) {
        var d = countMonthYear(date);

        var countDays = new Date(d.year, d.month + 1, 0).getDate();

        return countDays;
    }

    function countMonthYear(date) {

        var d = new Date(date);

        return {
            year: d.getFullYear(),
            month: d.getMonth()
        };
    }

    function generateDays(number) {

        var days = new Array(number);

        for (var i = 0; i < days.length; i++) {
            days[i] = number;
            number--;
        }

        days.reverse();

        return days;

    }

    init();

}


var calendar = document.getElementsByTagName("input");

for (var i = 0; i < calendar.length; i++) {
    new Calendar(calendar[i]);
}