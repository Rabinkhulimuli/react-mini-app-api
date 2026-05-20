import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import DetailPage from '@/pages/DetailPage';
import CreatePage from '@/pages/CreatePage';
import EditPostModalPage from '@/pages/EditPostModalPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/:postId" element={<DetailPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="posts/:postId/edit" element={<EditPostModalPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}