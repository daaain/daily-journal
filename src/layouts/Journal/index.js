import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Link } from "phenomic"
import { Form, TextArea } from 'semantic-ui-react'

import { userEditAction } from "../../reducers/journal"
import JournalHeader from "../../components/JournalHeader"

import styles from "./index.css"

const TEMPLATE = `* Biggest wins



* Biggest lessons



* Emotions / motivation



* Feedback to anyone



* Need help with



* Everything else

`;

const Journal = (props) => {
  const date = new Date(props.params.date);
  const yesterday = new Date(props.params.date);
  yesterday.setDate(date.getDate() - 1);
  const tomorrow = new Date(props.params.date);
  tomorrow.setDate(date.getDate() + 1);

  function handleJournalTextEdit(event) {
    props.userEditAction(props.params.date, event.target.value);
  }

  return (
    <div className={ styles.page }>
      <Helmet
        title="Daily journal"
      />
      <JournalHeader title={ `Daily journal – ${props.params.date}` }>
        <div className={ styles.links }>
          <Link className={ styles.link + " " + styles.left } to={`/journal/${yesterday.toISOString().substr(0, 10)}`}>↩	Back one day</Link>
          <Link className={ styles.link + " " + styles.right } to={`/journal/${tomorrow.toISOString().substr(0, 10)}`}>Forward one day ↪</Link>
        </div>
      </JournalHeader>
      <div className={ styles.wrapper }>
        <Form>
          <TextArea autoHeight
            className={ styles.journalInput }
            onChange={ handleJournalTextEdit }
            value={ props.journal.journal[props.params.date] || TEMPLATE }
          />
        </Form>
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
