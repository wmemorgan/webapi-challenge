import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateProject, deleteProject } from '../../actions/projects'

import * as S from './ProjectStyles'
import Button from '../DesignComponents/Button'

class Project extends Component {
  state = {
    edit: false,
    id: this.props.project.id,
    name: '',
    descriptions: '',
    completed: this.props.project.completed
  }

  prePopulateForm = () => {
    const { name, description } = this.props.project
    this.setState({
      name,
      description
    })
  }

  toggleEdit() {
    this.setState(prevState => (
      { edit: !prevState.edit }
    ),
      () => this.prePopulateForm()
    )
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

  handleUpdate = e => {
    e.preventDefault()
    // invoke data update action creator
    this.props.updateProject(this.state)
    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({
      edit: false,
      id: this.props.project.id,
      name: '',
      description: ''
    })
  }

  handleDelete = id => {
    this.props.deleteProject(id)
    this.props.history.push('/')
  }

  render() {
    const { name, id, description, actions } = this.props.project
    return (
      <>
        <S.ProjectInfoContainer>
          <header>
            <i className="far fa-edit" onClick={() => this.toggleEdit()}>
            </i>
            <i className="fa fa-trash"
              onClick={() => this.handleDelete(id)}>
            </i>
          </header>
          <div className="project-info">
            {!this.state.edit ?
              <h3 className="stat-data">{name}</h3> :
              <input name="name" type="text"
                placeholder="Name" onChange={this.handleInput}
                value={this.state.name}
              />
            }
            <div className="project-stats">
              <div className="stat-category">Description:</div>
              {!this.state.edit ?
                <div className="stat-data">{description}</div> :
                <input name="description" type="number"
                  placeholder="Description" onChange={this.handleInput}
                  value={this.state.description}
                />
              }
              <S.CheckBoxGroup>
                <label htmlFor="">Complete:</label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.completed}
                  onChange={this.toggleProjectComplete}
                />
              </S.CheckBoxGroup>
              <div className="stat-category">Actions:</div>
              {!this.state.edit ?
                <div className="stat-data">{actions}</div> :
                <input
                  onChange={this.handleInput}
                  placeholder="actions"
                  value={this.state.height}
                  name="actions"
                />
              }
            </div>
            <S.ButtonMenu {...this.state} onClick={this.handleUpdate}>
              <Button update>Update</Button>
            </S.ButtonMenu>

          </div>
        </S.ProjectInfoContainer>
      </>
    )
  }
}

export default connect(null, { updateProject, deleteProject })(Project);

