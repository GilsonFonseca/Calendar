import React                    from 'react';

import PropTypes                from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery            from '@material-ui/core/useMediaQuery';
import AppBar                   from '@material-ui/core/AppBar';
import CssBaseline              from '@material-ui/core/CssBaseline';
import Toolbar                  from '@material-ui/core/Toolbar';
import Typography               from '@material-ui/core/Typography';
import AddIcon                  from '@material-ui/icons/Add';
import ArrowBackIcon            from '@material-ui/icons/ArrowBack';
import config                   from '../../config';
import { IconButton }           from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            paddingBottom: '80px',
        }
    },
    appBar: {
        marginLeft: 0,
        [theme.breakpoints.up('md')]: {
            width: `calc(100%)`,
        },
        background: config.theme_color,
    },
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '100vh',
    },
    appBarTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
}))


const AppLayout = ({ children, ...props }) => {
    const classes = useStyles()
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    function bgColor() {
        if (isMobile) {
            if (props.bgColorSmall) {
                return props.bgColorSmall
            } else {
                return "#F4F9F0"
            }
        } else {
            if (props.bgColorLarge) {
                return props.bgColorLarge
            } else {
                return "#F4F9F0"
            }
        }
    }

    return (
        <div className={classes.root + ' ' + bgColor()}>
            <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} noWrap>
                            <div className={classes.appBarTitle}>
                                {!/\/$/gi.test(props.history.location.pathname)
                                    ?   <IconButton 
                                            color='inherit'
                                            onClick={()=> props.history.go(-1)}>
                                            <ArrowBackIcon/>
                                        </IconButton>
                                    : null
                                }
                                {props.page}
                            </div>
                        </Typography>
                        {/\/$/gi.test(props.history.location.pathname)
                            ?   <IconButton 
                                    color='inherit'
                                    onClick={()=> props.history.push('/reminder')}>
                                    <AddIcon/>
                                </IconButton>
                            : null
                        }
                    </Toolbar>
                </AppBar>
            <main className={classes.content} id={props.id} style={Object.assign(props.style || {})}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}

AppLayout.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
}

export default AppLayout
