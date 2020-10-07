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
  editorState: EditorState
}

export class NewBlog extends React.Component<Props, State> {

  state: State = {
    editorState: EditorState.createEmpty()
  };

  handleEditorStateChange = (editorState: EditorState) => {
    console.log('editorState', editorState);
    this.setState({editorState})
  };

  render() {
    return (
      <div className={'newBlogContainer'}>
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
