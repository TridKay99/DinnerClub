import React from 'react';
import {
  AtomicBlockUtils,
  ContentBlock,
  DraftEditorCommand,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {TextEditorButtons} from "./TextEditorButtons";
import '../styles/component-text-editor.scss'
import { stateToHTML } from 'draft-js-export-html';
import {DraftPlugins} from "./index";
import {RecursivePick} from "../../DeepStateMerge/RecursivePick"
import {BlogFormState} from "../BlogForm"

type Props = {
  editorState: EditorState;
  editorStateChange: (editorState: EditorState) => void;
};

export class TextEditor extends React.Component<Props> {

  handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.editorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>): DraftEditorCommand | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, this.props.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.props.editorState) {
        this.props.editorStateChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'unordered-list-item':
        return 'RichEditor-unordered-list-item';
      case 'ordered-list-item':
        return 'RichEditor-ordered-list-item';
      default:
        return '';
    }
  };

  getStyleMap = () => {
    // Custom overrides for "code" style.
    return {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };
  };

  // onInlineImageAdded = async (file: File) => {
  //   const type = file.type;
  //   const base64 = await BlobUtils.readBlobAsBase64String(file);
  //   const base64String = 'data:' + type + ';base64, ' + base64;
  //   const newEditorState = this.insertImage(this.props.editorState, base64String);
  //   this.insertImage(this.props.editorState, base64String);
  //   this.props.onChange(newEditorState);
  //
  //   if (this.props.onInlineFilesAttached) {
  //     this.props.onInlineFilesAttached(file);
  //   }
  // };

  insertImage = (editorState: EditorState, base64: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: base64 });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  render() {
    return (
      <div className="RichEditor-root rktRichTextEditorWrapper">
        <TextEditorButtons
          editorState={this.props.editorState}
          onEditorStateChange={this.props.editorStateChange}
          // onInlineFilesAttached={this.onInlineImageAdded}
          // onFilesAttached={this.props.onFilesAttached!}
          className={'uploadButtonNew'}
        />
        <div className={'RichEditor-editor rktRichTextEditorWrapper'}>
          {/*<Editor blockStyleFn={this.getBlockStyle} editorState={this.state.editorState} onChange={this.onChange}/>*/}
          <Editor
            blockStyleFn={this.getBlockStyle}
            customStyleMap={this.getStyleMap()}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.props.editorStateChange}
            spellCheck={true}
            plugins={DraftPlugins}
          />
        </div>
      </div>
    );
  }
}
