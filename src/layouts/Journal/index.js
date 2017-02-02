import React from "react"
import { connect } from "react-redux"

import Page from "../Page"
import journal from "../../journalReducer"

const Journal = (props) => {
  console.log(props);
  return (
    <Page { ...props }>
      <div>
        <textarea />
      </div>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: journal(state)
  }
}

const ConnectedJournal = connect(
  mapStateToProps
)(Journal)

export default ConnectedJournal
