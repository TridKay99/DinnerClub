import React from 'react'
import './styles/component-new-blog.scss'
import {EditorState} from "draft-js"
import {TextEditor} from "./TextEditor/TextEditor"
import {Button, Form, Header, Icon} from "semantic-ui-react"
import {RecursivePick} from "../utils/DeepStateMerge/RecursivePick"
import {deepStateMerge} from "../utils/DeepStateMerge/MergeUtils"
import {BreakkyBlog, DinnerDrama, FileType, isBreakkyBlog} from "../Types/BlogTypes"
import {stateToHTML} from "draft-js-export-html"
import {BreakkyBlogsServiceNew} from "../Services/BreakkyBlogsServicesNew"
import {MaintainBlogsToggle} from "./MaintainBlogs/MaintainBlogs"
import {DinnerDramaServiceNew} from "../Services/DinnerDramaServiceNew"
import {TextEditorAttachmentButton} from "./TextEditor/TextEditorAttachmentButton"
import {TextEditorCludgeService} from "../Services/TextEditorCludgeService"
import {BlogDisplayToggle} from "./MaintainBlogs/MaintainBlogs"

type Props = {
  setBlogDisplay: (display: BlogDisplayToggle) => void
  blog: BreakkyBlog | DinnerDrama | null
  blogVariety: BlogType
  saveType: MaintainBlogsToggle.CREATE | MaintainBlogsToggle.UPDATE
  collectBlogs: () => void
  handleSetSelectedBlogToNull: () => void
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
  displayImage: FileType | null
  id: undefined | string
}

export class BlogForm extends React.Component<Props, BlogFormState> {

  state: BlogFormState = {
    editorState: EditorState.createEmpty(),
    title: '',
    cafeOrRestaurant: '',
    location: '',
    displayImage: null,
    id: undefined
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
    const editorState = TextEditorCludgeService.getEditorState(blog.blogText)

    this.setState({
      title: blog.title,
      cafeOrRestaurant: blog.cafe,
      location: blog.location,
      editorState
    })
  }

  updateFormForDinnerDrama = (blog: DinnerDrama) => {
    const editorState = TextEditorCludgeService.getEditorState(blog.blogText)

    this.setState({
      id: blog._id,
      title: blog.title,
      cafeOrRestaurant: blog.restaurant,
      location: blog.location,
      editorState
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

      this.props.saveType === MaintainBlogsToggle.CREATE
        ? await BreakkyBlogsServiceNew.create(blog)
        : await BreakkyBlogsServiceNew.update(blog)
      this.collectBlogsAndSwapView()
    } else {
      const blog = this.constructDinner()

      this.props.saveType === MaintainBlogsToggle.CREATE
        ? await DinnerDramaServiceNew.create(blog)
        : await DinnerDramaServiceNew.update(blog)
    }
  }

  collectBlogsAndSwapView = async () => {
    await this.props.collectBlogs
    this.props.setBlogDisplay(BlogDisplayToggle.MAINTAIN)
  }

  constructBreakky = (): BreakkyBlog => {
    return {
      title: this.state.title,
      cafe: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: this.state.displayImage,
      blogText: stateToHTML(this.state.editorState.getCurrentContent()),
      blogVariety: this.props.blogVariety,
      date: new Date()
    }
  }

  constructDinner = (): DinnerDrama => {
    const blogText = TextEditorCludgeService.removePTags(stateToHTML(this.state.editorState.getCurrentContent()))

    return {
      _id: this.state.id,
      title: this.state.title,
      restaurant: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: this.state.displayImage,
      blogText,
      blogVariety: this.props.blogVariety,
      date: new Date()
    }
  }

  editorStateChange = (editorState: EditorState) => {
    this.setState({editorState: editorState})
  }

  onInlineFilesAttached = (file: File) => {
    console.log('file', file)
  }

  onBackButtonClick = () => {
    this.props.handleSetSelectedBlogToNull()
    this.props.setBlogDisplay(BlogDisplayToggle.MAINTAIN)
  }

  render() {
    const buttonColor = this.props.saveType === MaintainBlogsToggle.CREATE ? 'green' : 'blue'
    const buttonText = this.props.saveType === MaintainBlogsToggle.CREATE ? 'Create Blog' : 'Update Blog'

    return (
      <React.Fragment>
        <Button color={'blue'}
                icon
                inverted
                labelPosition={'left'}
                onClick={() => this.onBackButtonClick()}>
          <Icon name={'meh'}/>
          Back
        </Button>
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
                <TextEditorAttachmentButton onChange={this.handleChange}
                                            className={'className2'}
                />
                <br/>
                <br/>
                <Button content={buttonText}
                        float={'right'}
                        onClick={() => this.saveBlog()}
                        color={buttonColor}/>
              </Form>
            </div>
          </React.Fragment>
        </div>
      </React.Fragment>
    )
  }
}
