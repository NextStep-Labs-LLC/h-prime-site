import React from 'react';

// Types for Markdoc node structure
interface MarkdocNode {
  type: string;
  attributes?: Record<string, any>;
  children?: MarkdocNode[];
  $$mdtype?: string;
  inline?: boolean;
}

// Recursive renderer for Markdoc nodes
export function MarkdocRenderer({ node }: { node: MarkdocNode }) {
  if (!node || !node.children) {
    return null;
  }

  return (
    <>
      {node.children.map((child, index) => {
        // Skip first H1 heading (we show title in page header)
        if (index === 0 && child.type === 'heading' && child.attributes?.level === 1) {
          return null;
        }
        return <RenderNode key={index} node={child} />;
      })}
    </>
  );
}

function RenderNode({ node }: { node: MarkdocNode }) {
  if (!node) return null;

  const { type, attributes = {}, children = [] } = node;

  switch (type) {
    case 'heading':
      const level = attributes.level || 1;
      const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      
      // Add explicit styles that match Tailwind prose classes
      const headingStyles: Record<number, string> = {
        1: 'text-4xl font-bold text-gray-900 mt-8 mb-6',
        2: 'text-3xl font-bold text-gray-900 mt-12 mb-6',
        3: 'text-2xl font-bold text-gray-900 mt-8 mb-4',
        4: 'text-xl font-bold text-gray-900 mt-6 mb-3',
        5: 'text-lg font-bold text-gray-900 mt-6 mb-3',
        6: 'text-base font-bold text-gray-900 mt-6 mb-3',
      };
      
      return React.createElement(
        HeadingTag,
        { className: headingStyles[level] || '' },
        children.map((child, i) => <RenderNode key={i} node={child} />)
      );

    case 'paragraph':
      return (
        <p className="text-gray-700 leading-relaxed mb-6">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </p>
      );

    case 'list':
      const ListTag = attributes.ordered ? 'ol' : 'ul';
      const listClass = attributes.ordered 
        ? 'my-6 list-decimal pl-6'
        : 'my-6 list-disc pl-6';
      
      return React.createElement(
        ListTag,
        { className: listClass },
        children.map((child, i) => <RenderNode key={i} node={child} />)
      );

    case 'item':
      return (
        <li className="text-gray-700 mb-2">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </li>
      );

    case 'strong':
      return (
        <strong className="text-gray-900 font-semibold">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </strong>
      );

    case 'em':
      return (
        <em>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </em>
      );

    case 'link':
      return (
        <a href={attributes.href} target={attributes.target} rel={attributes.rel}>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </a>
      );

    case 'code':
      return (
        <code>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </code>
      );

    case 'inline':
      // Inline is just a wrapper, render children directly
      return (
        <>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </>
      );

    case 'text':
      // Text node with content attribute
      return <>{attributes.content || ''}</>;

    case 'hardbreak':
      return <br />;

    case 'hr':
      return <hr />;

    case 'blockquote':
      return (
        <blockquote>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </blockquote>
      );

    case 'image':
      return (
        <img
          src={attributes.src}
          alt={attributes.alt || ''}
          title={attributes.title}
        />
      );

    default:
      console.warn(`Unknown Markdoc node type: ${type}`);
      // Fallback: try to render children if they exist
      if (children.length > 0) {
        return (
          <>
            {children.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </>
        );
      }
      return null;
  }
}
