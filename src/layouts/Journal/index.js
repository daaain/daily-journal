import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import { Map } from 'immutable';
import { connect } from "react-redux"
import { Link } from "phenomic"
import { Form, Input, TextArea } from 'semantic-ui-react'

import { journalQuestionEditAction, journalAnswerEditAction } from "../../reducers/journal"
import JournalHeader from "../../components/JournalHeader"

import styles from "./index.css"

const Journal = (props) => {
  const dateString = props.params.date;
  const date = new Date(dateString);
  const yesterday = new Date(dateString);
  yesterday.setDate(date.getDate() - 1);
  const tomorrow = new Date(dateString);
  tomorrow.setDate(date.getDate() + 1);

  const journal = props.journal.get('journal');
  const entry = journal.get(dateString);
  const questions = Map.isMap(entry) ? entry.get('questions') : props.journal.get('questions');

  return (
    <div className={ styles.page }>
      <Helmet
        title="Daily journal"
      />
      <JournalHeader title={ `Daily journal – ${dateString}` }>
        <div className={ styles.links }>
          <Link className={ styles.link + " " + styles.left } to={`/journal/${yesterday.toISOString().substr(0, 10)}`}>↩	Back one day</Link>
          <Link className={ styles.link + " " + styles.right } to={`/journal/${tomorrow.toISOString().substr(0, 10)}`}>Forward one day ↪</Link>
        </div>
      </JournalHeader>
      <div className={ styles.wrapper }>
        <Form>
          {
            questions.map((question, index) => ([
              <Input
                key={ index }
                fluid
                value={ question }
                onChange={ (event) => { props.journalQuestionEditAction(dateString, event.target.value, index) } }
              />,
              <TextArea autoHeight
                className={ styles.journalInput }
                onChange={ (event) => { props.journalAnswerEditAction(dateString, event.target.value, index) } }
                value={ Map.isMap(entry) ? entry.get('answers').get(index) : '' }
              />
            ]))
          }
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
  journalQuestionEditAction,
  journalAnswerEditAction
}

Journal.propTypes = {
  journal: PropTypes.object,
  params: PropTypes.object,
  userEditAction: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
