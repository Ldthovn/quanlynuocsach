import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
// Pages
import HomePage from '../../pages/HomePage'
import ConnectedDocumentManagePage from '../../pages/ConnectedDocumentManagePage'
import UserGroupPage from '../../pages/UserGroupPage'

const ProtectedModule = () => {

  return (
    <DefaultLayout>
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/connected-document/manage/:manageType'} component={ConnectedDocumentManagePage} />
        <Route exact path={'/manage/user-group'} component={UserGroupPage} />
      </Switch>
    </DefaultLayout>
  )

}

ProtectedModule.propTypes = {}

export default ProtectedModule
