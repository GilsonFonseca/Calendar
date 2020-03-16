import React            from 'react';
import Reminder         from '../../components/reminder/Reminder';
import AppLayout        from '../../components/layouts/AppLayout';

export default function CalendarDetails(props) {
  
  return (
    <AppLayout history={props.history} page={"Reminder"} >
            {
              <Reminder {...props}/>
            }
        </AppLayout>
    
  );
}

