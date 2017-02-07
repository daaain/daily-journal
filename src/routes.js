import React from "react"
import { Route, IndexRoute } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Journal from "./layouts/Journal"
import JournalIndex from "./layouts/JournalIndex"
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

export default (
  <Route component={ AppContainer }>
    <Route path='journal'>
      <IndexRoute component={ JournalIndex } />
      <Route path=':date' component={ Journal } />
    </Route>
    <Route path="*" component={ PageContainer } />
  </Route>
)
