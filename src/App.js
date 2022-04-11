import React, { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import utils from './utils'
// Styling
import './App.less'
import ThemeProvider from './providers/ThemeProvider'
import { useMediaQuery } from 'react-responsive'
// Ant Design
import { ConfigProvider } from 'antd'
// Axios
// MomentJS
import moment from 'moment'
import viVN from 'antd/es/locale/vi_VN'
import 'moment/locale/vi'
// React Router
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// MobX
import { Provider } from 'mobx-react'
import commonStore from './stores/commonStore'
import loadingAnimationStore from './stores/loadingAnimationStore'
import authenticationStore from './stores/authenticationStore'
import userStore from './stores/userStore'
import userGroupStore from './stores/userGroupStore'
import selectPeopleStore from './stores/selectPeopleStore'
// Modules
import AuthModule from './modules/AuthModule'
import ProtectedModule from './modules/ProtectedModule'
// Pages
import NotFoundPage from './pages/NotFoundPage'
import MyProfilePage from './pages/MyProfilePage'
import DashboardAuthLayout from './layouts/DashboardAuthLayout'

const history = createBrowserHistory()
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('jwt') || sessionStorage.getItem('jwt') || sessionStorage.getItem('jwt')
      ? <Component {...props} />
      : (
        <Redirect to={{
          pathname: '/auth/login',
          state: { from: props.location },
        }} />
      )
  )} />
)

moment.locale('vi', {
  week: {
    dow: 1,
  },
})

const rootStores = {
  commonStore,
  loadingAnimationStore,
  authenticationStore,
  userStore,
  userGroupStore,
  selectPeopleStore,
}

const App = () => {

  const isDesktop = useMediaQuery({ minWidth: 1025 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    const compactSidebar = localStorage.getItem('compactSidebar')
      ? JSON.parse(localStorage.getItem('compactSidebar'))
      : false
    commonStore.setTheme(currentTheme)
    commonStore.toggleSidebar(compactSidebar)
    if (utils.isNullish(authenticationStore.appToken)) return
    authenticationStore.getCurrentUser()
      .catch(error => {
        console.log('Cannot get current user', error)
        history.push('/auth/login')
        localStorage.clear()
      })
  }, [])
  useEffect(() => {
    commonStore.checkIsDesktop(isDesktop)
    commonStore.checkIsTablet(isTablet)
    commonStore.checkIsMobile(isMobile)
  }, [isDesktop, isTablet, isMobile])

  return (
    <Provider {...rootStores}>
      <ThemeProvider>
        <ConfigProvider locale={viVN}>
          <Router history={history}>
            <Switch>
              <Route exact path={'/auth/:authType'} component={AuthModule} />
              <ProtectedRoute
                path={[
                  '/',
                  '/connected-document/manage/:manageType',
                  '/manage/user-group',
                ]}
                exact component={ProtectedModule}
              />
              <DashboardAuthLayout>
                <Route exact path={'/my-profile'} component={MyProfilePage} />
              </DashboardAuthLayout>
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </ConfigProvider>
        <LoadingSpinner />
      </ThemeProvider>
    </Provider>
  )
}

export default App
