import { getFileName } from './utils'

export async function fetchLiveness(selfie) {
  try {
    const image = {
      uri: selfie.uri,
      name: getFileName(selfie),
      type: 'image/jpeg',
    }
    const body = new FormData()
    body.append('data', image)
    const response = await fetch(
      'https://liveness.openbio.com.br/check_liveness',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body,
      }
    )
    return await response.json()
  } catch (error) {
    return error
  }
}

export async function fetchFaceMatching(photos) {
  try {
    const doc = {
      uri: photos[0].uri,
      name: getFileName(photos[0]),
      type: 'image/jpeg',
    }
    const selfie = {
      uri: photos[1].uri,
      name: getFileName(photos[1]),
      type: 'image/jpeg',
    }
    const body = new FormData()
    body.append('snapshotDoc', doc)
    body.append('snapshotSelfie', selfie)
    const response = await fetch('http://34.213.62.108:3000/face2doc', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
    return await response.json()
  } catch (error) {
    return error
  }
}
