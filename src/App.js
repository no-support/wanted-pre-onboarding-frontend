import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Todo = lazy(() => import("./pages/Todo"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩 중</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="todo" element={<Todo />} />
            <Route path="*" element={<div>404 없는 페이지입니다</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
