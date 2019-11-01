import VModal from 'vue-js-modal'
import FileUploader from './components/FileUploader'

// This is your plugin object. It can be exported to be used anywhere.
export default {
    // The install method is all that needs to exist on the plugin object.
    // It takes the global Vue object as well as user-defined options.
    install(Vue, options) {
        Vue.use(VModal)
        Vue.component('file-uploader', FileUploader)
    }
};

export {FileUploader};
