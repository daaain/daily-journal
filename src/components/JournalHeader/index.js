import React, { PropTypes } from "react"
import { connect } from "react-redux"

import { Button, Icon, Modal, Card, List, Form, Input } from 'semantic-ui-react'
import Dropzone from 'react-dropzone';

import { dumpDatabase, importDatabase, destroyDatabase } from "../../helpers/pouch"

import { questionTemplateEditAction } from "../../reducers/journal"

import styles from "./index.css"

const JournalHeader = (props) => {
  const questionTemplates = props.journal.get('questions');

  function onFileImport(files) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        importDatabase(event.target.result);
      });
      reader.readAsText(files[0]);
    }
  }

  return (
    <div
      className={ styles.hero }
      style={ { background: `#111 url(https://farm4.staticflickr.com/3949/15589950511_3675b15e59_k.jpg) 50% 50% / cover` } }
    >
      <div className={ styles.header }>
        <div className={ styles.wrapper }>
          <h1 className={ styles.heading }>{ props.title }</h1>
          <Modal trigger={<Button icon basic inverted className={ styles.button }><Icon name='configure' /></Button>}>
            <Modal.Header>Tools / settings</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Card.Group>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>
                        Questions
                      </Card.Header>
                      <Card.Description>
                        Edit journal questions here.
                      </Card.Description>
                      <Card.Meta>
                        Note: existing entries have questions saved, so setting these will only affect new entries.
                      </Card.Meta>
                      <Card.Content extra>
                        <List divided verticalAlign='middle'>
                          <List.Item>
                            <List.Content>
                              <Form>
                                {
                                  questionTemplates.map((question, index) => (
                                    <Input
                                      key={ index }
                                      fluid
                                      placeholder='Type a question for yourself...'
                                      value={ question }
                                      onChange={ (event) => { props.questionTemplateEditAction(event.target.value, index) } }
                                    />
                                  ))
                                }
                              </Form>
                            </List.Content>
                          </List.Item>
                        </List>
                      </Card.Content>
                    </Card.Content>
                  </Card>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>
                        Database tools
                      </Card.Header>
                      <Card.Description>
                        Manually save or restore your data using a database dump file, or delete all your data.
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button basic color='green' onClick={ dumpDatabase }>Export</Button>
                      <p>Pressing this button will save a file called "journal_db-" plus the current ISO date and time. You can import this back later.</p>
                    </Card.Content>
                    <Card.Content extra>
                      <Dropzone
                        onDrop={ onFileImport }
                        accept="application/json"
                        multiple={false}
                        className={ styles.dropzone }
                      >
                        {({ isDragActive, isDragReject }) => {
                          if (isDragActive) {
                            return "Looks good, drop to import!";
                          }
                          if (isDragReject) {
                            return "This dropzone accepts only JSON files!";
                          }
                          return "To import, drop a previous database export here, or click to select a file to upload.";
                        }}
                      </Dropzone>
                    </Card.Content>
                    <Card.Content extra>
                      <Button basic color='red' onClick={ destroyDatabase }>Delete all data</Button>
                      <p><em>WARNING!</em> Pressing this button will delete all your journal data and settings, no questions asked...</p>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          { props.children }
        </div>
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
  questionTemplateEditAction
}

JournalHeader.propTypes = {
  journal: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalHeader)
