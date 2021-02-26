

export const TextEditorCludgeService = {

  removePTags: (body: string) => {
    return body.replace(/<\/p>\\n<p><br>/, '')
  }
}