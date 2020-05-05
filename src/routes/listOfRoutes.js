import React, { Fragment } from 'react'
import Loadable from 'react-loadable'
import ProtectedRoute from './protectedRoute'
import { SpinnerHourGlass } from '../components/ui/spinner'

const loadableComponents = [
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/home'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/',
        props: {
            exact: true,
        },
        name: 'welcome',
        showWhenConnected: false,
        permission: 'all',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/home/detailsGov'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/donnees-de-la-region/:gov',
        props: {
            exact: true,
        },
        name: 'regionData',
        showWhenConnected: false,
        permission: 'all',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/home/detailsTunisia'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/donnees-de-la-tunisie/:type',
        props: {
            exact: true,
        },
        name: 'tunisiaData',
        showWhenConnected: false,
        permission: 'all',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/signup'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/inscription',
        props: {
            exact: true,
        },
        name: 'registration',
        showWhenConnected: false,
        permission: 'all',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/demande'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/demande/liste/:status?',
        props: {
            exact: true,
        },
        name: 'applicationsList',
        showWhenConnected: true,
        permission: 'demands',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/demande/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/demande/ajouter',
        props: {
            exact: true,
        },
        name: 'newApplication',
        showWhenConnected: true,
        permission: 'demands',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/demande/edit'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/demande/modifier/:id',
        props: {
            exact: true,
        },
        name: 'editApplication',
        showWhenConnected: true,
        permission: 'demands',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/profile'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/mes-informations',
        props: {
            exact: true,
        },
        name: 'informations',
        showWhenConnected: true,
        permission: '*',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/forms/changePassword'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/change-password',
        props: {
            exact: true,
        },
        name: 'change-password',
        showWhenConnected: true,
        permission: '*',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../components/forms/resetPassword'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/reset-password',
        props: {
            exact: true,
        },
        name: 'reset-password',
        showWhenConnected: false,
        permission: 'all',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/centreFormation/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/centre-de-formation/liste',
        props: {
            exact: true,
        },
        name: 'trainingCenterList',
        showWhenConnected: true,
        permission: 'trainingCenterList',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/centreFormation/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/centre-de-formation/ajouter',
        props: {
            exact: true,
        },
        name: 'trainingCenterList',
        showWhenConnected: true,
        permission: 'trainingCenterList',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/centreFormation/edit'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/centre-de-formation/modifier/:id',
        props: {
            exact: true,
        },
        name: 'trainingCenterList',
        showWhenConnected: true,
        permission: 'trainingCenterList',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/specialites/index'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/specialites/liste',
        props: {
            exact: true,
        },
        name: 'specialitiesList',
        showWhenConnected: true,
        permission: 'specialities',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/specialites/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/specialites/ajouter',
        props: {
            exact: true,
        },
        name: 'addspeciality',
        showWhenConnected: true,
        permission: 'specialities',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/specialites/edit'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/specialite/modifier/:id',
        props: {
            exact: true,
        },
        name: 'editspeciality',
        showWhenConnected: true,
        permission: 'specialities',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/referentiels'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/referentiels/liste',
        props: {
            exact: true,
        },
        name: 'referencesList',
        showWhenConnected: true,
        permission: 'referencesList',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/referentiels/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/referentiels/ajouter',
        props: {
            exact: true,
        },
        name: 'addReference',
        showWhenConnected: true,
        permission: 'referencesList',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/uniteRegionale'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/unite-regionale/liste',
        props: {
            exact: true,
        },
        name: 'ruList',
        showWhenConnected: true,
        permission: 'regionalNewsletter',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/uniteRegionale/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/unite-regionale/ajouter',
        props: {
            exact: true,
        },
        name: 'addRegionalUnit',
        showWhenConnected: true,
        permission: 'regionalNewsletter',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/archive'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/archive',
        props: {
            exact: true,
        },
        name: 'archive',
        showWhenConnected: true,
        permission: 'consultDemands',
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../containers/collectData/traineesBySector/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/:type/ajouter',
        props: {
            exact: true,
        },
        name: 'collectData',
        showWhenConnected: true,
        permission: 'collectData',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/traineesBySector'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/:type',
        props: {
            exact: true,
        },
        name: 'collectData',
        showWhenConnected: true,
        permission: 'collectData',
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../containers/collectData/trainingCenters/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/centres/nombre-centres-formation-privée/ajouter',

        props: {
            exact: true,
        },
        name: 'privateCenterNumber',
        showWhenConnected: true,
        permission: 'privateCenterNumber',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/trainingCenters'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/centres/nombre-centres-formation-privée',
        props: {
            exact: true,
        },
        name: 'privateCentersList',
        showWhenConnected: true,
        permission: 'privateCenterNumber',
    },

    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/projects'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/projets/:type',
        props: {
            exact: true,
        },
        name: 'projects',
        showWhenConnected: true,
        permission: 'collectData',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/projects/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/projets/:type/ajouter',
        props: {
            exact: true,
        },
        name: 'projects',
        showWhenConnected: true,
        permission: 'collectData',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/socioEconomics'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/gestion-des-données/socioéconomiques',
        props: {
            exact: true,
        },
        name: 'donnéesSocioéconomiques',
        showWhenConnected: true,
        permission: 'donneesSecteurSocio',
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../containers/collectData/socioEconomics/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/gestion-des-données/socioéconomiques/ajouter',
        props: {
            exact: true,
        },
        name: 'donnéesSocioéconomiques',
        showWhenConnected: true,
        permission: 'donneesSecteurSocio',
    },
    {
        loadableComponent: Loadable({
            loader: () =>
                import('../containers/collectData/socioEconomics/uploadFile'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/formulaires/gestion-des-données/socioéconomiques/telecharger',
        props: {
            exact: true,
        },
        name: 'donnéesSocioéconomiques',
        showWhenConnected: true,
        permission: 'donneesSecteurSocio',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/investment'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/investissement/:type',
        props: {
            exact: true,
        },
        name: 'projets-investissement',
        showWhenConnected: true,
        permission: '*',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/investment/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/investissement/:type/ajouter',
        props: {
            exact: true,
        },
        name: 'projets-investissement',
        showWhenConnected: true,
        permission: '*',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/collectData/btsData'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/donnees-bts/telecharger',
        props: {
            exact: true,
        },
        name: 'Données Bts',
        showWhenConnected: true,
        permission: 'donneesBts',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/roles'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-roles',
        props: {
            exact: true,
        },
        name: 'roles-management',
        showWhenConnected: true,
        permission: 'rolesManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/roles/details'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-roles/details/:id',
        props: {
            exact: true,
        },
        name: 'roles-management-details',
        showWhenConnected: true,
        permission: 'rolesManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/roles/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-roles/add',
        props: {
            exact: true,
        },
        name: 'roles-management-add',
        showWhenConnected: true,
        permission: 'rolesManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/roles/edit'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-roles/edit/:id',
        props: {
            exact: true,
        },
        name: 'roles-management-edit',
        showWhenConnected: true,
        permission: 'rolesManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/users'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-accees/agents',
        props: {
            exact: true,
        },
        name: 'agents-management',
        showWhenConnected: true,
        permission: 'agentsManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/users/details'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-accees/agents/details/:id',
        props: {
            exact: true,
        },
        name: 'agent-details',
        showWhenConnected: true,
        permission: 'agentsManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/users/add'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-accees/agents/ajouter',
        props: {
            exact: true,
        },
        name: 'agent-add',
        showWhenConnected: true,
        permission: 'agentsManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/users/edit'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/gestion-accees/agents/modifier/:id',
        props: {
            exact: true,
        },
        name: 'agent-add',
        showWhenConnected: true,
        permission: 'agentsManagement',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/statistics/socioEcoDatas'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/editique/donnees-socio-economiques',
        props: {
            exact: true,
        },
        name: 'stats-socio-eco',
        showWhenConnected: true,
        permission: 'dashboard',
    },
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/statistics/formationProDatas'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '/editique/donnees-de-la-formation-professionelle',
        props: {
            exact: true,
        },
        name: 'stats-socio-eco',
        showWhenConnected: true,
        permission: 'dashboard',
    },
    /**
     * !!!! Warning
     * notFoundPage should be always the last route
     * any route after notFoundPage will be ignored
     */
    {
        loadableComponent: Loadable({
            loader: () => import('../containers/NotFoundPage'),
            loading: () => <SpinnerHourGlass />,
        }),
        path: '*',
        props: {
            exact: false,
        },
        name: 'notFoundPage',
        showWhenConnected: false,
    },
]
const routes = loadableComponents.map(route => {
    const { path, props, name, showWhenConnected, permission } = route
    const RouteComponent = route.loadableComponent
    function LoadableComponent(anotherProps) {
        return (
            <Fragment>
                <RouteComponent {...props} {...anotherProps} />
            </Fragment>
        )
    }
    return (
        <ProtectedRoute
            key={path}
            path={path}
            render={anotherProps => LoadableComponent(anotherProps)}
            exact={props.exact}
            title={name}
            showWhenConnected={showWhenConnected}
            permission={permission}
        />
    )
})

export default routes
