import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import BlogIndexPage from "@/pages/BlogIndexPage";
import BlogPostPage from "@/pages/BlogPostPage";
import HomePage from "@/pages/HomePage";
import LearningPage from "@/pages/LearningPage";
import SiteNav from "@/components/nav/SiteNav";

function App() {
  return (
    <>
      <SiteNav />
      <Outlet />
    </>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        element: <BlogIndexPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPostPage />,
      },
      {
        path: "learn",
        element: <LearningPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default App;
