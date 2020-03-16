const projects = {
    CALENDAR: {
        name: 'Calendar',
        description: 'A Calendar app',
        appbar_color: '#1E70B7',
        theme_color: '#36A9E0',
        name_project: 'Calendar',
    },
}

const loadTheme = () => {
    const options = projects['CALENDAR']
    if (!options) throw new Error(`Project not found!`)
    const theme = require(`./components/themes/${options.name_project.toLowerCase()}.theme`).default
    return {
        ...options,
        theme,
    }
}

export default loadTheme()
