import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true,
  },
  {
    path: "/qrcode",
    component: () => import("@/views/weixin/qrcode"),
    hidden: true,
  },
  {
    path: "/comptroller",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/gmv",
        name: "gmv",
        meta: {
          title: "询价详情",
          noCache: false,
        },
        component: () => import("@/views/stat/components/gmv"),
        props: true,
      },
    ],
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "reload",
        component: () => import("@/views/dashboard/reload"),
        name: "reload",
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/sys",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "sysManage",
    meta: {
      title: "系统管理",
      icon: "chart",
    },
    children: [
      /*{
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '管理员',
          noCache: true
        }
      }*/
    ],
  },

  {
    path: "external-link",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "externalLink",
    meta: {
      title: "外链",
      icon: "link",
    },
    children: [
      {
        path: "https://www.alibabacloud.com/zh/product/oss",
        meta: { title: "阿里云存储", icon: "link" },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
