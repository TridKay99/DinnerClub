import React from 'react'
import {RecursivePick} from "../../utils/DeepStateMerge/RecursivePick"
import {BlogFormState} from "../BlogForm"
import {BlobUtils} from "../../utils/BlobUtils"

type Props = {
  onChange(delta: RecursivePick<BlogFormState>): void
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

  onFileSelected = async () => {
    const file = (this.ref as any).files[0]
    const base64 = await BlobUtils.readBlobAsBase64String(file)
    const base64File = {
      name: file.name as string,
      base64
    }

    this.props.onChange({displayImage: base64File})
  };

  render () {
    return (
      <React.Fragment>
        <strong>Choose cover photo...</strong>
        <input type="file"
               ref={(ref) => this.ref = ref}
               onChange={this.onFileSelected}
               className={"uploadButtonInput"}/>
      </React.Fragment>
    )
  }
}