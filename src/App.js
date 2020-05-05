import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'react-router-redux'
import Routes from './routes'
import './assets/sass/style.scss'
import store, { history } from './store'
import LanguageProvider from './config/languageProvider'
import languageMessages from './config/languageMessages'
import ThemeProvider from './config/themeProvider'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistStore(store)}>
                    <ConnectedRouter history={history} store={store}>
                        <ThemeProvider>
                            <BrowserRouter>
                                <Switch>
                                    <LanguageProvider
                                        messages={languageMessages}
                                    >
                                        <Routes history={history} />
                                    </LanguageProvider>
                                </Switch>
                            </BrowserRouter>
                        </ThemeProvider>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
