var dictionary = {
    week: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС" ],
    month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
};

function Calendar( source ) {

    this.source = source;
    var $ = this;

    this.date = new Date();

    this.elements = {

        month: document.createElement("p"),
        year: document.createElement("p"),

        wrapper: (function () {
            var wrapper = document.createElement('div');
            wrapper.classList.add('calendar-wrapper');
            return wrapper;
        }) (),

        input: (function () {
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('readonly', null);
            input.setAttribute('placeholder', 'дд.мм.гггг');
            input.classList.add('input');
            return input;
        }) (),

        calendar: (function () {
            var calendar =  document.createElement("div");
            calendar.classList.add('calendar', 'hide');
            return calendar;
        }) (),

        topLine: (function () {
            var topLine = document.createElement("div");
            topLine.classList.add('topline');
            return topLine;
        }) (),

        prevArrow: (function () {
            var prev = document.createElement("span");
            prev.classList.add('prev');
            return prev;
        }) (),

        nextArrow: (function() {
            var next = document.createElement("span");
            next.classList.add('next');
            return next;
        }) (),

        table: (function () {
            var table = document.createElement("table");
            table.classList.add('table');
            return table;
        }) (),

        thead: (function() {
            var thead = document.createElement("thead");
            thead.classList.add('thead');
            return thead;
        }) (),

        tbody: (function () {
            var tbody = document.createElement("tbody");
            tbody.classList.add('tbody');
            return tbody;
        }) ()

    };

    this.events = function () {

        $.elements.input.addEventListener('click', function () {
            $.elements.calendar.classList.toggle("hide");
        });

        $.elements.nextArrow.addEventListener('click', function(e) {
            var calendar = $.getCalendar();
            var newMonth = new Date(calendar.date).setMonth(calendar.month + 1);
            $.updateDate(newMonth);
            $.clearDays();
            $.drawTop();
            $.drawTable();
        });

        $.elements.prevArrow.addEventListener('click', function(e) {
            var calendar = $.getCalendar();
            var newMonth = new Date(calendar.date).setMonth(calendar.month - 1);
            $.updateDate(newMonth);
            $.clearDays();
            $.drawTop();
            $.drawTable();
        });

        $.elements.tbody.addEventListener('click', function (e) {
            var value = Number(e.target.innerText);
            var selectDate = value + '.' + ($.getCalendar().month + 1) + '.' + $.getCalendar().year;
            $.elements.input.value = selectDate;
        });
    };

    this.updateDate = function (date) {
        $.date = new Date(date);
    };


    this.clearDays = function () {
        $.elements.tbody.textContent = "";
    };

    this.drawWrapper = function () {

        $.elements.wrapper.appendChild($.elements.input);
        $.elements.wrapper.appendChild($.drawCalendar());
        document.body.appendChild($.elements.wrapper);

    };

    this.drawCalendar = function () {

        $.drawTop();
        $.drawWeek();
        $.drawTable();

        return $.elements.calendar;
    };

    this.drawTop = function () {


        $.elements.topLine.appendChild($.elements.prevArrow);
        $.elements.topLine.appendChild($.drawMonth($.getCalendar().month));
        $.elements.topLine.appendChild($.drawYear());
        $.elements.topLine.appendChild($.elements.nextArrow);

        $.elements.calendar.appendChild($.elements.topLine);

    };

    this.drawTable = function () {


        $.drawDays();

        $.elements.calendar.appendChild($.elements.table);
    };

    this.drawWeek = function () {
        var tr = document.createElement("tr"),
            td;

        dictionary.week.forEach(function (day) {
            td = document.createElement("td");
            td.textContent = day;
            tr.appendChild(td);
        });

        $.elements.thead.appendChild(tr);
        $.elements.table.appendChild($.elements.thead);
    };

    this.drawMonth = function (number) {
        var monthList = dictionary.month;
        $.elements.month.textContent = monthList[number];
        return $.elements.month;
    };

    this.drawYear = function () {
        $.elements.year.textContent = $.getCalendar().year;
        return $.elements.year;
    };
    this.drawDays = function () {

        var days = $.generateDays($.getCalendar().countDays);

        var weekDay = ($.getCalendar().weekDay == 0) ? 7 : $.getCalendar().weekDay;
        var countDays = $.getCalendar().countDays;
        var i = 0;
        var countWeek = 0;
        while (days[i] <= countDays) {
            let tr = document.createElement("tr");
            for (var j = 1; j <= 7; j++) {
                let td = document.createElement("td");
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
    };

    this.getCalendar = function () {
        var date = new Date($.date);

        return {
            date: date,
            day: date.getDate(),
            weekDay: $.getWeek(date),
            month: date.getMonth(),
            year: date.getFullYear(),
            countDays: $.countDays(date),
            firstDay: $.getFirstDay(date),
        }

    };

    this.getWeek = function (date) {
        let d = $.getDate(date);
        let day = new Date(d.year, d.month, 1).getDay();
        return day;
    };



    this.getFirstDay = function (date) {

        var d = $.getDate(date);
        return  new Date(d.year, d.month, 1).getDate();

    };

    this.countDays = function (date) {
        var d = $.getDate(date);

        var countDays = new Date(d.year, d.month + 1, 0).getDate();

        return countDays;
    };

    this.getDate = function (date) {

        var d = new Date(date);

        return {
            year: d.getFullYear(),
            month: d.getMonth()
        };
    };

    this.generateDays = function (number) {

        var days = [];

        for ( let i = 1; i <= number; i++ )
            days[ i - 1 ] = i;


        return days;

    };

    $.events();
    $.drawWrapper();

}


var calendar = document.querySelectorAll("input[type='date']");

for (var i = 0; i < calendar.length; i++) {
    new Calendar(calendar[i]);
}

