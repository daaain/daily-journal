import React, { PropTypes } from "react"

import { Button, Icon, Modal, Card, List, Input } from 'semantic-ui-react'

import { dumpDatabase } from "../../helpers/pouch"

import styles from "./index.css"

const JournalHeader = (props) => (
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
                      Database export / import
                    </Card.Header>
                    <Card.Description>
                      Manually save or restore your data using a database dump file.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={ dumpDatabase }>Export</Button>
                      <Button basic color='blue'>Import</Button>
                    </div>
                  </Card.Content>
                </Card>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      Questions
                    </Card.Header>
                    <Card.Description>
                      Edit journal questions here
                    </Card.Description>
                    <Card.Content extra>
                      <List divided verticalAlign='middle'>
                        <List.Item>
                          <List.Content>
                            <Input fluid placeholder='Type a question for yourself...' size='large' />
                          </List.Content>
                        </List.Item>
                      </List>
                    </Card.Content>
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

JournalHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default JournalHeader
