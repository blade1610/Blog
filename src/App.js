import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/auth-context";
import React, {Suspense} from "react";
import PostAddNew from "./components/modules/post/PostAddNew";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const PostDetailsPage = React.lazy(() =>
  import("./pages/PostDetailsPage")
);
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const DashboardLayout = React.lazy(() =>
  import("./components/modules/dashboard/DashBoardLayout")
);
const PostManage = React.lazy(() =>
  import("./components/modules/post/PostManage")
);

const UserManage = React.lazy(() =>
  import("./components/modules/user/UserManage")
);
const UserAddNew = React.lazy(() =>
  import("./components/modules/user/UserAddNew")
);
const AuthorPage = React.lazy(() => import("./pages/AuthorPage"));
const UserProfile = React.lazy(() =>
  import("./components/modules/user/UserProfile")
);
const CategoryAddNew = React.lazy(() =>
  import("./components/modules/category/CategoryAddNew")
);
const CategoryUpdate = React.lazy(() =>
  import("./components/modules/category/CategoryUpdate")
);
const UserUpdate = React.lazy(() =>
  import("./components/modules/user/UserUpdate")
);
const PostUpdate = React.lazy(() =>
  import("./components/modules/post/PostUpdate")
);
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const CategoryManage = React.lazy(() =>
  import("./components/modules/category/CategoryManage")
);
function App() {
  return (
    <>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/sign-up"
              element={<SignUpPage></SignUpPage>}
            ></Route>
            <Route
              path="/sign-in"
              element={<SignInPage></SignInPage>}
            ></Route>
            <Route
              path="*"
              element={<NotFoundPage></NotFoundPage>}
            ></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route
              path="/user/:slug"
              element={<AuthorPage></AuthorPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
