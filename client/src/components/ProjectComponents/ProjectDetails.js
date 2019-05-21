import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import { updateProject, deleteProject } from '../../actions/projects'

import ActionBoard from '../ActionComponents/ActionBoard'
import * as S from './ProjectStyles'
import Button from '../DesignComponents/Button'

const API_ENDPOINT = process.env.API_ENDPOINT || `http://10.6.5.229:5000/api/projects`

class Project extends Component {
  state = {
    edit: false,
    id: this.props.project.id,
    name: '',
    descriptions: '',
    completed: this.props.project.completed,
    actions: []
  }

  prePopulateForm = async id => {
    try {
      let projectDetail = await axios.get(`${API_ENDPOINT}/${this.state.id}`)
      console.log(`Invoke prePopulateForm: `, projectDetail)
      const { name, description, completed, actions } = projectDetail.data
      this.setState({
        name,
        description,
        completed,
        actions
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
      () => this.prePopulateForm(this.props.project.id)
    )
  }

  toggleProjectComplete = () => {
    console.log(`toggleProjectComplete before change: `, this.state.completed)
    this.setState({ completed: !this.state.completed },
      () => {
        console.log(`toggleProjectComplete: `, this.state.completed)
        // Update project record
        this.handleUpdate()
      }
    )
  }  

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpdate = () => {
    let updatedProject = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      completed: this.state.completed
    }
    console.log(`handleUpdate ID: `, updatedProject.id)
    // invoke data update action creator
    this.props.updateData(updatedProject)
    console.log(`Form submitted data sent: ${JSON.stringify(this.state)}`)

    // reset form fields
    this.setState({edit: false})
  }

  handleDelete = id => {
    this.props.deleteData(id)
    this.props.history.push('/')
  }

  componentDidMount() {
    this.prePopulateForm(this.state.id)
  }

  render() {
    const { name, id, description } = this.state
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
                <input name="description" type="text"
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
            </div>
            
            <S.ButtonMenu {...this.state} onClick={this.handleUpdate}>
              <Button update>Update</Button>
            </S.ButtonMenu>

          </div>
          <ActionBoard {...this.state} {...this.props} />
        </S.ProjectInfoContainer>
      </>
    )
  }
}

export default connect(null, 
  { 
    updateData: updateProject, 
    deleteData: deleteProject 
  })(Project);

