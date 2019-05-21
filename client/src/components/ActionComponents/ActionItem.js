import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateAction, deleteAction } from '../../actions/projectActions'
import * as S from './ActionStyles'

const API_ENDPOINT = process.env.API_ENDPOINT || `http://10.6.5.229:5000/api/projects`

class Action extends Component {
  state = {
    id: this.props.action ? 
      this.props.action.id : '',
    project_id: this.props.project.id,
    description: '',
    notes: '',
    completed: false,
    hidden: true,
    edit: false
  }

  prePopulateForm = async () => {
    try {
      let actionItem = await axios.get(`${API_ENDPOINT}/${this.state.project_id}/actions/${this.state.id}`)
      console.log(`Invoke prePopulateForm: `, actionItem)
      const { id, description, notes, completed } = actionItem.data
      this.setState({
        id,
        description,
        notes,
        completed
      })
    }

    catch (err) {
      console.log(`Error occurred: `, err)
    }
  }

  toggleEdit() {
    this.setState(prevState => (
      { edit: !prevState.edit }
    ),
      () => {
        this.prePopulateForm()
        console.log(`invoke toggleEdit`)
      }
    )
  }

  toggleDeleteBtn = e => {
    e.preventDefault()
    this.setState(prevState => ({
      hidden: !prevState.hidden
    }))
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

   handleUpdate = e => {
    // prevent default
    e.preventDefault()
    // gather form data
    let updatedRecord = {
      id: this.state.id,
      project_id: this.state.project_id,
      description: this.state.description,
      notes: this.state.notes,
      completed: this.state.completed
    }
    // invoke data update action creator
    this.props.updateData(updatedRecord)
    console.log(`Form submitted data sent: ${JSON.stringify(updatedRecord)}`)

    // reset form fields
    this.setState({ edit: false })
  }
  
  handleDelete = e => {
    // prevent default
    e.preventDefault()
    // invoke the delete method and pass id
    this.props.deleteData(this.state.id)
    this.props.history.push('/')
    // reset form field
    this.setState({ id: '' })
  } 

  componentDidMount() {
    this.prePopulateForm(this.state.id)
  }

  render() {
    return (
      <S.ActionContainer>
        {!this.state.edit ?
          <S.ActionItemWrapper>
            <S.ItemGroup>
              <div onClick={() => this.toggleEdit()}>Description:</div>
              <S.Action onClick={() => this.toggleEdit()}>{this.state.description}</S.Action>
            </S.ItemGroup>
            <S.ItemGroup>
              <div onClick={() => this.toggleEdit()}>Notes:</div>
              <S.Action onClick={() => this.toggleEdit()}>{this.state.notes}</S.Action>
            </S.ItemGroup>
            <S.CheckBoxGroup>
              <label htmlFor="">Completed:</label>
              <input
                type="checkbox"
                defaultChecked={this.state.completed}
                onChange={this.toggleProjectComplete}
              />
            </S.CheckBoxGroup>
          </S.ActionItemWrapper> :
          <S.FormContainer {...this.props} onSubmit={this.submitHandler}>
            <S.FormGroup>
              {(this.props.update || this.props.delete) &&
                <input name="id" type="number"
                  placeholder="ID" onChange={this.handleInput}
                  value={this.state.id}
                />
              }
              <input name="project_id" type="number"
                placeholder="Project ID" onChange={this.handleInput}
                value={this.state.project_id}
              />              
              <input name="description" type="text"
                placeholder="Description" onChange={this.handleInput}
                value={this.state.description}
              />
              <input name="notes" type="text"
                placeholder="Notes" onChange={this.handleInput}
                value={this.state.notes}
              />
              {(this.props.update || this.props.delete) &&
                <input
                type="checkbox"
                defaultChecked={this.state.completed}
                onChange={this.toggleComplete}
                />
              }              
            </S.FormGroup>
          </S.FormContainer> 
        }
        
        <S.DeleteContainer>
          {!this.state.edit ?
            <i onClick={this.toggleDeleteBtn} className="fas fa-ellipsis-v"></i> :
            <i className="far fa-edit" onClick={this.handleUpdate}></i>
          }
          {
            this.state.hidden ? '' :
              <i className="fa fa-trash"
                aria-hidden="true"
                onClick={(e) => this.handleDelete(e, this.props.slot.id)}
              >
              </i>
          }
        </S.DeleteContainer>
      </S.ActionContainer>
    )
  }
  
}

export default connect(null,
  {
    updateData: updateAction,
    deleteData: deleteAction
  }
)(Action)