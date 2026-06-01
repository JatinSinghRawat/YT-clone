import {useSelector } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import OverlaySidebar from "./components/OverlaySidebar";
import VideoContainer from "./components/VideoContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Body/>,
      children:[
        {
          path:"/",
          element:<VideoContainer/>
        },
        {
          path:"/watch",
          element:<WatchPage/>
        },
        {
          path:"/results",
          element:<SearchResults/>
        }
      ]
    },
  ])
  const {isMenuOpen} = useSelector(store => store.sidebarNavigation)
  return (
      <div className="flex flex-col my-4">
        <OverlaySidebar isMenuOpen={isMenuOpen}/>
        <Head/>
        <RouterProvider router={appRouter}/>
      </div>
  );
}

export default App;
