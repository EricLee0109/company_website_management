
import React from 'react';
import { getPayload } from 'payload';
import config from '@/payload.config'; // Import your Payload config
import { RichText } from '@payloadcms/richtext-lexical/react';

// 1. This function runs on the SERVER
async function getPosts() {
  const payload = await getPayload({ config });
  
  try {
    // Fetch the 'posts' collection
    const posts = await payload.find({
      collection: 'posts',
      // Optional: Add sorting or depth if you have related data
      sort: '-createdAt', 
      depth: 1, // 1 level of depth is good for fetching related authors/images
    });
    return posts.docs;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Awesome Blog</h1>
      
      {/* Check if we have posts */}
      {posts.length === 0 ? (
        <p>No posts found. Go to the Admin panel and create one!</p>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {posts.map((post: any) => (
            <RichText key={post.id} data={post.content} />
          ))}
        </div>
      )}
    </div>
  );
}