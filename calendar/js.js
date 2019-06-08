
function Calendar( source ) {

    this.source = source;
    var $ = this;

    this.date = new Date(2019, 7);
    console.log(this.date.getDay());

    this.elements = {

        calendar: function (){
            var calendar = document.createElement("div");
            calendar.classList.add("calendar");

            return calendar;
        },

        topLine: function () {
            var topLine = document.createElement("div");
            topLine.classList.add("topline");

            var nextArrow = document.createElement("span");
            var prevArrow = nextArrow.cloneNode(false);

            nextArrow.classList.add("next");
            prevArrow.classList.add("prev");

            var month = document.createElement("p");
            month.classList.add('month');

            return {
                top: topLine,
                next: nextArrow,
                prev: prevArrow,
                month: month
            };

        },

        table: function () {
            var table = document.createElement("table");
            table.classList.add("table");

            var thead = document.createElement("thead");
            thead.classList.add("thead");
            var tbody = document.createElement("tbody");
            tbody.classList.add("tbody");

            return {
                table: table,
                thead: thead,
                tbody: tbody
            };
        }

    };

    function init() {
        document.body.appendChild(drawCalendar());
    }

    function drawCalendar() {
        var top = drawTopLine();
        var table = drawCalendarTable();

        var calendar = $.elements.calendar();
        calendar.appendChild(top);
        calendar.appendChild(table);

        return calendar;
    }

    function drawTopLine() {

        var top = $.elements.topLine().top;
        var prevArrow = $.elements.topLine().prev;
        var nextArrow = $.elements.topLine().next;
        var month = $.elements.topLine().month;
        month.innerHTML = getCalendarDate().month;
        top.appendChild(prevArrow);
        top.appendChild(month);
        top.appendChild(nextArrow);

        return top;
    }

    function drawCalendarTable() {

        var table = $.elements.table().table;
        table.appendChild(drawWeek());
        table.appendChild(drawDays());

        return table;
    }

    function drawWeek() {

        var week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС", ];
        var thead = $.elements.table().thead;
        var tr = document.createElement("tr"),
            td;

        week.forEach(function (day) {
            td = document.createElement("td");
            td.innerHTML = day;
            tr.appendChild(td);
        });

        thead.appendChild(tr);
        return thead;
    }

    function drawDays() {

        var tbody = $.elements.table().tbody;
        var days = generateDays(getCalendarDate().contDays);
        var tr, td;

        var weekDay = (getCalendarDate().weekDay == 0) ? 7 : getCalendarDate().weekDay;

        var countDays = getCalendarDate().contDays;

        var i = 0;
        var countWeek = 0;
        while (days[i] <= countDays){
            tr = document.createElement("tr");
            for (var j = 1; j <= 7; j++) {
                td = document.createElement("td");
                if(countWeek == 0 && j < weekDay ){
                    td.innerHTML = '';
                }else{
                    if(days[i] == undefined){
                        break;
                    }else{
                        td.innerHTML = days[i];
                        i++;
                    }
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            countWeek++;
        }

        return tbody;
    }

    function getCalendarDate() {
        var date = new Date($.date);

        return {
            day: date.getDate(),
            weekDay: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
            contDays: countDaysMonth(date),
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