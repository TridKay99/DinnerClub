import React from 'react'
import { EditorState } from 'draft-js'
import {BlockStyle, StyleType} from "./TextStyle";
import {TextStyleButton} from "./TestStyleControl";

type Props = {
  editorState: EditorState,
  onToggle: (blockStyle: string) => void
}

export class BlockStyleControls extends React.Component<Props> {

  getBlockTypes = (): BlockStyle[] => {
    return [
      {label: 'UL', style: 'unordered-list-item', icon: 'list ul', type: StyleType.BLOCK },
      {label: 'OL', style: 'ordered-list-item', icon: 'list ol', type: StyleType.BLOCK },
    ];
  };

  getCurrentBlockType = () => {
    const selection = this.props.editorState.getSelection();
    return this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  };

  render () {
    return (
      <>
        {this.getBlockTypes().map((type) =>
          <TextStyleButton
            key={type.label}
            active={type.style === this.getCurrentBlockType()}
            onToggle={this.props.onToggle}
            icon={type.icon}
            style={type.style}
          />
        )}
      </>
    )
  }
}
