import { createReader } from '@keystatic/core/reader';
import readerConfig from '../keystatic.reader.config';

// Create Keystatic reader - uses LOCAL mode to read from Git files
// (Admin uses Cloud mode from keystatic.config.tsx)
export const reader = createReader(process.cwd(), readerConfig);

// Get all blog posts
export async function getAllPosts() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const cwd = process.cwd();
    console.log('[getAllPosts] Starting...');
    console.log('[getAllPosts] CWD:', cwd);
    
    // Check filesystem
    const contentPath = path.join(cwd, 'content', 'posts');
    console.log('[getAllPosts] Content path:', contentPath);
    console.log('[getAllPosts] Content dir exists:', fs.existsSync(contentPath));
    
    if (fs.existsSync(contentPath)) {
      const files = fs.readdirSync(contentPath);
      console.log('[getAllPosts] Files in content/posts:', files);
      console.log('[getAllPosts] Files count:', files.length);
    } else {
      console.log('[getAllPosts] ERROR: content/posts directory does NOT exist!');
      
      // Check if content dir exists at all
      const contentDir = path.join(cwd, 'content');
      console.log('[getAllPosts] Content dir exists:', fs.existsSync(contentDir));
      if (fs.existsSync(contentDir)) {
        const contentDirFiles = fs.readdirSync(contentDir);
        console.log('[getAllPosts] Files in content/:', contentDirFiles);
      }
    }
    
    const posts = await reader.collections.posts.all();
    console.log('[getAllPosts] Reader returned posts:', posts.length);
    
    if (posts.length > 0) {
      posts.forEach(p => {
        console.log('[getAllPosts] Post:', p.slug, '|', p.entry.title);
      });
    }
    
    // Sort by date (newest first)
    const sorted = posts.sort((a, b) => {
      const dateA = new Date(a.entry.publishedDate || 0);
      const dateB = new Date(b.entry.publishedDate || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log('[getAllPosts] Returning', sorted.length, 'posts');
    return sorted;
  } catch (error) {
    console.error('[getAllPosts] Error reading posts:', error);
    return [];
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const post = await reader.collections.posts.read(slug);
    return post;
  } catch (error) {
    console.error(`[getPostBySlug] Error reading post "${slug}":`, error);
    return null;
  }
}
