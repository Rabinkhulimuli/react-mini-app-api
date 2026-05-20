import { Button } from '@/components/ui/button';
import { SORT_OPTIONS } from '@/hooks/usePostsManager';

export default function SortControls({ sortField, sortDirection, onSortFieldChange, onToggleDirection }) {
  return (
    <section className="panel panel--compact">
      <div className="panel__row">
        <label className="field field--inline">
          <span>Sort by</span>
          <select value={sortField} onChange={(event) => onSortFieldChange(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Button type="button" variant="outline" onClick={onToggleDirection}>
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>
    </section>
  );
}