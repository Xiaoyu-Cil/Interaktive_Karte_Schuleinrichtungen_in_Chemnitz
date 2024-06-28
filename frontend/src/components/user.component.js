import React, { useState, useEffect } from 'react';
import { 
  getAllDeletedUsers, 
  createUser, 
  getUserByName, 
  softDeleteUser, 
  updateUser, 
  checkUsernameExists, 
  checkEmailExists 
} from '../api/user.api';

// const UserComponent = () => {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     username: '',
//     name: '',
//     email: '',
//     age: ''
//   });
//   const [searchName, setSearchName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     fetchDeletedUsers();
//   }, []);

//   const fetchDeletedUsers = async () => {
//     try {
//       const response = await getAllDeletedUsers();
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching deleted users:', error);
//     }
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createUser(formData);
//       console.log('User created:', response.data);
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   };

//   const handleGetUserByName = async () => {
//     try {
//       const response = await getUserByName(searchName);
//       console.log('User profile:', response.data);
//     } catch (error) {
//       console.error('Error fetching user by name:', error);
//     }
//   };

//   const handleSoftDeleteUser = async () => {
//     try {
//       await softDeleteUser(username);
//       console.log('User soft deleted');
//     } catch (error) {
//       console.error('Error soft deleting user:', error);
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       const response = await updateUser(username, formData);
//       console.log('User updated:', response.data);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleCheckUsernameExists = async () => {
//     try {
//       const response = await checkUsernameExists(username);
//       console.log('Username exists:', response.data.exists);
//     } catch (error) {
//       console.error('Error checking username:', error);
//     }
//   };

//   const handleCheckEmailExists = async () => {
//     try {
//       const response = await checkEmailExists(email);
//       console.log('Email exists:', response.data.exists);
//     } catch (error) {
//       console.error('Error checking email:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>User Management</h1>

//       <form onSubmit={handleCreateUser}>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//           placeholder="Username"
//         />
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//           placeholder="Email"
//         />
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//           placeholder="Age"
//         />
//         <button type="submit">Create User</button>
//       </form>

//       <div>
//         <input
//           type="text"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           placeholder="Search by name"
//         />
//         <button onClick={handleGetUserByName}>Get User Profile</button>
//       </div>

//       <div>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <button onClick={handleSoftDeleteUser}>Soft Delete User</button>
//         <button onClick={handleUpdateUser}>Update User</button>
//         <button onClick={handleCheckUsernameExists}>Check Username Exists</button>
//       </div>

//       <div>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <button onClick={handleCheckEmailExists}>Check Email Exists</button>
//       </div>

//       <h2>Deleted Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserComponent;