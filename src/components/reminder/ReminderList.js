import React, { useEffect }                 from 'react';
import { useDispatch,useSelector }          from 'react-redux';
import Grid                                 from '@material-ui/core/Grid';
import Card                                 from '@material-ui/core/Card';
import CardActions                          from '@material-ui/core/CardActions';
import CardActionArea                       from '@material-ui/core/CardActionArea';

import Typography                           from '@material-ui/core/Typography';
import Button                               from '@material-ui/core/Button';
import moment                               from 'moment';

import { actions as ReminderActions }       from '../../redux/ducks/reminder';
import Theme                                from '../themes/calendar.theme';



export default function Reminder(props) {
    const dispatch = useDispatch();
    const returnDay = props.history.location.state;
    const reminderList = useSelector(state => state.reminder.filteredReminders);
    

    useEffect(() => {
        // if(props.location.state !== undefined) {
            dispatch(ReminderActions.getRemindersPerDay(returnDay));
        // }
    }, [dispatch, props.location.state, returnDay]);
    

    

    function RenderReminderList(props) {

        let {reminderList} = props;
        let {history} = props.props;
    
        if(reminderList.length === 0) {
            return (
                <Grid
            container
            direction="row"
            justify="center"
            align="center">
                <Grid item xs={12} md={6}>
                    <Grid item style={{display: 'flex', flexDirection: 'row', alignSelf:'flex-start', marginBottom: 20}}>
                        <Typography variant="h5" align='center' component="h2">
                            Dia {props.returnDay}
                        </Typography>
                    </Grid>
                    <Typography variant="h6" component="h2">
                        There is no reminders for today
                    </Typography>
                </Grid>
            </Grid>)
        }
    
        return (
            <Grid
            container
            direction="row"
            justify="center"
            align="center">
                <Grid item xs={12} sm={6}>
                    <Grid item style={{display: 'flex', flexDirection: 'row', alignSelf:'flex-start', marginBottom: 20}}>
                        <Typography variant="h5" align='center' component="h2">
                            Dia {props.returnDay}
                        </Typography>
                    </Grid>
                    {reminderList.map((reminder, index) => {
                        return (
                            <Grid key={reminder+index} item style={{marginBottom: 20}}>
                                <Card style={{display: 'flex', flexDirection: 'row', backgroundColor: reminder.color, color: '#FFFFFF'}}>
                                    <CardActionArea style={{display: 'flex', flexDirection: 'row', backgroundColor: reminder.color, padding: 20}}
                                        onClick={()=> history.push({pathname: '/reminder', state: index})}>
                                        <Grid container justify="flex-start">
                                            <Typography variant="body2" align='center' component="h2" noWrap>
                                                {reminder.typedReminder}
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" spacing={2}>
                                            <Grid item>
                                                <Typography variant="body2" align='center' component="h2">
                                                   {reminder.weather} 
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" align='center' component="h2">
                                                    {moment(reminder.selectedDate).format('hh:mm')}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                
                                            </Grid>
                                        </Grid>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" style={{color: '#FFFFFF'}}
                                            onClick={() => {
                                            dispatch(ReminderActions.deleteReminder(reminder))
                                            dispatch(ReminderActions.getRemindersPerDay(props.returnDay))}}>DELETE</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                    <Button size="small" style={{color: Theme.palette.error.light}}
                        onClick={() => {dispatch(ReminderActions.deleteAll(props.returnDay))
                            dispatch(ReminderActions.getRemindersPerDay(props.returnDay))
                            dispatch(ReminderActions.getList())}}>DELETE ALL</Button>
                </Grid>
            </Grid>
        )
    }


    return (
        <div>
        <Grid
            container
            direction="column"
            justify="center">
                <RenderReminderList {...{props, reminderList, returnDay}}/>          
        </Grid>
        </div>
    );
}





