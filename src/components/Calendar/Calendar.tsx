import { useEffect, useState } from 'react';
import './Calendar.scss'


export default function Calendar({ year = new Date().getFullYear(), m = new Date().getMonth() }) {
    const [month, setMonth] = useState(m)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    const days: any[] = [];
    const rows: any[] = [];


    // calc how much days to display
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let daysOfPrevMonth = new Date(year, month, 1).getDay();
    let daysOfNextMonth = 6 - new Date(year, month + 1, 0).getDay();

    const numOfDays = daysInMonth + daysOfNextMonth;
    for (let i = 1 - daysOfPrevMonth; i <= numOfDays; i++)
        days.push(new Date(year, month, i))

    for (let i = 0; i < days.length; i = i + 7) {
        const week = days.slice(i, i + 7);
        const tr = <tr key={i}>
            {
                week.map(day => {
                    return (
                        <td key={day.toDateString()} className={'calendar-day' + ((day.getMonth() === month) ? ' this-month ' : '')}>
                            <p className={day.toDateString() === today.toDateString() ? 'today' : ''}>
                                {day.getDate()}
                            </p>
                        </td>
                    )
                })
            }
        </tr>
        rows.push(tr);
    }

    return (
        <div id='calendar'>
            <p>Calendar</p>
            <p>today: {`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</p>
            <div id='btn-area'>
                <button id='left' onClick={() => setMonth(month - 1)}></button>
                <button id='right' onClick={() => setMonth(month + 1)}></button>
            </div>
            <p id="current-displayed">{month + 1 + "/" + year}</p>
            <table>
                <tbody>
                    <tr>
                        {weekdays.map(day => <th key={'th' + day}>{day}</th>)}
                    </tr>

                    {rows}

                </tbody>
            </table>
        </div>
    )
}

