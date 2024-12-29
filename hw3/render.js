export function layout(title, content) {
    return `
    <html>
    <head>
        <title>${title}</title>
        <style>
            body {
                padding: 80px;
                font: 16px Helvetica, Arial;
                background-color: white;
                color: #000000; 
            }
  
            h1 {
                font-size: 2em;
                color: #000000;
            }
  
            h2 {
                font-size: 1.2em;
                color: #000000;
            }
  
            #posts {
                margin: 0;
                padding: 0;
            }
  
            #posts li {
                margin: 40px 0;
                padding: 0;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
                list-style: none;
            }
  
            #posts li:last-child {
                border-bottom: none;
            }
  
            textarea {
                width: 500px;
                height: 300px;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                font-size: 1em;
                color: #000000;
            }
  
            input[type=text],
            textarea {
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                font-size: 1em;
                color: #000000;
            }
  
            input[type=text] {
                width: 500px;
            }
  
            input[type=submit] {
                background-color: #000000; 
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 1em;
                cursor: pointer;
            }
  
            input[type=submit]:hover {
                background-color: #333333; 
            }
  
            a.create-post {
                font-style: italic;
                text-decoration: underline;
                color: #000000;
            }
  
            a.create-post:hover {
                color: #333333; 
            }
        </style>
    </head>
    <body>
        <section id="content">
            ${content}
        </section>
    </body>
    </html>
    `;
  }
  
  export function list(user, posts) {
    const postItems = posts.map(post => `
        <li>
            <h2>${post.title}</h2>
            <p><a href="/${user}/post/${post.id}" style="color: #000000; text-decoration: none;">Read post</a></p>
        </li>
    `).join('\n');
    const content = `
        <h1>${user}'s Posts</h1>
        <p>You have <strong>${posts.length}</strong> posts!</p>
        <p><a href="/${user}/post/new" class="create-post">Create a Post</a></p>
        <ul id="posts">
            ${postItems}
        </ul>
    `;
    return layout(`${user}'s Posts`, content);
  }
  
  export function newPost(user) {
    return layout('New Post', `
        <h1>Create a Post</h1>
        <form action="/${user}/post" method="post">
            <p><input type="text" placeholder="Post title" name="title"></p>
            <p><textarea placeholder="Post content" name="body"></textarea></p>
            <p><input type="submit" value="Submit"></p>
        </form>
    `);
  }
  
  export function show(post) {
    return layout(post.title, `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <p><a href="/${post.user}/" style="color: #000000; text-decoration: none;">Back to posts</a></p>
    `);
  }
  
