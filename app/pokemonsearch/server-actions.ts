'use server';

import { revalidatePath } from 'next/cache';

// This is a server action that fetches users based on search query
export async function getUsers(searchQuery: string) {
  // In a real application, this would query a database
  // For demonstration purposes, we'll use mock data and filter it

  // Mock database of users
  const userDatabase = [
    {
      id: '072203a2-89e7-482c-8c0f-cc1694f3eb49',
      username: 'Louis Litt',
      email: 'louis@test.com',
      password_hash: '',
      created_at: new Date('2025-03-14T10:06:08.321Z')
    },
    {
      id: '08496e5f-e6c3-4859-b38f-17bbee45f3c4',
      username: 'Michael Ross',
      email: 'ross@test.com',
      password_hash: '',
      created_at: new Date('2025-03-14T10:04:30.405Z')
    },
    {
      id: '12345e5f-e6c3-4859-b38f-17bbee45f3c4',
      username: 'Harvey Specter',
      email: 'harvey@test.com',
      password_hash: '',
      created_at: new Date('2025-03-14T10:02:30.405Z')
    },
    {
      id: '67890e5f-e6c3-4859-b38f-17bbee45f3c4',
      username: 'Donna Paulsen',
      email: 'donna@test.com',
      password_hash: '',
      created_at: new Date('2025-03-14T10:01:30.405Z')
    },
    {
      id: 'abcde5f-e6c3-4859-b38f-17bbee45f3c4',
      username: 'Jessica Pearson',
      email: 'jessica@test.com',
      password_hash: '',
      created_at: new Date('2025-03-14T09:58:30.405Z')
    }
  ];

  // If search query is empty, return all users (limited to 5 for this example)
  if (!searchQuery) {
    return userDatabase.slice(0, 5);
  }

  // Filter users based on search query (case-insensitive)
  const filteredUsers = userDatabase.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate delay in server response
  await new Promise(resolve => setTimeout(resolve, 300));

  // Revalidate the path to ensure fresh data
  revalidatePath('/');
  
  return filteredUsers;
}
