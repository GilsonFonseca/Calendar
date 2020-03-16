import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app

export default createMuiTheme({
    palette: {
        primary: {
            light: '#ec4a51', // Blue[200]
            main: '#1E70B7', // Blue[300]
            dark: '#1b64a4', // Blue[400]
            contrastText: '#fff',
        },
        secondary: {
            light: '#5ebae6', // Cyan[200]
            main: '#36A9E0', // Cyan[300]
            dark: '#3098c9', // Cyan[400]
            contrastText: '#fff',
        },
        error: {
            light: '#E86C5D', // Red[200]
            main: '#E65748', // Red[300]
            dark: '#E24331', // Red[400]
            contrastText: '#fff',
        },
        textdefault: {
            light: '#E86C5D', // Red[200]
            main: '#E65748', // Red[300]
            dark: '#E24331', // Red[400]
            contrastText: '#fff',
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        button: {
            fontWeight: 'bold',
        },
    }
})
