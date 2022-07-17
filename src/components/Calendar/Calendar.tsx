// import React, { useEffect } from "react";
import './Calendar.scss'


export default function Calendar({ year = new Date().getFullYear(), month = new Date().getMonth() }) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const months = ['January', 'February', 'March', 'April', 'May', 'June',
    //     'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let daysOfPrevMonth = new Date(year, month).getDay();
    let daysOfNextMonth = 6 - new Date(year, month + 1, 0).getDay();
    const days = [];
    let i = 1 - daysOfPrevMonth;
    const numOfDays = daysInMonth + daysOfNextMonth;
    for (; i <= numOfDays; i++)
        days.push(new Date(year, month, i))

    const rows = [];
    for (let i = 0; i < days.length; i = i + 7) {
        const week = days.slice(i, i + 7);
        const tr = <tr key={i}>
            {
                week.map(day => {
                    return <td key={day.toDateString()} className={'calendar-day' + ((day.getMonth() === month) ? ' this-month ' : '')}>
                        <p className={day.toDateString() === today.toDateString() ? 'today' : ''}>
                            {day.getDate()}
                        </p>
                    </td>
                })
            }
        </tr>
        rows.push(tr);
    }
    return (
        <div id='calendar'>
            <p>Calendar</p>
            <p>today: {`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
            <table>
                <tbody>
                    <tr>
                        {
                            weekdays.map(day => <th key={'th' + day}>{day}</th>)
                        }
                    </tr>

                    {rows}

                </tbody>
            </table>
        </div>
    )
}

