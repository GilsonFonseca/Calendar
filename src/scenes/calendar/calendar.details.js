
import React                            from 'react';
import { useDispatch,useSelector }      from 'react-redux';

import moment                           from 'moment';
import InputLabel                       from '@material-ui/core/InputLabel';
import MenuItem                         from '@material-ui/core/MenuItem';
import FormControl                      from '@material-ui/core/FormControl';
import Select                           from '@material-ui/core/Select';

import Calendar                         from '../../components/calendar/Calendar';
import AppLayout                        from '../../components/layouts/AppLayout';
import { actions as CalendarActions }   from '../../redux/ducks/calendar';

export default function CalendarDetails(props) {
  const dispatch = useDispatch();

  const month = useSelector(state => state.calendar.month);

  const selectedMonth = month;
  const handleChange = event => {
    dispatch(CalendarActions.getMonth(event.target.value));
  };
  return (
    <AppLayout history={props.history} page={"Calendar"} >
            {
              <div>
                
                <FormControl
                  style={{width: '100%', marginTop: 20, marginBottom: 10}}>
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    onChange={handleChange}
                  >
                    
                    <MenuItem value={0}>January</MenuItem>
                    <MenuItem value={1}>February</MenuItem>
                    <MenuItem value={2}>March</MenuItem>
                    <MenuItem value={3}>April</MenuItem>
                    <MenuItem value={4}>May</MenuItem>
                    <MenuItem value={5}>June</MenuItem>
                    <MenuItem value={6}>July</MenuItem>
                    <MenuItem value={7}>August</MenuItem>
                    <MenuItem value={8}>September</MenuItem>
                    <MenuItem value={9}>October</MenuItem>
                    <MenuItem value={10}>November</MenuItem>
                    <MenuItem value={11}>December</MenuItem>
                  </Select>
                </FormControl>
                <Calendar {...{props,moment, selectedMonth}}/>
              </div>
            }
        </AppLayout>
    
  );
}

