import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormContainer } from '../SharedComponents/FormStyles.js'
import Button from '../DesignComponents/Button'

import { addProject, updateProject, deleteProject } from '../../actions/projects'

class Form extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    is_complete: false
  }

  toggleComplete = () => {
    console.log(`toggleProjectComplete before change: `, this.state.is_complete)
    this.setState({ is_complete: !this.state.is_complete },
      () => {
        console.log(`toggleProjectComplete: `, this.state.is_complete)
        // Update project record
        let updatedProject = {
          ...this.props.project,
          is_complete: this.state.is_complete
        }
        this.props.updateData(updatedProject)
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
      name: this.state.name,
      description: this.state.description,
      is_complete: this.state.is_complete
    }

    // send new record to api
    this.props.addData(newRecord)
    console.log(`Form submitted data sent: ${JSON.stringify(newRecord)}`)
    this.props.history.push('/')

    // reset form fields
    this.setState({
      id: '',
      name: '',
      description: '',
      is_complete: false
    })
  }

  handleUpdate = e => {
    // prevent default
    e.preventDefault()
    let updatedProject = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      is_complete: this.state.is_complete
    }
    console.log(`handleUpdate ID: `, updatedProject.id)
    // invoke data update action creator
    this.props.updateProject(updatedProject)
    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({ edit: false })
  }

  handleDelete = e => {
    // prevent default
    e.preventDefault()
    // invoke the deleteFriend method and pass id
    this.props.deleteData(this.state.id)
    this.props.history.push('/')
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

  componentDidMount() {
    if(this.props.update) {
      this.prePopulateForm(this.props.id)
    }
  }

  render() {
    return (
      <FormContainer {...this.props}>
        <div className="windowFrame"></div>
        <form onSubmit={this.submitHandler}>
          {(this.props.update || this.props.delete) &&
            <input name="id" type="number"
              placeholder="ID" onChange={this.handleInput}
              value={this.state.id}
            />
          }
          {!this.props.delete && (
            <>
              <input name="name" type="text"
                placeholder="Name" onChange={this.handleInput}
                value={this.state.name}
              />
              <input name="description" type="text"
                placeholder="Description" onChange={this.handleInput}
                value={this.state.description}
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
          <Button type="submit" {...this.props}>
            {`${this.props.add ? 'Add' : ''} 
              ${this.props.update ? 'Update' : ''}  
              ${this.props.delete ? 'Delete' : ''}   
              Project
            `}
          </Button>
        </form>
      </FormContainer>
    )
  }
}

export default connect(null, { 
  addData: addProject, 
  updateData: updateProject,
  deleteData: deleteProject
})(Form)