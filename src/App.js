import {Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/auth-context";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/modules/dashboard/DashBoardLayout";
import PostManage from "./components/modules/post/PostManage";
import PostAddNew from "./components/modules/post/PostAddNew";
import PostCategory from "./components/modules/post/PostCategory";
import UserManage from "./components/modules/user/UserManage";
import UserAddNew from "./components/modules/user/UserAddNew";
import UserProfile from "./components/modules/user/UserProfile";
import CategoryAddNew from "./components/modules/category/CategoryAddNew";
import CategoryManage from "./components/modules/category/CategoryManage";
import CategoryUpdate from "./components/modules/category/CategoryUpdate";
import UserUpdate from "./components/modules/user/UserUpdate";
function App() {
  return (
    <>
      <AuthProvider>
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
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
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
            {/* <Route
              path="/manage/category"
              element={<PostCategory></PostCategory>}
            ></Route> */}
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
