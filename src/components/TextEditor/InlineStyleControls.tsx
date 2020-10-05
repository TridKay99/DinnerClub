import React from 'react'
import {DraftInlineStyleType, EditorState} from 'draft-js'
import {InlineStyle, StyleType} from "./TextStyle";
import {TextStyleButton} from "./TestStyleControl";

type Props = {
  editorState: EditorState,
  onToggle: (inlineStyle: DraftInlineStyleType | string) => void
}

export class InlineStyleControls extends React.Component<Props> {

  getInlineStyles = (): InlineStyle[] => {
    return [
      {label: 'Bold', style: 'BOLD', icon: 'bold', type: StyleType.INLINE},
      {label: 'Italic', style: 'ITALIC', icon: 'italic', type: StyleType.INLINE},
    ];
  };

  render () {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();

    return (
      <>
        {this.getInlineStyles().map((type) =>
          <TextStyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            onToggle={this.props.onToggle}
            icon={type.icon}
            style={type.style}
          />
        )}
      </>
    )
  }
}
