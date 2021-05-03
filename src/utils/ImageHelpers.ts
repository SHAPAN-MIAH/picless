const bucket = process.env.REACT_APP_IMAGE_BUCKET
const domain = process.env.REACT_APP_IMAGE_START_DOMAIN
const defaultOptions = {
  bucket,
}

const getUrl = (name: string, blocked = false) => {
  if (!name) {
    return ''
  }

  const baseOptions = { key: name }
  const resizeOptions = { resize: { width: 600, height: 670, fit: 'cover' } }
  const editOptions = { edits: { ...resizeOptions, blur: blocked && 35 } }

  const options = JSON.stringify({ ...defaultOptions, ...baseOptions, ...editOptions })

  const url = `${domain}/${btoa(options)}`

  return url
}

export default { getUrl }
