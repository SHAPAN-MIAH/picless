import { CommonPostType } from '../types/PostType.d'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/posts`
// const baseUrl = `https://localhost:44326/posts`

const uploadPostResource = async (bodyData: FormData): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/uploadpostfile`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const createPost = async (post: CommonPostType) => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
  }

  const url = `${baseUrl}/addpost`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getPosts = async () => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getpostsbyuser`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

// Possible Code for upload images with progress
/*
    let data = new FormData();
    data.append('file', document.querySelector('#file-input').files[0]);

    let request = new XMLHttpRequest();
    request.open('POST', '/upload'); 

    // upload progress event
    request.upload.addEventListener('progress', function(e) {
      // upload progress as percentage
      let percent_completed = Math.round((e.loaded / e.total)*100) + %;
      console.log(percent_completed);
    });

    // request finished event
    request.addEventListener('load', function(e) {
      // HTTP status message (200, 404 etc)
      console.log(request.status);

      // request.response holds response from the server
      console.log(request.response);
    });

    // send POST request to server
    request.send(data);
    */

export default {
  uploadPostResource,
  getPosts,
  createPost,
}
