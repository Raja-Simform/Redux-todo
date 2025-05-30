// routes.ts
import { Outlet } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import Todos from '../../pages/Todos/Todos'
import AddTodo from '../../pages/Todos/AddTodo'
import TodoDetail from '../../pages/Todos/TodoDetail'
import Layout from '../Layout/Layout'
import Login from '../../pages/Login/Login'


export interface RouteItem {
  path: string;
  element: React.FC;
  children?: RouteItem[];
  isAuth?:boolean;
}

export const routes: RouteItem[] = [
  {
    path:'/',
    element:Layout,
    children:[
      {
        path: '',
        element: Home,
        isAuth:true,
      },
      {
        path: 'about',
        element: About,
        isAuth:true,
        
      },
      {
        path: 'todos',
        element: Outlet, 
        isAuth:true,
        children: [
          {
            path: '',
            element: Todos,
            isAuth:true,
          },
          {
            path: 'new',
            element: AddTodo,
            isAuth:true,
          },
          {
            path: ':id',
            element: TodoDetail,
            isAuth:true,
          },
        ],
      },
    ]

  },
  {
    path:"/login",
    element:Login,
  },
  
  {
    path: '*',
    element: () => <h2>Page Not Found</h2>,
  },
]
