const handBook =()=>import('../../views/guide/handbook.vue')
const fetch =()=>import('../../views/guide/fetch.vue')
const condition =()=>import('../../views/guide/condition.vue')
const conditionNew =()=>import('../../views/guide/condition.vue')
const midway =()=>import('../../views/guide/midway.vue')
const repay =()=>import('../../views/guide/repay.vue')
const valuationCAR =()=>import('../../views/guide/valuationCAR.vue')
const park =()=>import('../../views/guide/park.vue')
const parkNew =()=>import('../../views/guide/park.vue')
const EV160 =()=>import('../../views/guide/EV160.vue')
const POLO =()=>import('../../views/guide/POLO.vue')
const VIOS =()=>import('../../views/guide/VIOS.vue')
const SAIL =()=>import('../../views/guide/SAIL.vue')
const about =()=>import('../../views/guide/about.vue')
const agreement =()=>import('../../views/guide/agreement.vue')
const Novice =()=>import('../../views/guide/Novice.vue')
const regulations =()=>import('../../views/guide/regulations.vue')
const accident =()=>import('../../views/guide/accident.vue')
const valuationS =()=>import('../../views/guide/valuationS.vue')
const valuationSPLUS =()=>import('../../views/guide/valuationSP.vue')
const valuationMPLUS=()=>import('../../views/guide/valuationMP.vue')

export default [
        {
            path: '/handBook',
            name: 'handBook',
            component: handBook
        },
        {
            path: '/handBookNew',
            name: 'handBookNew',
            component: handBook
        },
        {
            path: '/fetch',
            name: 'fetch',
            component: fetch
        },
        {
            path: '/condition',
            name: 'condition',
            component: condition
        },
        {
            path: '/conditionNew',
            name: 'conditionNew',
            component: conditionNew
        },
        {
            path: '/midway',
            name: 'midway',
            component: midway
        },
        {
            path: '/repay',
            name: 'repay',
            component: repay
        },
        {
            path: '/valuationCAR',
            name: 'valuationCAR',
            component: valuationCAR
        },
        {
            path: '/park',
            name: 'park',
            component: park
        },
        {
            path: '/parkNew',
            name: 'parkNew',
            component: park
        },
        {
            path: '/EV160',
            name: 'EV160',
            component: EV160
        },
        {
            path: '/EV160New',
            name: 'EV160New',
            component: EV160
        },
        {
            path: '/POLO',
            name: 'POLO',
            component: POLO
        },
        {
            path: '/POLONew',
            name: 'POLONew',
            component: POLO
        },
        {
          path: '/VIOS',
          name: 'VIOS',
          component: VIOS
        },
        {
            path: '/VIOSNew',
            name: 'VIOSNew',
            component: VIOS
        },
        {
            path: '/SAIL',
            name: 'SAIL',
            component: SAIL
        },
        {
            path: '/SAILNew',
            name: 'SAILNew',
            component: SAIL
        },
        {
            path: '/Novice',
            name: 'Novice',
            component: Novice
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: agreement
        },
        {
            path: '/regulations',
            name: 'regulations',
            component: regulations
        },
        {
            path: '/accident',
            name: 'accident',
            component: accident
        },
        {
            path: '/valuationMPLUS',
            name: 'valuationMPLUS',
            component: valuationMPLUS
        },
        {
            path: '/valuationMPList',
            name: 'valuationMPList',
            component: valuationMPLUS
        },
        {
            path: '/valuationSPLUS',
            name: 'valuationSPLUS',
            component: valuationSPLUS
        },
        {
          path: '/valuationSPList',
          name: 'valuationSPList',
          component: valuationSPLUS
        },
        {
          path: '/valuationS',
          name: 'valuationS',
          component: valuationS
        },
        {
            path: '/valuationSList',
            name: 'valuationSList',
            component: valuationS
        },

    ]



