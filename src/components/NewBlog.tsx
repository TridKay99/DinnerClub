import React from 'react';
import {Button, Form, Input, InputOnChangeData} from "semantic-ui-react";
import './styles/component-new-blog.scss';
import {DisplayToggle} from "./DinnerClubContainerAdventures";
import {EditorState} from "draft-js";
import {TextEditor} from "./TextEditor/TextEditor";

type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
}

type State = {
  authorized: boolean
  password: string
  editorState: EditorState
}

export class NewBlog extends React.Component<Props, State> {

  state: State = {
    authorized: false,
    password: '',
    editorState: EditorState.createEmpty()
  };

  handleChange = (data: InputOnChangeData) => {
    this.setState({password: data.value})
  };

  authPassword = (password: string) => {
    if(password === 'chillipig99') {
      this.props.handleClick(DisplayToggle.NEW_BLOG);
      this.setState({authorized: true})
    }
  };

  handleEditorStateChange = (editorState: EditorState) => {
    console.log('editorState', editorState);
    this.setState({editorState})
  };

  render() {
    return (
      <div className={'newBlogContainer'}>
        {this.props.pageToRender === DisplayToggle.ADMIN_LOGIN &&
        <React.Fragment>
          <br/>
          <br/>
          <Form>
            <Form.Field>
              <Input icon='lock'
                     value={this.state.password}
                     onChange={(e,data) => this.handleChange(data)}
                     placeholder={'Auth Password'}
                     type='password'/>
            </Form.Field>
            <Button content={'Submit'}
                    onClick={() => this.authPassword(this.state.password)}/>
          </Form>
        </React.Fragment>
        }
        {this.props.pageToRender === DisplayToggle.NEW_BLOG &&
          <React.Fragment>
            <br/>
            <br/>
            <TextEditor editorState={this.state.editorState}
                        onChange={() => this.handleEditorStateChange(this.state.editorState)}
            />
          </React.Fragment>
        }
      </div>
    )
  }
}
