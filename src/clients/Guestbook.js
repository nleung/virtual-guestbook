export function createPost(event_id, name, picture_url, comment, onSuccess, onError) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_id: event_id,
      name: name,
      picture_url: picture_url,
      comment: comment
    })
  };

  fetch('https://virtual-guestbook-service.herokuapp.com/api/posts/create', requestOptions)
    .then(response => response.json())
    .then(
      (data) => {
        onSuccess(data);
      },
      (error) => {
        onError(error)
      }
    );
}

export function getSignedUrl(file_name, file_type, onSuccess, onError) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file_name: file_name,
      file_type: file_type
    })
  };

  fetch('https://virtual-guestbook-service.herokuapp.com/api/create_signed_url', requestOptions)
    .then(response => response.json())
    .then(
      (data) => {
        onSuccess(data.signed_url, data.object_url);
      },
      (error) => {
        onError(error)
      }
    );
}

export default createPost
