/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';

// third party
import { format, startOfWeek, addDays, isSameDay, lastDayOfWeek, addWeeks, subWeeks } from 'date-fns';

// material ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';

// assets
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const WeeklyCalendar = () => {
  const theme = useTheme();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const arrMonth = ['January', 'February', 'March', 'April', 'Mei', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(arrMonth[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());

  useEffect(() => {
    setMonth(arrMonth[currentMonth.getMonth()]);
    setYear(currentMonth.getFullYear());
  }, [currentMonth]);

  const changeWeekHandle = (btnType) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };

  const onDateClickHandle = (day) => {
    setSelectedDate(day);
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'd';
    let days = [];
    let rows;
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayStr = format(cloneDay, 'ccc');
        days.push(
          <div
            className={`cell-date ${isSameDay(day, selectedDate) ? 'selected-date' : ''}`}
            key={day}
            onClick={() => {
              setDate(cloneDay);
              onDateClickHandle(cloneDay);
            }}
          >
            <Typography variant="caption2" sx={{ display: 'block', color: isSameDay(day, selectedDate) ? '#fff' : '' }}>
              {dayStr.slice(0, 3)}
            </Typography>
            <br />
            <Typography variant="body3">{formattedDate}</Typography>
          </div>
        );
        day = addDays(day, 1);
      }

      rows = (
        <Grid container key={day} spacing={1} justifyContent="space-evenly">
          {days.map((item, key) => (
            <Grid item key={key} sx={{ display: 'block' }}>
              {item}
            </Grid>
          ))}
        </Grid>
      );

      days = [];
    }
    return rows;
  };
  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="title">Calendar</Typography>
        <Stack direction="row">
          <ArrowBackIosIcon sx={{ fontSize: 14, mr: 1, cursor: 'pointer' }} onClick={() => changeWeekHandle('prev')} />
          <ArrowForwardIosIcon sx={{ fontSize: 14, cursor: 'pointer' }} onClick={() => changeWeekHandle('next')} />
        </Stack>
        <Card sx={{ background: theme.palette.background.default, px: 1.5, py: 1, borderRadius: 2, color: theme.palette.primary.dark }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <CalendarTodayOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="caption1" sx={{ color: theme.palette.primary.dark }}>
              {month} {year}
            </Typography>
          </Stack>
        </Card>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Box>{renderCells()}</Box>
      <Divider sx={{ my: 1 }} />
    </Stack>
  );
};

export default WeeklyCalendar;
