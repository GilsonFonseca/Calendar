import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Calendar                         from '../scenes/calendar/calendar.details';
import Reminder                         from '../scenes/reminders/reminder.details';
import ReminderList                     from '../scenes/reminders/reminder.list';

export default function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Calendar} />
                <Route path={`/list`} exact={true} component={ReminderList} />
                <Route path={`/reminder`} exact={true} component={Reminder} />
                
            </Switch>
        </ BrowserRouter>
    );
}
