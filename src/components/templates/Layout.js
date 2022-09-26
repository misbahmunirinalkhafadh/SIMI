import React, { useContext, Suspense, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../../routes'

import Main from './Main'
import { SidebarContext } from '../../context/SidebarContext'
import { Header, Sidebar } from '../organisms'
import { ThemedSuspense } from '../atoms'
import { Page404 } from '../../pages'

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [closeSidebar, location])

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Redirect exact from="/app" to="/app/home" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  )
}

export default Layout
