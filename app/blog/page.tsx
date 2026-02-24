import { getAllPosts } from '@/lib/keystatic';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Appliance Repair Tips & Blog | H-Prime Appliance Repair Services',
  description: 'Expert tips, guides, and advice for appliance repair and maintenance. Learn how to keep your appliances running smoothly.',
};

// Force dynamic rendering (disable caching)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  console.log('[BlogPage] Fetching posts...');
  const posts = await getAllPosts();
  console.log('[BlogPage] Received posts:', posts.length);
  
  if (posts.length > 0) {
    posts.forEach(p => {
      console.log('[BlogPage] Post:', p.slug, '| Title:', p.entry.title);
    });
  } else {
    console.log('[BlogPage] NO POSTS RECEIVED!');
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Appliance Repair Tips & Blog
            </h1>
            <p className="text-xl md:text-2xl text-orange-100">
              Expert advice, maintenance tips, and industry insights from our professional technicians
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No blog posts yet. Check back soon for expert appliance repair tips!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => {
                const { slug } = post;
                const { displayTitle, title, description, publishedDate, author, image } = post.entry;
                
                // Use displayTitle if available, or convert slug to readable title
                const articleTitle = displayTitle || title
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    prefetch={false}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200 flex flex-col"
                  >
                    {image && (
                      <div className="relative w-full h-48 bg-gray-100">
                        <Image
                          src={image}
                          alt={articleTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition">
                        {articleTitle}
                      </h2>
                      {description && (
                        <p className="text-gray-600 mb-4 flex-1">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                        {publishedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        {author && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {author}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
