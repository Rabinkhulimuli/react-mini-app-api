import { Button } from '@/components/ui/button';

export default function PostForm({
  values,
  onChange,
  onSubmit,
  submitLabel,
  onCancel,
  cancelLabel = 'Cancel',
  isSubmitting = false,
}) {
  const handleFieldChange = (field) => (event) => {
    onChange({ ...values, [field]: event.target.value });
  };

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <label className="field">
        <span>User ID</span>
        <input type="number" min="1" value={values.userId} onChange={handleFieldChange('userId')} />
      </label>

      <label className="field">
        <span>Title</span>
        <input type="text" value={values.title} onChange={handleFieldChange('title')} placeholder="Enter a title" />
      </label>

      <label className="field">
        <span>Body</span>
        <textarea value={values.body} onChange={handleFieldChange('body')} placeholder="Write the post body" rows="9" />
      </label>

      <div className="form-card__actions">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? `${submitLabel}...` : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
        ) : null}
      </div>
    </form>
  );
}