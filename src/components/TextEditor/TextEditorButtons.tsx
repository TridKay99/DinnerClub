import React from 'react'
import {DraftBlockType, DraftInlineStyleType, EditorState, RichUtils} from 'draft-js'
import {Button, Icon} from 'semantic-ui-react'
import {InlineStyleControls} from "./InlineStyleControls";
import {BlockStyleControls} from "./BlockStyleControls";
import {TextEditorAttachmentButton} from "./TextEditorAttachmentButton";
import {BlobUtils, ImageDimensions} from "../../utils/BlobUtils"
import {toast} from "react-toastify"

type Props = {
  editorState: EditorState
  onEditorStateChange: (editorState: EditorState) => void
  onInlineFilesAttached: (file: File) => void
  //This is to attach it to the blog object
  onFilesAttached: (file: File) => void
  className: string
}

export class TextEditorButtons extends React.Component<Props> {

  ref: HTMLInputElement | null | undefined;

  toggleBlockType = (blockType: DraftBlockType) => {
    const newEditorState = RichUtils.toggleBlockType(this.props.editorState, blockType)
    this.props.onEditorStateChange(newEditorState);
  };

  toggleInlineStyle = (inlineStyle: DraftInlineStyleType | string) => {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    this.props.onEditorStateChange(newEditorState);
  };

  onUndo = () => {
    const newEditorState = EditorState.undo(this.props.editorState)
    this.props.onEditorStateChange(newEditorState)
  };

  onRedo = () => {
    const newEditorState = EditorState.redo(this.props.editorState)
    this.props.onEditorStateChange(newEditorState)
  };

  onClick = () => {
    if (this.ref) {
      this.ref.click()
    }
  };

  onFileAttached = (file: File, message?: string) => {
    if (message) {
      this.props.onFilesAttached(file);
      toast.error(message)
    } else {
      this.props.onFilesAttached(file)
    }
  }

  onInlineFileSelected = async () => {
    const file: File = ((this.ref as any).files[0])
    if (file.type === 'application/pdf') {
      let message = "PDF files cannot be placed directly inside of email. It has been attached as a regular attachment."
      this.onFileAttached(file, message)
    } else {
      const imageDimensions: ImageDimensions = await BlobUtils.getDimensionsOfImage(file)
      const isFileToBig = this.isFileToBig(imageDimensions)
      this.attachImageByTypeOrSize(file, isFileToBig)
    }
  }

  isFileToBig = (imageDimensions: ImageDimensions): boolean => {
    return imageDimensions.width >= 1000
  }

  attachImageByTypeOrSize = (file: File, isFileToBig: boolean) => {
    if (file.size > 100000 || isFileToBig) {
      console.log('hello')
      let message = "Image size is too large to be an inline image. It has been attached as a regular attachment."
      this.onFileAttached(file, message)
    } else {
      this.props.onInlineFilesAttached(file)
    }
  }

  render() {
    return (
      <div className="RichEditor-controls">
        <InlineStyleControls
          editorState={this.props.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={this.props.editorState}
          onToggle={this.toggleBlockType}
        />
        <Button icon onClick={this.onUndo}>
          <Icon name={'undo'}/>
        </Button>
        <Button icon onClick={this.onRedo}>
          <Icon name={'redo'}/>
        </Button>
        <input type="file"
               hidden
               ref={(ref) => this.ref = ref}
               onChange={this.onInlineFileSelected}
        />
        <Button icon={"image outline"}
                onClick={this.onClick}/>
        {/*<TextEditorAttachmentButton*/}
        {/*  // onChange={this.onFileAttached}*/}
        {/*                            className={this.props.className}*/}
        {/*                            // onFilesAttached={this.props.onFilesAttached}*/}
        {/*/>*/}
      </div>
    )
  }
}
