/// <reference types="vite/client" />

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue-router/auto';
declare module 'virtual:generated-layouts' ;
declare module 'assets@/gif.worker.js' ;
