import React, { PropTypes } from "react"
import { connect } from "react-redux"
import { incrementAction, decrementAction } from "../../journalReducer"

import Page from "../Page"

const Journal = (props) => {
  console.log('Journal props', props);
  return (
    <Page { ...props }>
      <div>
        <textarea />
        <span>Counter value: {props.journal.journal}</span>
        <button onClick={props.incrementAction}>+</button>
        <button onClick={props.decrementAction}>-</button>
      </div>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    journal: state.journal
  }
}

const mapDispatchToProps = {
  incrementAction,
  decrementAction
}

Journal.propTypes = {
  journal: PropTypes.object,
  incrementAction: PropTypes.func,
  decrementAction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
