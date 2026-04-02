# Simulated API for Posts

This directory contains a small API helper for creating and reading posts from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) dummy API.

## Usage

You can import these functions into your React components to manage data.

### `createPost(postData)`

Creates a post with a real `POST` request to `/posts`.

**Example:**
```javascript
import { createPost } from './api';

const postData = {
  userId: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
};

const createdPost = await createPost(postData);
console.log(createdPost);
```

### `getPosts()`

Fetches a list of all posts.

**Parameters:**
- None.

**Example:**
```javascript
import { getPosts } from './api';

const posts = await getPosts();
console.log(posts);
```

### `getPostById(postId)`

Fetches a single post by its ID.

**Example:**
```javascript
import { getPostById } from './api';

const post = await getPostById(1);
console.log(post);
```

  console.error(error.message); // e.g., "Invalid user data: name and email are required."
