import React from 'react';
import {Button, Form, Input, InputOnChangeData} from "semantic-ui-react";
import './styles/component-new-blog.scss';
import {DisplayToggle} from "./DinnerClubContainerAdventures";
import {EditorState} from "draft-js";
import {UserProfileService} from "../Services/UserProfileService"

export type UserProfile = {
  name: string,
  password: string
}

type Props = {
  handleClick: (value: DisplayToggle) => void
  pageToRender: DisplayToggle
}

type State = {
  admin: UserProfile | null
  editorState: EditorState
  password: string
  authorized: boolean
}

export class AdminLogin extends React.Component<Props, State> {

  state: State = {
    admin: null,
    editorState: EditorState.createEmpty(),
    password: '',
    authorized: false
  };

  componentDidMount = async() => {
    const userProfiles: UserProfile[] = await UserProfileService.getAllProfiles()
    const admin = userProfiles.find(user => user.name === 'Admin')

    if(admin) {
      this.setState({admin})
    }
  }

  handleChange = (data: InputOnChangeData) => {
    this.setState({password: data.value})
  };

  authPassword = (password: string) => {
    if(password === this.state.admin?.password) {
      this.props.handleClick(DisplayToggle.NEW_BLOG);
      this.setState({authorized: true})
    }
  };

  render() {
    return (
      <div className={'newBlogContainer'}>
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
      </div>
    )
  }
}
