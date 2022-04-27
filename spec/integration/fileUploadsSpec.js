const { SecurionPayGateway } = require('../../')
const FormData = require('form-data')
const random = require('../data/random')
const fs = require('fs')

describe('FileUploads', () => {
  const api = new SecurionPayGateway()

  it('should upload by file', async () => {
    // given
    const tmpPath = await getTmpPdfFilePath()
    const tmpFile = fs.createReadStream(tmpPath)
    // when/then
    await api.fileUploads.upload(tmpFile, { purpose: 'dispute_evidence' })
  })

  it('should upload file by buffer', async () => {
    // given
    const tmpPath = await getTmpPdfFilePath()
    const buffer = fs.readFileSync(tmpPath)
    // when/then
    await api.fileUploads.upload(buffer, { file: 'upload.pdf', purpose: 'dispute_evidence' })
  })

  it('should upload file by direct FormData', async () => {
    // given
    const tmpPath = await getTmpPdfFilePath()
    const fileStream = fs.createReadStream(tmpPath)
    const formData = new FormData()
    formData.append('file', fileStream)
    formData.append('purpose', 'dispute_evidence')
    // when/then
    await api.fileUploads.upload(formData)
  })

  it('should get uploaded file', async () => {
    // given
    const tmpFile = fs.createReadStream(await getTmpPdfFilePath())
    const uploaded = await api.fileUploads.upload(tmpFile, { purpose: 'dispute_evidence' })
    // when
    const got = await api.fileUploads.get(uploaded.id)
    // then
    expect(got.id).toEqual(uploaded.id)
  })

  it('should list uploaded file', async () => {
    // given
    const tmpFile = fs.createReadStream(await getTmpPdfFilePath())
    const uploaded = await api.fileUploads.upload(tmpFile, { purpose: 'dispute_evidence' })
    // when
    const response = await api.fileUploads.list({ limit: 100 })
    // then
    expect(response.list.map(it => it.id)).toContain(uploaded.id)
  })

  async function getTmpPdfFilePath () {
    const { default: tempy } = await import('tempy')
    const tmpFilePath = tempy.file({ extension: '.pdf' })
    const file = fs.openSync(tmpFilePath, 'w')
    fs.writeSync(file, random.randomString(200))
    fs.closeSync(file)
    return tmpFilePath
  }

})
