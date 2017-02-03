import React from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Journal from "./layouts/Journal"
import Post from "./layouts/Post"

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      Homepage,
      Post,
    }}
  />
)

const isClient = typeof window !== 'undefined'
let redirectToToday = null // set to null for static build only

if (isClient) {
 redirectToToday = (nextState, replace) => {
   replace({ pathname: `/journal/11-11-11` })
  }
}

export default (
  <Route component={ AppContainer }>
    <Route path='/journal/' onEnter={ redirectToToday } />
    <Route path='/journal/:date' component={ Journal } />
    <Route path="*" component={ PageContainer } />
  </Route>
)
