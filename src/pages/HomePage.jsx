import { useNavigate, useOutletContext } from 'react-router-dom';
import { RefreshCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/posts/PostCard';
import SortControls from '@/components/posts/SortControls';

export default function HomePage() {
  const {
    visiblePosts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortField,
    setSortField,
    sortDirection,
    toggleSortDirection,
    deletePostItem,
    loadPosts,
    hardResetPostsState,
  } = useOutletContext();
  const navigate = useNavigate();

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Delete this post from the local store?');
    if (!confirmed) {
      return;
    }

    try {
      await deletePostItem(postId);
    } catch {
      // The hook already stores the error message for the page to show.
    }
  };

  return (
    <div className="page">
      <section className="hero panel">
        <div>
          <p className="eyebrow">Home / List</p>
          <h2 className="hero__title">Practice API data handling with a tiny post manager.</h2>
          <p className="hero__text">
            Data comes from one fetch call on startup. After that, create, update, delete, search, and sort all happen locally so beginners can trace the flow.
          </p>
        </div>

        <div className="hero__actions">
          <Button onClick={() => navigate('/create')}>Create Post</Button>
          <Button variant="outline" onClick={() => void loadPosts()} disabled={loading}>
            <RefreshCcw size={14} />
            Refresh local
          </Button>
          <Button variant="destructive" onClick={() => void hardResetPostsState()} disabled={loading}>
            <RefreshCcw size={14} />
            Hard reset
          </Button>
        </div>
      </section>

      <section className="panel panel--compact">
        <label className="field field--search">
          <span>
            <Search size={14} />
            Search
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, body, user ID, or post ID"
          />
        </label>
      </section>

      <SortControls
        sortField={sortField}
        sortDirection={sortDirection}
        onSortFieldChange={setSortField}
        onToggleDirection={toggleSortDirection}
      />

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">List</p>
            <h3>Available posts</h3>
          </div>
          <span className="section-heading__count">{visiblePosts.length} items</span>
        </div>

        {loading ? <div className="state-box">Loading posts from the API...</div> : null}

        {error ? <div className="state-box state-box--error">{error}</div> : null}

        {!loading && !error && visiblePosts.length === 0 ? (
          <div className="state-box">No posts match the current search or sorting settings.</div>
        ) : null}

        <div className="post-grid">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      </section>
    </div>
  );
}