import React from "react";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "*", //404 Page
        element: <h1>{"Page could not be Found :("}</h1>
    }
  ]);

export default function App(){
    return(
        <RouterProvider router = {router}/>
    )
}