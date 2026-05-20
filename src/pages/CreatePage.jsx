import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostForm from '@/components/posts/PostForm';

const initialValues = {
  userId: '1',
  title: '',
  body: '',
};

export default function CreatePage() {
  const navigate = useNavigate();
  const { createPostItem } = useOutletContext();
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title.trim() || !values.body.trim()) {
      setError('Title and body are required.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const createdPost = await createPostItem({
        userId: Number(values.userId) || 1,
        title: values.title.trim(),
        body: values.body.trim(),
      });

      setValues(initialValues);
      navigate(`/posts/${createdPost.id}`);
    } catch {
      setError('The post could not be created.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page page--narrow">
      <section className="panel">
        <div className="section-heading section-heading--stacked">
          <div>
            <p className="eyebrow">Create page</p>
            <h2>Create a new local post</h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft size={14} />
              Back to list
            </Link>
          </Button>
        </div>

        {error ? <div className="state-box state-box--error">{error}</div> : null}

        <PostForm
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          submitLabel="Create post"
          isSubmitting={saving}
        />
      </section>
    </div>
  );
}