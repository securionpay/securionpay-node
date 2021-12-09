const random = {
  randomEmail: () => {
    return `securionpay_node_test_${random.randomString()}@securionpay.com`
  },
  randomString: (length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result.toLowerCase()
  }
}
module.exports = random
