function getUser(user_id, callback){
  fetch(`http://localhost:8000/users/${user_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllUsers(callback){
  fetch('http://localhost:8000/users/all')
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getPost(post_id, callback){
  fetch(`http://localhost:8000/post/${post_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllPosts(start, callback){
  fetch(`http://localhost:8000/posts/all?start=${start}&end=${start+4}`)
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllProducts(user_id, start, callback){
  fetch(`http://localhost:8000/store/${user_id}?start=${start}&end=${start+9}`)
  .then(data => data.json())
  .then(data => callback(data))
  .catch(error => console.log(error))
}

function loginUser(username, password, callback){
  fetch('http://localhost:8000/accounts/login/', {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function registerUser(username, firstname, lastname, userType, password, email, paypalEmail,  conf_password, callback){
  fetch('http://localhost:8000/accounts/register/', {
    method: "POST",
    body: JSON.stringify({
      username: username,
      first_name: firstname,
      last_name: lastname, 
      email: email,
      paypalEmail: paypalEmail,
      user_type: userType,
      password: password,
      conf_password: conf_password
    })
  })
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function createNewPost(user_id, postContent, image, callback){
  let formData = new FormData();
  formData.append('user_id', user_id)
  formData.append('content', postContent)
  formData.append('imageUrl', image, image.name)
  fetch('http://localhost:8000/posts/new', {
    method: "POST",
    body: formData
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function createNewProduct(user_id, name, description, price, imageUrl, callback){
  fetch('http://localhost:8000/posts/new', {
    method: "POST",
    body: JSON.stringify(
      {
        user_id: user_id,
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function editPost(user_id, post_id, operation, newText, callback){
  fetch(`http://localhost:8000/post/${post_id}/${operation}`,{
    method: "PUT", 
    body: JSON.stringify(
      {
        user_id: user_id,
        newText: newText,
        operation: operation,
        post_id: post_id
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
function editUser(user_id, newstatus, newbio, profileImage, callback){
  let formData = new FormData();
  formData.append('status', newstatus);
  formData.append('bio', newbio);
  profileImage ? formData.append('profile_image', profileImage, profileImage.name): console.error('There is no profile picture');
  fetch(`http://localhost:8000/user/${user_id}/edit`, {
    method: "POST",
    body: formData
  }).then(data => data.json())
  .then(data => callback(data))
  .catch(error => console.log(error));
}

// I don't remember why i wrote this function.... 
//But i think it does something... I hope I figure it out soon
function getStore(owner_id, callback){
  callback(JSON.parse({value: "Store", null: false}))
}
// The reason for the writin of the getStore function still remains unknown

module.exports = {
  getUser,
  getAllUsers, 
  getPost, 
  getAllPosts,
  getAllProducts,
  loginUser, 
  registerUser, 
  createNewPost, 
  createNewProduct, 
  editPost,
  getStore,
  editUser,
}