import React, { useEffect, useState }       from 'react';
import { useDispatch, useSelector }         from 'react-redux';

import Grid                                 from '@material-ui/core/Grid';
import Card                                 from '@material-ui/core/Card';
import CardActions                          from '@material-ui/core/CardActions';
import CardContent                          from '@material-ui/core/CardContent';
import Button                               from '@material-ui/core/Button';
import Typography                           from '@material-ui/core/Typography';
import TextField                            from '@material-ui/core/TextField';
import InputLabel                           from '@material-ui/core/InputLabel';
import MenuItem                             from '@material-ui/core/MenuItem';
import FormControl                          from '@material-ui/core/FormControl';
import Select                               from '@material-ui/core/Select';

import { actions as ReminderActions }       from '../../redux/ducks/reminder';

import Theme                                from '../themes/calendar.theme';

import DateFnsUtils                         from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


export default function Reminder(props) {
    const reminder = useSelector(state => state.reminder.reminder);
    const dispatch = useDispatch();
    const [reminderData, setReminderData] = useState({color: '', city: '',typedReminder: '', selectedDate: new Date()})
    const textMaxLength = 30;

    useEffect(() => {
        if(props.location.state !== undefined) {
            dispatch(ReminderActions.getReminder(props.location.state));
        }
    }, [dispatch, props.location.state]);
    
    if(reminder && reminderData.reminderID === undefined) {
        setReminderData(reminder)
        dispatch(ReminderActions.cleanReminder());
    }

    function saveReminder() {
        dispatch(ReminderActions.setReminder(reminderData));
        dispatch(ReminderActions.getRemindersPerDay(props.returnDay))
        dispatch(ReminderActions.getList())
        props.history.go(-1);
    }

    function handleChange(event) {
        setReminderData({
            ...reminderData,
            [event.target.name]: event.target.value});
    }

    function handleDateChange(date) {
        setReminderData({
            ...reminderData,
            selectedDate: date});
    };

    return (
        <div>
        <Grid
            container
            direction="column"
            justify="center">
                <RenderReminder {...{props,  reminderData, handleDateChange, handleChange, textMaxLength, saveReminder}}/>          
        </Grid>
        </div>
    );
}

function RenderReminder(props) {
    let {textMaxLength, handleChange, handleDateChange, saveReminder} = props;
    let {typedReminder, selectedDate, color, city} = props.reminderData;
    let {history} = props.props;

    return (
        <Grid
        container
        direction="row"
        justify="center"
        align="center">
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Grid container justify='space-between'>

                            <TextField 
                                fullWidth
                                id="reminder-input" 
                                name="typedReminder"
                                label="Reminder"
                                value  = {typedReminder}
                                onChange={ handleChange }
                                inputProps={{ maxLength: textMaxLength }}/>
                            <Typography variant="caption" component="h2">
                                {typedReminder.length + ' / ' + textMaxLength}
                            </Typography>

                            <TextField 
                                fullWidth
                                id="city-input" 
                                name="city"
                                label="City"
                                value  = {city}
                                onChange={ handleChange }
                                inputProps={{ maxLength: textMaxLength }}/>

                            <FormControl
                                style={{width: '100%', marginTop: 20, marginBottom: 10}} 
                            >
                                <InputLabel id="select-label">Color</InputLabel>
                                <Select
                                    style={{paddingBottom:-1, background: color}}
                                    labelId="select-label"
                                    id="color"
                                    value={color}
                                    name="color"
                                    onChange={handleChange}
                                >
                                <MenuItem value={'#4FC3F7'}>Blue</MenuItem>
                                <MenuItem value={'#E57373'}>Red</MenuItem>
                                <MenuItem value={'#FFB74D'}>Orange</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify='space-around'>
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker"
                                label="Date"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </CardContent>
                    <CardActions style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button size="small" style={{color: Theme.palette.error.light}}
                        onClick={() => history.go(-1)}>Cancel</Button>
                        <Button size="small" color='primary'
                        onClick={saveReminder}>Save</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>)
}