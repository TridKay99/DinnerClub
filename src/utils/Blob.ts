// @ts-ignore
interface Blob {
  text(): Promise<string>
}
/*eslint-disable*/
Blob.prototype.text = Blob.prototype.text
/*eslint-enable*/