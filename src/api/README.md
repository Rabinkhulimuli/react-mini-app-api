# Simulated API for CRUD Operations (Users)

This directory contains a set of functions that simulate a real-world API for performing CRUD (Create, Read, Update, Delete) operations on user data in a React application.

The `getUsers` function fetches real data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) dummy API. The other functions (`createUser`, `updateUser`, `deleteUser`) are simulated with a delay to mimic network latency.

## Usage

You can import these functions into your React components to manage data.

### `getUsers()`

Fetches a list of all users.

**Example:**
```javascript
import { getUsers } from './api';

// Inside an async function or useEffect
try {
  const users = await getUsers();
  console.log(users);
} catch (error) {
  console.error("Failed to fetch users:", error);
}
```

### `createUser(userData)`

Creates a new user.

**Parameters:**
- `userData` (object): An object containing the new user's data. `name` and `email` are required.

**Validation:**
- Rejects if `name` or `email` are missing.
- Rejects if the `email` format is invalid.

**Example:**
```javascript
import { createUser } from './api';

const newUserData = {
  name: 'Jane Doe',
  username: 'jane.d',
  email: 'jane@example.com'
};

try {
  const createdUser = await createUser(newUserData);
  console.log('User created:', createdUser);
} catch (error) {
  console.error(error.message); // e.g., "Invalid user data: name and email are required."
}
```

### `updateUser(userId, updatedData)`

Updates an existing user.

**Parameters:**
- `userId` (number): The ID of the user to update.
- `updatedData` (object): An object with the fields to update, e.g., `{ name: 'Jane Smith' }`.

**Validation:**
- Rejects if `updatedData` is empty.
- Rejects if `email` is provided in an invalid format.
- Rejects if you attempt to change the user `id`.

**Example:**
```javascript
import { updateUser } from './api';

const userIdToUpdate = 1;
const dataToUpdate = {
  name: 'Leanne "Bret" Graham'
};

try {
  const updatedUser = await updateUser(userIdToUpdate, dataToUpdate);
  console.log('User updated:', updatedUser);
} catch (error) {
  console.error(error.message); // e.g., "Invalid email format."
}
```

### `deleteUser(userId)`

Deletes a user.

**Parameters:**
- `userId` (number): The ID of the user to delete.

**Example:**
```javascript
import { deleteUser } from './api';

const userIdToDelete = 2;

await deleteUser(userIdToDelete);
console.log(`User with ID ${userIdToDelete} has been deleted.`);
```

### `getUserById(userId)`

Fetches a single user by their ID.

**Parameters:**
- `userId` (number): The ID of the user to fetch.

**Example:**
```javascript
import { getUserById } from './api';

// Inside an async function or useEffect
try {
  const user = await getUserById(1);
  console.log(user);
} catch (error) {
  console.error("Failed to fetch user:", error);
}
