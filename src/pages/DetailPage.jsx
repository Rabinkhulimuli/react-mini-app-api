import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, PencilLine, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getPostDetails, deletePostItem } = useOutletContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      try {
        setLoading(true);
        setError('');
        const nextPost = await getPostDetails(Number(postId));
        if (isMounted) {
          setPost(nextPost);
        }
      } catch {
        if (isMounted) {
          setError('This post could not be found.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadPost();

    return () => {
      isMounted = false;
    };
  }, [getPostDetails, postId]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this post and return to the home page?');
    if (!confirmed) {
      return;
    }

    try {
      await deletePostItem(Number(postId));
      navigate('/');
    } catch {
      // The hook already stores the error message for the page to show.
    }
  };

  return (
    <div className="page">
      <section className="panel panel--detail">
        <div className="detail-topbar">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft size={14} />
              Back
            </Link>
          </Button>

          <div className="detail-topbar__actions">
            <Button asChild variant="secondary" size="sm">
              <Link to={`/posts/${postId}/edit`}>
                <PencilLine size={14} />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 size={14} />
              Delete
            </Button>
          </div>
        </div>

        {loading ? <div className="state-box">Loading post details...</div> : null}
        {error ? <div className="state-box state-box--error">{error}</div> : null}

        {!loading && !error && post ? (
          <article className="detail-card">
            <p className="detail-card__meta">
              Post #{post.id} · User {post.userId}
            </p>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ) : null}
      </section>
    </div>
  );
}