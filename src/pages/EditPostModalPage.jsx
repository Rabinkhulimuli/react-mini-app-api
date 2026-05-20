import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostForm from '@/components/posts/PostForm';

export default function EditPostModalPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getPostDetails, updatePostItem } = useOutletContext();
  const [values, setValues] = useState({ userId: '1', title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      try {
        setLoading(true);
        const post = await getPostDetails(Number(postId));
        if (isMounted) {
          setValues({
            userId: String(post.userId ?? 1),
            title: post.title ?? '',
            body: post.body ?? '',
          });
        }
      } catch {
        if (isMounted) {
          setError('This post could not be loaded for editing.');
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

  const closeModal = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title.trim() || !values.body.trim()) {
      setError('Title and body are required.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updatePostItem(Number(postId), {
        userId: Number(values.userId) || 1,
        title: values.title.trim(),
        body: values.body.trim(),
      });
      navigate(`/posts/${postId}`);
    } catch {
      setError('The post could not be updated.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={closeModal}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="edit-post-title" onClick={(event) => event.stopPropagation()}>
        <div className="modal-card__header">
          <div>
            <p className="eyebrow">Edit popup</p>
            <h2 id="edit-post-title">Edit post #{postId}</h2>
          </div>

          <Button type="button" variant="ghost" size="icon" onClick={closeModal} aria-label="Close edit modal">
            <X size={16} />
          </Button>
        </div>

        {loading ? <div className="state-box">Loading post data...</div> : null}
        {error ? <div className="state-box state-box--error">{error}</div> : null}

        {!loading ? (
          <PostForm
            values={values}
            onChange={setValues}
            onSubmit={handleSubmit}
            submitLabel="Save changes"
            onCancel={closeModal}
            cancelLabel="Close"
            isSubmitting={saving}
          />
        ) : null}
      </div>
    </div>
  );
}