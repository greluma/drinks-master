import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from './pages/Newsletter'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
})


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError></SinglePageError>
      },
      {
        path: 'cocktail/:id',
        element: <Cocktail></Cocktail>,
        loader: singleCocktailLoader,
        errorElement: <SinglePageError></SinglePageError>,
      },
      {
        path: 'newsletter',
        element: <Newsletter></Newsletter>,
        action: newsletterAction,
      },
      {
        path: 'about',
        element: <About></About>
      },
    ]
  },

])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>)
};
export default App;
