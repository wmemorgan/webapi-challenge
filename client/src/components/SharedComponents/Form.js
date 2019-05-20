import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormContainer } from './FormStyles'
import Button from '../DesignComponents/Button'

import { addProject, updateProject, deleteProject } from '../../actions/projects'

class Form extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    completed: false
  }

  toggleProjectComplete = () => {
    console.log(`toggleProjectComplete before change: `, this.state.completed)
    this.setState({ completed: !this.state.completed },
      () => {
        console.log(`toggleProjectComplete: `, this.state.completed)
        // Update project record
        let updatedProject = {
          ...this.props.project,
          completed: this.state.completed
        }
        this.props.updateData(updatedProject)
      }
    )
  } 

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData = e => {
    // prevent default
    e.preventDefault()

    // gather form data
    let newRecord = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    }

    // send new record to api
    this.props.addData(newRecord)
        console.log(`Form submitted data sent: ${JSON.stringify(newRecord)}`)
    this.props.history.push('/')

    // reset form fields
    this.setState({
      id: '',
      name: '',
      age: '',
      height: ''
    })
  }

  updateData = e => {
    // prevent default
    e.preventDefault()
    // send updated record to api
    this.props.updateData(this.state)
    this.props.history.push(`/friends/${this.state.id}`)

    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({
      id: '',
      name: '',
      age: '',
      height: ''
    })
  }

  deleteData = e => {
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
      this.updateRecord(e)
    } else if (this.props.delete) {
      this.deleteData(e)
    } else {
      this.addData(e)
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
            defaultChecked={this.state.completed}
            onChange={this.toggleProjectComplete}
            />
          }
          <Button type="submit" {...this.props}>
            {`${this.props.add ? 'Add' : ''} 
              ${this.props.update ? 'Update' : ''}  
              ${this.props.delete ? 'Delete' : ''}   
              Friend
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