import React                        from 'react';
import { useDispatch,useSelector }          from 'react-redux';

import { makeStyles, useTheme }     from '@material-ui/core/styles';
import useMediaQuery                from '@material-ui/core/useMediaQuery'
import Grid                         from '@material-ui/core/Grid';
import CardActionArea               from '@material-ui/core/CardActionArea';
import { Card, Typography }         from '@material-ui/core';
import { actions as ReminderActions }       from '../../redux/ducks/reminder';
import axios                                from 'axios';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  insideBorder: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 100, 
    width:'100%',
    height: 150,
    borderWidth: 1, 
    borderStyle: 'none solid none none',
    overflowY: 'auto',
    
    // screenSize sm down
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingLeft: 0,
      paddingTop: 10, 
      paddingBottom: 10, 
      width:'100%',
      borderStyle: 'none',
      alignItems: 'center',
    },
  },

  outsideBorder: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    borderWidth: 1, 
    borderStyle: 'none none solid solid',

    // screenSize sm down
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      width:'100%',
      borderStyle: 'none',
    },
  },
  dayOfWeek: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    width:'100%',
    fontWeight: 'bold',
    border: 'solid 1px',

    // screenSize sm down
    [theme.breakpoints.down('sm')]: {
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      width:'100%',
      border: 'none',
      paddingBottom: 5
  },
  },
  
}));

export default function Calendar(props) {
  let {moment} = props;
  let selectedMonth = props.selectedMonth;
  const theme = useTheme()
  const dispatch = useDispatch();

  const reminderList = useSelector(state => state.reminder.reminders);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles();

  let month = getWeeks(props.props, moment, classes, reminderList, isMobile, theme, dispatch, selectedMonth);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center">
            {month}          
      </Grid>
    </div>
  );
}


function getWeeks(props, moment, classes, reminderList, isMobile, theme, dispatch, selectedMonth) {

    const startWeek = moment().month(selectedMonth).startOf('month').week();
    const endWeek = moment().month(selectedMonth).endOf('month').week()+1;
    let calendar = [];
    for(var week = startWeek; week < endWeek ; week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
      })
    }

    function getWeather(reminder, index) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${reminder.city}&APPID=6e5ff5434e61b695f48dd595777b0e1f`)
          .then(function(response){
              if(response.status === 200 && !reminder.weather) {
                  dispatch(ReminderActions.setWeather({weather: response.data.weather[0].main, reminderID: reminder.reminderID}));
              } 
          });
      return reminder.weather;
  }
  return (
    <div>
      <Grid item
          xs={12}
          className={classes.dayOfWeek}
          align="center"
          >
            <Grid style={{width:'100%'}}>
                Sun
            </Grid>
            <Grid style={{width:'100%'}}>
                Mon
            </Grid>
            <Grid style={{width:'100%'}}>
                Tue
            </Grid>
            <Grid style={{width:'100%'}}>
                Wed
            </Grid>
            <Grid style={{width:'100%'}}>
                Thu
            </Grid>
            <Grid style={{width:'100%'}}>
                Fri
            </Grid>
            <Grid style={{width:'100%'}}>
                Sat
            </Grid>
      </Grid>
        {calendar.map((week) => {
            return (
                <Grid 
                  key={week.week} 
                  item 
                  className={classes.outsideBorder}>
                      {week.days.map((day) => {
                          return (
                            <CardActionArea key={day}
                              onClick={()=> props.history.push({pathname:'/list', state: moment(day).date()})}>
                                <Grid 
                                  container
                                  direction="column"
                                  className={classes.insideBorder}
                                  item>
                                    <Grid container direction="column" style={{position:'relative', overFlow: 'hidden', paddingTop:10}}>
                                      <Grid container direction="row" justify={!isMobile ? 'flex-start': 'center'} style={{paddingBottom:10}}>
                                        <Typography variant="caption" align='center' 
                                          style={{fontWeight: 'bold', color: (moment(day).month() !== moment().month()) ? 'gray' 
                                          : moment(day).format('ddd') ==='Sun' || moment(day).format('ddd') ==='Sat' ? theme.palette.secondary.main : ''}}>
                                          {moment(day).date()}
                                        </Typography>
                                        
                                      </Grid>
                                      {
                                        reminderList.map((reminder, index) => {
                                          // getWeather(reminder, index);
                                          if(moment(reminder.selectedDate).format('MM-DD-YYYY') === moment(day).format('MM-DD-YYYY') && !isMobile) {
                                              return (
                                                <Card key={reminder+index} style={{backgroundColor: reminder.color, padding:5, marginBottom:5, color: '#FFF'}}>
                                                    <Grid 
                                                        container 
                                                        justify="space-between"
                                                        direction="row">
                                                          <Grid container item xs={8} justify="flex-start">
                                                            <Typography variant="caption" align='center' component="h2" noWrap>
                                                              {reminder.typedReminder}
                                                            </Typography>
                                                          </Grid>
                                                          <Grid container item xs={4} justify="flex-end">
                                                            <Typography variant="caption" align='center' component="h2">
                                                              {moment(reminder.selectedDate).format('hh:mm')}
                                                            </Typography>
                                                          </Grid>
                                                      </Grid>
                                                  </Card>
                                            )
                                          } else {
                                            return null
                                          }
                                        })
                                      }
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                          )
                      })}
                </Grid>
            )
        })}
    </div>
  )
}
