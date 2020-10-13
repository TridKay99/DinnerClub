import React from 'react';
import './styles/component-new-blog.scss';
import {DisplayToggle} from "./DinnerClubContainerAdventures";
import {EditorState} from "draft-js";
import {TextEditor} from "./TextEditor/TextEditor";
import {Button, Form} from "semantic-ui-react"
import {RecursivePick} from "../DeepStateMerge/RecursivePick"
import {deepStateMerge} from "../DeepStateMerge/MergeUtils"
import {BreakkyBlog} from "../Types/BreakkyBlog"
import {stateToHTML} from "draft-js-export-html"
import {BreakkyBlogsServiceNew} from "../Services/BreakkyBlogsServicesNew"


type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
  blog: BreakkyBlog | null
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
  blogType: BlogType
}

export class BlogForm extends React.Component<Props, BlogFormState> {

  state: BlogFormState = {
    editorState: EditorState.createEmpty(),
    title: '',
    cafeOrRestaurant: '',
    location: '',
    blogType: BlogType.NONE
  };

  componentDidMount = () =>{
    const {blog} = this.props
    if(blog !== null) {
      this.setState({
        title: blog.title,
        cafeOrRestaurant: blog.cafe,
        location: blog.location,
        blogType: blog.blogType
      })
    }
  }

  handleChange = (delta: RecursivePick<BlogFormState>) => {
    this.setState(deepStateMerge(delta), this.saveState)
  }

  saveState = () => {
    this.setState(this.state)
  }

  saveBlog = async() => {
    const blog = this.constructBlog()
    console.log('in save blog', blog)
    await BreakkyBlogsServiceNew.create(blog)
  }

  constructBlog = () => {
    return {
      title: this.state.title,
      cafe: this.state.cafeOrRestaurant,
      location: this.state.location,
      displayImage: 'IMAGE',
      body: stateToHTML(this.state.editorState.getCurrentContent()),
      blogType: this.state.blogType
    }
  }

  editorStateChange = (editorState: EditorState) => {
    this.setState({editorState: editorState})
  };

  render() {
    return (
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
                             onChange={(e, data) => this.handleChange({blogType: data.value as BlogType})}
                             selection
                             value={this.state.blogType !== null ? this.state.blogType : undefined}
                             options={[
                               { key: 'breakky', text: 'Breakky Blog', value: BlogType.BREAKKY },
                               { key: 'dinner', text: 'Dinner Drama', value: BlogType.DINNER },
                               { key: 'none', text: '', value: BlogType.NONE }
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
    )
  }
}
