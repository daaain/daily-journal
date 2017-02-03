import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { userEditAction } from "../../journalReducer"

import styles from "./index.css"

const Journal = (props) => {
  console.log('Journal props', props);
  function handleJournalTextEdit(event) {
    props.userEditAction(event.target.value);
  }
  return (
    <div className={ styles.page }>
      <Helmet
        title="Daily journal"
      />
      <div
        className={ styles.hero }
        style={ { background: `#111 url(https://farm4.staticflickr.com/3949/15589950511_3675b15e59_k.jpg) 50% 50% / cover` } }
      >
        <div className={ styles.header }>
          <div className={ styles.wrapper }>
            <h1 className={ styles.heading }>{ `Daily journal – ${props.params.date}` }</h1>
          </div>
        </div>
      </div>
      <div className={ styles.wrapper }>
        <textarea
          className={ styles.journalInput }
          onChange={ handleJournalTextEdit }
          value={ props.journal.journal }
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    journal: state.journal
  }
}

const mapDispatchToProps = {
  userEditAction
}

Journal.propTypes = {
  journal: PropTypes.object,
  params: PropTypes.object,
  userEditAction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
