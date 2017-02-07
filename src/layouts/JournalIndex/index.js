import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Link } from "phenomic"
import { Button } from 'semantic-ui-react'
import JournalHeader from "../../components/JournalHeader"

import styles from "./index.css"

const JournalIndex = () => {
  return (
    <div className={ styles.page }>
      <Helmet
        title="Daily journal"
      />
      <JournalHeader title={ `Daily journal entries` } />
      <div className={ styles.wrapper }>
        <p>Calendar marking days with journal entries will be here...</p>
        <Link to={`/journal/${new Date().toISOString().substr(0, 10)}`}>
          <Button basic>
            Go to today’s entry
          </Button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    journal: state.journal
  }
}

JournalIndex.propTypes = {
  journal: PropTypes.object,
}

export default connect(mapStateToProps)(JournalIndex)
