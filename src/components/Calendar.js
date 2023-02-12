import { useState } from 'react';
function Calendar(props) {
    const [date, setDate] = useState(new Date(props.date).getDate());
    const [month, setMonth] = useState(new Date(props.date).getMonth());
    const [year, setYear] = useState(new Date(props.date).getFullYear());
    let d = new Date(props.date);

    const months = [
        ['Январь', 'Января'],
        ['Февраль', 'Февраля'],
        ['Март', 'Марта'],
        ['Апрель', 'Апреля'],
        ['Май', 'Мая'],
        ['Июнь', 'Июня'],
        ['Июль', 'Июля'],
        ['Август', 'Августа'],
        ['Сентябрь', 'Сентября'],
        ['Октябрь', 'Октября'],
        ['Ноябрь', 'Ноября'],
        ['Декабрь', 'Декабря']
    ];
    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    //const date  = d.getDate();

    //дней в текущем месяце
    const daysInCurMonth  = 33 - new Date(year, month, 33).getDate();

    //дней в прошлом месяце
    const daysInPrevMonth = 33 - new Date(year, month-1, 33).getDate();

    //номер дня недели для последнего дня предыдущего месяца
    let lastDayOfPrevMonth = new Date(year, month, 0).getDay();

    //номер последнего дня недели текущего месяца. Если не воскресенье, то
    // в календарь надо будет добавить дни след. месяца
    let lastDayOfCurMonth = new Date(year, month+1, 0).getDay();

    let calendar=[];
    //номер дня недели для первого числа текущего месяца
    const firstDayCurrentMonth = new Date(year, month, 1).getDay();

    if (firstDayCurrentMonth !== 1)
    {
        //месяц начался не в понедельник - дополняем первую неделю днями предыдущего месяца
        const firstDate = daysInPrevMonth - lastDayOfPrevMonth + 1; //дата понедельника предыдущего месяца
        calendar.push(...Array.from({length: lastDayOfPrevMonth}).map((_,i)=>{
            return {
                "date": firstDate+i,
                "key": "prev" + (firstDate+i),
                "class": "ui-datepicker-other-month"
            };
        }));
    }

    //добавляю все дни текущего месяца
    calendar.push(...Array.from({length: daysInCurMonth}).map((_,i)=>{
        let res = {
            "date": (1 + i),
            "key": "cur" + (1 + i),

        };
        if (date == (i+1))
            res.class = "ui-datepicker-today"
        return res;
    }));
    //если текущий месяц заканчивается не воскресеньем (не 0) - добавляю дни следующего месяца
    if (lastDayOfCurMonth)
    {
        const addDays = 7-lastDayOfCurMonth; //сколько дней след месяца надо добавить
        calendar.push(...Array.from({length: addDays}).map((_,i)=>{
            return {
                "date": (1 + i),
                "key": "next" + (1 + i),
                "class": "ui-datepicker-other-month"
            };
        }));
    }
    //сейчас calendar содержит полный список выводимых дней с учетом предыдущего и следующего месяца
    //разбиваю список по неделям, чтобы каждую неделю вывести в отдельном <tr>
    let result = [];
    let week_key = 1;
    while(calendar.length)
    {
        result.push({
            "days" : calendar.splice(0,7),
            "key" : "w"+week_key
        })
        week_key++;
    }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{days[d.getDay()]}</div>
                <div className="ui-datepicker-material-date">
                    <div className="">

                    </div>

                    <div className="ui-datepicker-material-day-num">

                        {date}

                    </div>
                    <div className="ui-datepicker-material-month">

                        {months[month][1]}

                    </div>
                    <div className="ui-datepicker-material-year">

                        {year}
                        
                    </div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{months[month][0]}</span>&nbsp;
                    <span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                {
                    result.map((week) =>
                        <tr key={week.key}>
                            {week.days.map((day) =>
                                <td
                                    key={day.key}
                                    className={day.class}
                                >
                                    {day.date}
                                </td>
                            )}
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;