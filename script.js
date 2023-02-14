const baseUrl = 'https://jsonplaceholder.typicode.com';
const users = new Users();
const controller = new Controller(users);

Toolbox.addNavButtonControl('#btn_form_user', ['#form_user',
   '#form_get_posts', '#form_add_post']);
Toolbox.addNavButtonControl('#btn_form_add_post', ['#form_add_post',
   '#form_user', '#form_get_posts']);
Toolbox.addNavButtonControl('#btn_form_get_posts', ['#form_get_posts',
   '#form_user', '#form_add_post']);

function renderUser (user) {
   Toolbox.addItemToList('#list',
       `User ID: ${user.id}, User Name: ${user.name}, User nickname: ${user.username}`);
}
function renderPost (post) {
   Toolbox.addItemToList('#list',
       `User ID: ${post.userId}, Post title: ${post.title}, Post body: ${post.body}`);
}

(async() => {
   const responseUsers = await fetch(`${baseUrl}/users`);
   const jsonUsers = await responseUsers.json();
   await (jsonUsers.forEach(item => controller.createUser(item)));

   const responsePosts = await fetch(`${baseUrl}/posts`);
   const jsonPosts = await responsePosts.json();
   await (jsonPosts.forEach(item => controller.addPosts(item.userId, item)));

   await controller.processUsers(user => renderUser(user));
})();

// Form User Handler
Toolbox.formHandler('#form_user', user => {
   Toolbox.clearElement('#list');
   controller.createUser(user);
   renderUser(user);
});

// Form Add Post
Toolbox.formHandler('#form_add_post', item => {
   const post = {
      title: item.title,
      body: item.body,
      userId: item.userId
   };
   fetch(`${baseUrl}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      }
   })
       .then(response => response.json())
       .then(data => {
          console.log(data);
          alert(`Post by User#${data.userId} added`);
          controller.addPosts(data.userId, data);
          Toolbox.clearElement('#list');
          renderPost(data);
       });
});

// Form Get Posts
Toolbox.formHandler('#form_get_posts', object => {
   Toolbox.clearElement('#list');
   const posts = controller.getUserById(object.id).posts;
   posts.forEach(post => renderPost(post));
});

// Button User list
document.querySelector('#btn_user_list').addEventListener('click', e => {
   e.preventDefault();
   for (let node of e.target.closest('.nav').children) {
      node.classList.remove('active');
   }
   e.target.parentElement.classList.add('active');
   Toolbox.clearElement('#list');
   controller.processUsers(user => renderUser(user));
});




