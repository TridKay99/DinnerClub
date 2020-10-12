import React from 'react';
import {Button, Form, Input, InputOnChangeData, Message} from "semantic-ui-react"
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
  authorized: boolean | null
  userName: string
}

export class AdminLogin extends React.Component<Props, State> {

  state: State = {
    admin: null,
    editorState: EditorState.createEmpty(),
    password: '',
    authorized: null,
    userName: ''
  };

  componentDidMount = async() => {
    const userProfiles: UserProfile[] = await UserProfileService.getAll()
    const admin = userProfiles.find(user => user.name === 'Admin')
    if(admin) {
      this.setState({admin})
      this.setState({userName: admin.name})
    }
  }

  handlePasswordChange = (data: InputOnChangeData) => {
    this.setState({password: data.value})
  };

  handleUserNameChange = (data: InputOnChangeData) => {
    this.setState({userName: data.value})
  }

  authPassword = (password: string) => {
    if(password === this.state.admin?.password) {
      this.props.handleClick(DisplayToggle.MAINTAIN_BLOGS);
      this.setState({authorized: true})
    } else {
      this.setState({authorized: false})
    }
  };

  render() {
    return (
      <div className={'authPasswordContainer'}>
        <React.Fragment>
          <br/>
          <Form>
            <Form.Field>
              <Input icon='user secret'
                     value={this.state.userName}
                     onChange={(e,data) => this.handleUserNameChange(data)}/>
            </Form.Field>
            <Form.Field>
              <Input icon='lock'
                     value={this.state.password}
                     onChange={(e,data) => this.handlePasswordChange(data)}
                     placeholder={'Auth Password'}
                     type='password'
              />
            </Form.Field>
            <Button content={'Submit'}
                    onClick={() => this.authPassword(this.state.password)}/>
          </Form>
          {this.state.authorized === false &&
          // <React.Fragment>
            <Message error>
              <Message.Header>Incorrect password ya boof!</Message.Header>
            </Message>
          // </React.Fragment>
          }
        </React.Fragment>
      </div>
    )
  }
}
