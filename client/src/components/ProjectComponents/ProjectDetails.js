import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import { updateProject, deleteProject } from '../../actions/projects'

import ActionBoard from '../ActionComponents/ActionBoard'
import * as S from './ProjectStyles'
import Button from '../DesignComponents/Button'

const API_ENDPOINT = 'https://wme-projects-api-v2.herokuapp.com/api/projects'

class Project extends Component {
  state = {
    edit: false,
    id: this.props.project.id,
    name: '',
    descriptions: '',
    is_complete: this.props.project.is_complete,
    actions: []
  }

  prePopulateForm = async () => {
    try {
      let projectDetail = await axios.get(`${API_ENDPOINT}/${this.state.id}`)
      console.log(`Invoke prePopulateForm: `, projectDetail)
      const { name, description, is_completed, actions } = projectDetail.data
      this.setState({
        name,
        description,
        is_completed,
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
      () => this.prePopulateForm()
    )
  }

  toggleProjectComplete = () => {
    console.log(`toggleProjectComplete before change: `, this.state.is_complete)
    this.setState({ is_complete: !this.state.is_complete },
      () => {
        console.log(`toggleProjectComplete: `, this.state.is_complete)
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
      is_complete: this.state.is_complete
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
    this.prePopulateForm()
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
                  defaultChecked={this.state.is_complete}
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

