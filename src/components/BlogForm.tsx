import React from 'react'
import './styles/component-new-blog.scss'
import {EditorState} from "draft-js"
import {TextEditor} from "./TextEditor/TextEditor"
import {Button, Form, Header, Icon} from "semantic-ui-react"
import {RecursivePick} from "../utils/DeepStateMerge/RecursivePick"
import {deepStateMerge} from "../utils/DeepStateMerge/MergeUtils"
import {BreakkyBlog, DinnerDrama, isBreakkyBlog} from "../Types/BlogTypes"
import {stateToHTML} from "draft-js-export-html"
import {BreakkyBlogsServiceNew} from "../Services/BreakkyBlogsServicesNew"
import {MaintainBlogsToggle} from "./MaintainBlogs/MaintainBlogs"
import {DisplayToggle} from "../Enums/DisplayToggle"
import {DinnerDramaServiceNew} from "../Services/DinnerDramaServiceNew"

type Props = {
  handleClick: (value: DisplayToggle) => void
  blog: BreakkyBlog | DinnerDrama | null
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
  blogVariety: BlogType
}

export enum BlogType {
  DINNER = 'dinner',
  BREAKKY = 'breakky'
}

export type BlogFormState = {
  editorState: EditorState
  title: string
  cafeOrRestaurant: string
  location: string
}

export class BlogForm extends React.Component<Props, BlogFormState> {

  state: BlogFormState = {
    editorState: EditorState.createEmpty(),
    title: '',
    cafeOrRestaurant: '',
    location: ''
  }

  componentDidMount = () => {
    const {blog} = this.props
    if (blog !== null) {
      isBreakkyBlog(blog)
        ? this.updateFormForBreakkyBlog(blog)
        : this.updateFormForDinnerDrama(blog)
    }
  }

  updateFormForBreakkyBlog = (blog: BreakkyBlog) => {
    this.setState({
      title: blog.title,
      cafeOrRestaurant: blog.cafe,
      location: blog.location
    })
  }

  updateFormForDinnerDrama = (blog: DinnerDrama) => {
    this.setState({
      title: blog.title,
      cafeOrRestaurant: blog.restaurant,
      location: blog.location
    })
  }

  handleChange = (delta: RecursivePick<BlogFormState>) => {
    this.setState(deepStateMerge(delta), this.saveState)
  }

  saveState = () => {
    this.setState(this.state)
  }

  saveBlog = async () => {
    if(this.props.blogVariety === BlogType.BREAKKY) {
      const blog = this.constructBreakky()
      await BreakkyBlogsServiceNew.create(blog)
    } else {
      const blog = this.constructDinner()
      await DinnerDramaServiceNew.create(blog)
    }
  }

  constructBreakky = (): BreakkyBlog => {
    return {
      title: this.state.title,
      cafe: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: 'IMAGE',
      blogText: stateToHTML(this.state.editorState.getCurrentContent()),
      blogVariety: this.props.blogVariety
    }
  }

  constructDinner = (): DinnerDrama => {
    return {
      title: this.state.title,
      restaurant: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: 'IMAGE',
      blogText: stateToHTML(this.state.editorState.getCurrentContent()),
      blogVariety: this.props.blogVariety
    }
  }

  editorStateChange = (editorState: EditorState) => {
    this.setState({editorState: editorState})
  }

  onInlineFilesAttached = (file: File) => {
    console.log('file', file)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.blog &&
        <Button basic
                color={'blue'}
                floated={'left'}
                icon
                labelPosition={'left'}
                onClick={() => this.props.changeMaintainToggle(MaintainBlogsToggle.MAINTAIN)}>
          <Icon name={'meh'}/>
          Back
        </Button>
        }
        <Header as={'h3'} className={'blogFormHeader'} block>Create Blog Ya Fuck Boy</Header>
        <div className={'newBlogContainer'}>
          <React.Fragment>
            <br/>
            <br/>
            <div className={'blogForm'}>
              <Form>
                <Form.Input fluid
                            label={'Title'}
                            onChange={(e, data) => this.handleChange({title: data.value})}
                            value={this.state.title}
                            placeholder={'Title...'}
                />
                <Form.Group widths={"equal"}>
                  <Form.Input fluid
                              label={'Cafe/Restaurant Name'}
                              onChange={(e, data) => this.handleChange({cafeOrRestaurant: data.value})}
                              value={this.state.cafeOrRestaurant}
                              placeholder={'Cafe/Restaurant Name...'}
                  />
                  <Form.Input fluid
                              label={'Suburb'}
                              onChange={(e, data) => this.handleChange({location: data.value})}
                              value={this.state.location}
                              placeholder={'Cafe/Restaurant Suburb...'}
                  />
                  <Form.Select fluid
                               label={'Blog Type'}
                               selection
                               disabled
                               value={this.props.blogVariety}
                               options={[
                                 {key: 'breakky', text: 'Breakky Blog', value: BlogType.BREAKKY},
                                 {key: 'dinner', text: 'Dinner Drama', value: BlogType.DINNER}
                               ]}
                  />
                </Form.Group>
                <TextEditor editorState={this.state.editorState}
                            editorStateChange={this.editorStateChange}
                            onInlineFilesAttached={this.onInlineFilesAttached}
                            onFileAttached={this.onInlineFilesAttached}
                />
                <br/>
                <br/>
                <Button content={'Save Blog'}
                        float={'right'}
                        onClick={() => this.saveBlog()}
                        color={'green'}/>
              </Form>
            </div>
          </React.Fragment>
        </div>
      </React.Fragment>
    )
  }
}
