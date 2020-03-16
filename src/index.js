import React                from 'react';

import { Provider }         from 'react-redux'
import { Store }            from './redux/stores'

import ReactDOM             from 'react-dom';
import Router               from './router/Router'
import * as serviceWorker   from './serviceWorker';
import { ThemeProvider }    from '@material-ui/styles'
import project              from '../src/config'


ReactDOM.render(
    <Provider store={Store}>
        <ThemeProvider theme={project.theme}>
            <Router />
        </ThemeProvider>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
