import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
// Pages
import HomePage from '../../pages/HomePage'
import AccountListPage from '../../pages/AccountPage/AccountListPage'
import UserGroupPage from '../../pages/UserGroupPage'
import AccountDetailPage from '../../pages/AccountPage/AccountDetailPage'

const ProtectedModule = () => {
  return (
    <DefaultLayout>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/accounts'} component={AccountListPage} />
        <Route
          exact
          path={'/accounts/:accountId'}
          component={AccountDetailPage}
        />
        <Route exact path={'/household'} component={UserGroupPage} />
      </Switch>
    </DefaultLayout>
  )
}

ProtectedModule.propTypes = {}

export default ProtectedModule
