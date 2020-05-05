import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#61c5e5',
            main: '#081939',
            dark: '#0e1c39',
            contrastText: '#fff',
        },
        secondary: {
            light: '#cdcdcd',
            main: '#49a0ae',
            dark: '#1b769e',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'inherit',
    },
    overrides: {
        MuiButton: {
            sizeLarge: {
                height: 40,
                minWidth: '320px',
            },
            root: {
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'transparent',
                margin: 5,
                borderRadius: 0,
                fontWeight: 'bold',
            },
            startIcon: {
                marginLeft: '8px',
                marginRight: '8px',
            },
        },
        MuiOutlinedInput: {
            root: {
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#49a0ae',
                },
                '&$focused $notchedOutline': {
                    borderColor: '#49a0ae',
                },
            },
            notchedOutline: {
                borderColor: '#49a0ae',
                borderRadius: 0,
            },
            input: {
                padding: '13.5px 20px',
            },
            inputAdornedStart: {
                padding: '12px 20px',
            },
        },
        MuiInput: {
            underline: {
                '&$focused': {
                    boxShadow: '0 2px #081939',
                },
                boxShadow: '0 1px #081939',
            },
        },
        MuiFormHelperText: {
            root: {
                textAlign: 'inherit',
            },
        },
        MuiFormLabel: {
            root: {
                fontWeight: '700',
            },
        },
        MuiTableCell: {
            root: {
                textAlign: 'inherit',
            },
        },
        MuiTab: {
            root: {
                '&$selected': {
                    outline: 0,
                    backgroundImage:
                        'linear-gradient(to right,#49a0ae , #265870 20% 80%, #49a0ae )',
                },
            },
        },
        MuiInputAdornment: {
            positionStart: {
                marginLeft: '8px',
            },
        },
    },
})
export default theme
