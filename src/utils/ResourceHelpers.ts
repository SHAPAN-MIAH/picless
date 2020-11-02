const userId = window.localStorage.getItem('userId')

export const imageUrl = (imageName: string) => {
  return `${process.env.REACT_APP_BUCKET_IMAGES}postimage/${userId}/${imageName}`
}

export const videoUrl = (videoName: string) => {
  return `${process.env.REACT_APP_BUCKET_IMAGES}postvideo/${userId}/${videoName}`
}
