import { DraftBlockType, DraftInlineStyleType } from 'draft-js'
import { SemanticICONS } from 'semantic-ui-react'

export type BlockStyle = {
  type: StyleType.BLOCK
  style: DraftBlockType
} & TextStyle

export type InlineStyle = {
  type: StyleType.INLINE
  style: DraftInlineStyleType
} & TextStyle

type TextStyle = {
  label: string,
  icon: SemanticICONS
}

export enum StyleType {
  BLOCK = "block",
  INLINE = "inline"
}