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

type Props = {
  handleClick: (value: DisplayToggle) => void
  blog: BreakkyBlog | DinnerDrama | null
  changeMaintainToggle: (maintainToggle: MaintainBlogsToggle) => void
}

export enum BlogType {
  DINNER = 'dinner',
  BREAKKY = 'breakky',
  NONE = 'none'
}

export type BlogFormState = {
  editorState: EditorState
  title: string
  cafeOrRestaurant: string
  location: string
  blogVariety: BlogType
}

export class BlogForm extends React.Component<Props, BlogFormState> {

  state: BlogFormState = {
    editorState: EditorState.createEmpty(),
    title: '',
    cafeOrRestaurant: '',
    location: '',
    blogVariety: BlogType.NONE
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
      location: blog.location,
      blogVariety: blog.blogVariety
    })
  }

  updateFormForDinnerDrama = (blog: DinnerDrama) => {
    this.setState({
      title: blog.title,
      cafeOrRestaurant: blog.restaurant,
      location: blog.location,
      blogVariety: blog.blogVariety
    })
  }

  handleChange = (delta: RecursivePick<BlogFormState>) => {
    this.setState(deepStateMerge(delta), this.saveState)
  }

  saveState = () => {
    this.setState(this.state)
  }

  saveBlog = async () => {
    const blog = this.constructBlog()
    await BreakkyBlogsServiceNew.create(blog)
  }

  constructBlog = () => {
    return {
      title: this.state.title,
      cafe: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: 'IMAGE',
      blogText: stateToHTML(this.state.editorState.getCurrentContent()),
      blogVariety: this.state.blogVariety
    }
  }

  editorStateChange = (editorState: EditorState) => {
    this.setState({editorState: editorState})
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
        <div className={'newBlogContainer'}>
          <React.Fragment>
            <Header as={'h3'} block>Create Blog Ya Fuck Boy</Header>
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
                               onChange={(e, data) => this.handleChange({blogVariety: data.value as BlogType})}
                               selection
                               value={this.state.blogVariety !== null ? this.state.blogVariety : undefined}
                               options={[
                                 {key: 'breakky', text: 'Breakky Blog', value: BlogType.BREAKKY},
                                 {key: 'dinner', text: 'Dinner Drama', value: BlogType.DINNER},
                                 {key: 'none', text: '', value: BlogType.NONE}
                               ]}
                               placeholder={'Blog Type...'}
                  />
                </Form.Group>
                <TextEditor editorState={this.state.editorState}
                            editorStateChange={this.editorStateChange}/>
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
