import React from 'react'
import { Button } from 'semantic-ui-react'

type Props = {
  // onChange(file: File): void
  className: string
  onFilesAttached?: (file: File) => void
}

export class TextEditorAttachmentButton extends React.Component<Props> {
  ref: HTMLInputElement | null | undefined;

  onClick = () => {
    if(this.ref) {
      this.ref.click()
    }
  };

  onFileSelected = () => {
    // this.props.onChange((this.ref as any).files[0])
  };

  render () {
    return (
      <>
        <input type="file"
               ref={(ref) => this.ref = ref}
               onChange={this.onFileSelected}
               className={"uploadButtonInput"}/>
        <Button  className={this.props.className}
                 icon={"paperclip"}
                 onChange={this.props.onFilesAttached}
                 onClick={this.onClick}/>
      </>
    )
  }
}