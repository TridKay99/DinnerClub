import createImagePlugin from 'draft-js-image-plugin'
import createUndoPlugin from 'draft-js-undo-plugin';
const imagePlugin = createImagePlugin();
const undoPlugin = createUndoPlugin();
export const DraftPlugins = [imagePlugin, undoPlugin];
