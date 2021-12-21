const FormData = require('form-data')

module.exports = class FileUploads {
  /**
   * @param {Communicator} communicator
   */
  constructor (communicator) {
    this.communicator = communicator
  }

  upload (content, params) {
    if (content instanceof FormData) {
      return this.communicator.postMultipart('/files', content)
    }

    const { file: fileParams, ...otherParams } = params
    const body = new FormData()
    body.append('file', content, fileParams)
    for (const key in otherParams) {
      body.append(key, otherParams[key])
    }
    return this.communicator.postMultipart('/files', body)
  }

  get (fileId) {
    return this.communicator.get(`/files/${fileId}`)
  }

  list (params) {
    return this.communicator.get('/files', params)
  }
}
