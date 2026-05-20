import { Link } from 'react-router-dom';
import { PencilLine, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PostCard({ post, onDelete }) {
  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>Post #{post.id}</span>
        <span>User {post.userId}</span>
      </div>

      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__body">{post.body}</p>

      <div className="post-card__actions">
        <Button asChild variant="outline" size="sm">
          <Link to={`/posts/${post.id}`}>
            <ExternalLink size={14} />
            Details
          </Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link to={`/posts/${post.id}/edit`}>
            <PencilLine size={14} />
            Edit
          </Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </article>
  );
}