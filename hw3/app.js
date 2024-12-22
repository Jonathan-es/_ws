import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import * as render from "./render.js";
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

// Initialize database
const db = new DB("blog.db");
db.query(`DROP TABLE IF EXISTS posts`);
db.query(`
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    body TEXT
)`);

// Router setup
const router = new Router();
router
  .get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Helper function for querying the database
function query(sql, params = []) {
  const results = [];
  for (const [id, title, body] of db.query(sql, params)) {
    results.push({ id, title, body });
  }
  return results;
}

// Route handlers
async function list(ctx) {
  const posts = query("SELECT id, title, body FROM posts");
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const postId = ctx.params.id;
  const posts = query("SELECT id, title, body FROM posts WHERE id = ?", [postId]);
  const post = posts[0];
  if (!post) ctx.throw(404, 'Post not found');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const post = {};
    for (const [key, value] of pairs) {
      post[key] = value;
    }
    db.query("INSERT INTO posts (title, body) VALUES (?, ?)", [post.title, post.body]);
    ctx.response.redirect('/');
  }
}

const port = parseInt(Deno.args[0]) || 8000;
console.log(`Server is running at http://127.0.0.1:${port}/`);
await app.listen({ port });
