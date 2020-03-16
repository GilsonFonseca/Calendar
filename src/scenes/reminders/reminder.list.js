import React            from 'react';
import ReminderList     from '../../components/reminder/ReminderList';
import AppLayout        from '../../components/layouts/AppLayout';

export default function CalendarDetails(props) {
  
  return (
    <AppLayout history={props.history} page={"Reminder List"} >
            {
              <ReminderList {...props}/>
            }
        </AppLayout>
    
  );
}

