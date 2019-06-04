import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addAction, updateAction, deleteAction } from '../../actions/projectActions'
import * as S from './ActionStyles'
class Form extends Component {
  state = {
    id: '',
    project: '',
    description: '',
    notes: '',
    is_complete: false
  }

  toggleComplete = () => {
    console.log(`toggleComplete before change: `, this.state.is_complete)
    this.setState({ is_complete: !this.state.is_complete },
      () => {
        console.log(`toggleComplete: `, this.state.is_complete)
        // Update project record
        let updatedRecord = {
          ...this.state,
          is_complete: this.state.is_complete
        }
        this.props.updateData(updatedRecord)
      }
    )
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddition = e => {
    // prevent default
    e.preventDefault()
    // gather form data
    let newRecord = {
      project_id: this.props.project.id,
      description: this.state.description,
      notes: this.state.notes,
      is_complete: this.state.is_complete
    }
    // send new record to api
    this.props.addData(newRecord)
    console.log(`Form submitted data sent: ${JSON.stringify(newRecord)}`)
    // reset form fields
    this.setState({
      description: '',
      notes: '',
      is_complete: false
    })  
  }

  handleUpdate = e => {
    // prevent default
    e.preventDefault()
    // gather form data
    let updatedRecord = {
      id: this.state.id,
      project_id: this.props.project.id,
      description: this.state.description,
      notes: this.state.notes,
      is_complete: this.state.is_complete
    }
    // invoke data update action creator
    this.props.updateData(updatedRecord)
    console.log(`Form submitted data sent: ${JSON.stringify(updatedRecord)}`)

    // reset form fields
    // this.setState({ edit: false })
  }

  handleDelete = e => {
    // prevent default
    e.preventDefault()
    // invoke the delete method and pass id
    this.props.deleteData(this.state.id)
    // reset form field
    this.setState({ id: '' })
  }

  submitHandler = e => {
    e.preventDefault()
    if (this.props.update) {
      this.handleUpdate(e)
    } else if (this.props.delete) {
      this.handleDelete(e)
    } else {
      this.handleAddition(e)
    }
  }

  render () {
    return (
      <S.FormContainer {...this.props} onSubmit={this.submitHandler}>
        <S.FormGroup>
          {(this.props.update || this.props.delete) &&
            <input name="id" type="number"
              placeholder="ID" onChange={this.handleInput}
              value={this.state.id}
            />
          }
          {!this.props.delete && (
            <>
              <input name="description" type="text"
                placeholder="Description" onChange={this.handleInput}
                value={this.state.description}
              />
              <input name="notes" type="text"
                placeholder="Notes" onChange={this.handleInput}
                value={this.state.notes}
              />
            </>
          )}
          {(this.props.update || this.props.delete) &&
            <input
              type="checkbox"
              defaultChecked={this.state.is_complete}
              onChange={this.toggleComplete}
            />
          }
          <button type="submit">+</button>
        </S.FormGroup>
        
      </S.FormContainer>
    )
  }
}

export default connect(null, {
  addData: addAction, 
  updateData: updateAction,
  deleteData: deleteAction
})(Form)