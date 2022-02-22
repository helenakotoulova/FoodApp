import { Routes, Route, Navigate } from "react-router";
//import ProfilePage from "./pages/ProfilePage";
//import AuthPage from "./pages/AuthPage";
//import HomePage from "./pages/HomePage";
//import MealDetailPage from "./pages/MealDetailPage";
//import AboutUsPage from "./pages/AboutUsPage";
import Layout from "./components/Layout/Layout";
import React, { useContext, Suspense } from "react";
import { AuthContext } from "./store/auth-context";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUsPage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const MealDetailPage = React.lazy(() => import("./pages/MealDetailPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  const authCtx = useContext(AuthContext);
  const loggedIn = authCtx.loggedIn;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Layout>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/meals/:mealId" element={<MealDetailPage />} />
          {!loggedIn && <Route path="/auth" element={<AuthPage />} />}
          {loggedIn && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;

/* 
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

Burger: https://slevomat.sgcdn.cz/images/t/2000/14/75/14755452-ef79c0.jpg
Schnitzel: https://therecipecritic.com/wp-content/uploads/2020/10/pork-schnitzel-recipe-3.jpg
Green bowl: https://s3-eu-west-1.amazonaws.com/images-marleyspoon-production/media/recipes/52753/main_photos/large/low_carb_greens_bowl-3826052b9191a7d6cb807d437b016389.jpeg
Sushi: https://images.aktin.cz/recipe-cover/cover-desktop/1551372218-a-2402.jpg?v=1586538722
Svickova: https://www.nejrecept.cz/upload/39134757_028ef8ceafa455_full.jpg
Tofu Curry: https://www.yayforfood.com/wp-content/uploads/one-pan-tofu-coconut-curry4-scaled-720x720.jpg
*/
