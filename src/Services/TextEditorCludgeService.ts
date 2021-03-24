import {ContentState, convertFromHTML, EditorState} from "draft-js"


export const TextEditorCludgeService = {

  removePTags: (body: string) => {
    const cludge = body.replace(/<\/p>/g, '<br>')
    return cludge.replace(/<p>/g, '')
  },

  getEditorState: (body: string): EditorState => {
    const blocksFromHTML = convertFromHTML(body)

    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    return EditorState.createWithContent(state)
  }
}