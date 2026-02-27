const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            path: '/',
            redirect: '/teachers/admin'
        },
        {
            name: 'Teachers',
            path: '/teachers/admin',
            component: () => import('@/views/teacher-admin/TeachersView.vue')
        }
    ]
};

export default MainRoutes;
