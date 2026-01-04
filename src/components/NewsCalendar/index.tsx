import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface CalendarData {
    [date: string]: boolean;
}

interface NewsCalendarProps {
    calendarData?: CalendarData;
}

const MONTHS_CN = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
];

const WEEKDAYS_CN = ['日', '一', '二', '三', '四', '五', '六'];

export default function NewsCalendar({ calendarData = {} }: NewsCalendarProps): React.ReactElement {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availableDates, setAvailableDates] = useState<CalendarData>(calendarData);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const formatDateKey = (day: number): string => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const getNewsLink = (day: number): string => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `/docs/ai-news/${year}/${m}/${d}`;
    };

    const hasNews = (day: number): boolean => {
        const dateKey = formatDateKey(day);
        return !!availableDates[dateKey];
    };

    const isToday = (day: number): boolean => {
        const today = new Date();
        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        );
    };

    // Generate calendar grid
    const calendarDays: (number | null)[] = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
                <button onClick={goToPreviousMonth} className={styles.navButton}>
                    ◀
                </button>
                <div className={styles.monthYear}>
                    <span className={styles.year}>{year}年</span>
                    <span className={styles.month}>{MONTHS_CN[month]}</span>
                </div>
                <button onClick={goToNextMonth} className={styles.navButton}>
                    ▶
                </button>
            </div>

            <button onClick={goToToday} className={styles.todayButton}>
                📅 今天
            </button>

            <div className={styles.weekdaysRow}>
                {WEEKDAYS_CN.map((day, index) => (
                    <div key={index} className={styles.weekday}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.daysGrid}>
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={index} className={styles.emptyDay} />;
                    }

                    const hasNewsForDay = hasNews(day);
                    const isTodayDay = isToday(day);

                    return (
                        <div
                            key={index}
                            className={`${styles.dayCell} ${isTodayDay ? styles.today : ''} ${hasNewsForDay ? styles.hasNews : ''
                                }`}
                        >
                            {hasNewsForDay ? (
                                <Link to={getNewsLink(day)} className={styles.dayLink}>
                                    <span className={styles.dayNumber}>{day}</span>
                                    <span className={styles.newsIndicator}>📰</span>
                                </Link>
                            ) : (
                                <span className={styles.dayNumber}>{day}</span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <span className={styles.legendIcon}>📰</span>
                    <span>有新闻</span>
                </div>
                <div className={styles.legendItem}>
                    <span className={styles.legendToday} />
                    <span>今天</span>
                </div>
            </div>
        </div>
    );
}
