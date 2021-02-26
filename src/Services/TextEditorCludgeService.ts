import {ContentState, convertFromHTML, EditorState} from "draft-js"


export const TextEditorCludgeService = {

  removePTags: (body: string) => {
    return body.replace(/<\/p>\\n<p><br>/, '')
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