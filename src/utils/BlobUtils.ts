import _ from "lodash"

export type ImageDimensions = {
  width: number
  height: number
}

export const BlobUtils = {
  readBlobAsBase64String: (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(evt: any){
        resolve(evt.target.result.substring(evt.target.result.indexOf(",") + 1))
      }
      reader.readAsDataURL(file)
    })
  },

  convertBase64StringToFile:(base64: string, mimeType: string, fileName: string) => {
    const byteNumbers = new Array(base64.length)
    for(let i = 0; i < base64.length; i++) {
      byteNumbers[i] = base64.charCodeAt(1)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray])
    return new File([blob], fileName, {type: mimeType})
  },

  getDimensionsOfImage: (file: Blob): Promise<ImageDimensions> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = function(evt: any){
        let img = new Image
        img.onload = function(){
          const imageDimensions: ImageDimensions = {
            width: img.width,
            height: img.height
          }
          resolve(imageDimensions)
        }
        img.src = evt.target.result
      }
      reader.readAsDataURL(file);
    })
  },

  areAnyCorrupted: (files: File[]) => {
    return files.some((file: File| {}) => {
      return BlobUtils.isCorrupted(file)
    })
  },

  isCorrupted: (file: File[] | {}) => {
    return _.get(file, "constructor.name") !== "File"
  }
}