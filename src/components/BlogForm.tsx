import React from 'react';
import './styles/component-new-blog.scss';
import {DisplayToggle} from "./DinnerClubContainerAdventures";
import {EditorState} from "draft-js";
import {TextEditor} from "./TextEditor/TextEditor";
import {Form} from "semantic-ui-react"
import {BreakkyBlog} from "./MaintainBlogs/MaintainBlogs"

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

type State = {
  editorState: EditorState
  title: String
  cafeOrRestaurant: String
  location: String
  blogType: BlogType
}

export class BlogForm extends React.Component<Props, State> {

  state: State = {
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

  handleEditorStateChange = (editorState: EditorState) => {
    this.setState({editorState})
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
                          value={this.state.title}
                          placeholder={'Title...'}
              />
              <Form.Group widths={"equal"}>
                <Form.Input fluid
                            label={'Cafe/Restaurant Name'}
                            value={this.state.cafeOrRestaurant}
                            placeholder={'Cafe/Restaurant Name...'}
                />
                <Form.Input fluid
                            label={'Suburb'}
                            value={this.state.location}
                            placeholder={'Cafe/Restaurant Suburb...'}
                />
                <Form.Select fluid
                             label={'Blog Type'}
                             value={this.state.blogType}
                             options={[
                               { key: 'breakky', text: 'Breakky Blog', value: BlogType.BREAKKY },
                               { key: 'dinner', text: 'Dinner Drama', value: BlogType.DINNER },
                               { key: 'none', text: '', value: BlogType.NONE }
                               ]}
                             placeholder={'Blog Type...'}
                />
              </Form.Group>
              <TextEditor editorState={this.state.editorState}
                          onChange={() => this.handleEditorStateChange(this.state.editorState)}
              />
            </Form>
          </div>
        </React.Fragment>
      </div>
    )
  }
}
