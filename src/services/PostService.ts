import * as ApiHelper from './ApiHelpers'

const baseUrlUser = `${process.env.REACT_APP_BASE_URL_API}/users`
const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/posts`
// const baseUrl = `https://localhost:44326/users`

export const uploadPostImage = async (bodyData: FormData): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: bodyData,
  }
  const url = `${baseUrlUser}/updateuserimage`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

export const uploadPostVideo = async (bodyData: FormData): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/uploadpostfile`

  const response = await fetch(url, requestOptions)
  return response
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
