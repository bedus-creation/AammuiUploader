<template>
    <div>
        <img :src="selected.link" class="w-100" />
        <input type="hidden" v-model="selected.id" :name="name" />
        <input
            type="file"
            ref="files"
            multiple
            style="display:none"
            v-on:change="handleFilesUpload()"
        />
        <button id="show-modal" @click="showModal()">Show Modal</button>
        <b-modal
            id="modal-lg"
            size="lg"
            title="Large Modal"
            headerClass="p-0"
            bodyClass="m-0"
            v-model="modalState"
            hide-footer
        >
            <div slot="modal-header" class="d-flex justify-content-between w-100">
                <div class="d-flex w-100">
                    <button
                        @click="uploaded=false"
                        class="btn w-50 px-3 py-2"
                        style="border-right:1px solid #dfdfdf"
                    >
                        <h4 class="mb-0">Upload From Computer</h4>
                    </button>
                    <button @click="uploaded=true" class="btn w-50 px-3 py-2">
                        <h4 class="mb-0">Choose From Server</h4>
                    </button>
                </div>
                <div class="p-2">
                    <button type="button" class="close" @click="modalState=false">×</button>
                </div>
            </div>
            <transition name="slide-fade">
                <div v-if="uploaded==false" style="height:400px; overflow-y:scroll">
                    <button class="btn btn-success w-100" @click="addFiles()">Upload File</button>
                    <div class="row py-3">
                        <div v-for="item in files" :key="item.id" class="col-md-3 mb-2">
                            <div
                                :style="'background-image: url('+item.url+'); cursor: pointer;'"
                                class="w-100 tw-h-10 tw-bg-i"
                                @click="setSelected(item)"
                            >
                                <div class="local" v-if="item.uploaded">
                                    <div>&nbsp;</div>
                                    <div class="setB">set Image</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else style="height:400px; overflow-y:scroll">
                    <div class="row">
                        <div v-for="item in data" :key="item.id" class="col-md-3 mb-2">
                            <div
                                :style="'background-image: url('+item.url+'); cursor: pointer;'"
                                class="w-100 tw-h-10 tw-bg-i"
                                @click="setSelected(item)"
                            >
                                <div class="local">
                                    <div>&nbsp;</div>
                                    <div class="setB">set Image</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </b-modal>
    </div>
</template>
<script>
import $ from "jquery";
import { BModal, VBModal } from "bootstrap-vue";
import { FileUpload } from "../FileUpload";
import axios from "axios";
export default {
    props: ["url", "name"],
    mixins: [FileUpload],
    data() {
        return {
            selected: {
                id: null,
                link: ""
            },
            data: [],
            uploaded: false,
            modalState: false
        };
    },
    methods: {
        setSelected: function(item) {
            this.selected.id = item.id;
            this.selected.link = item.url;
            this.modalState = false;
        },
        showModal: function() {
            this.modalState = true;
            this.fecthData();
        },
        fecthData: function() {
            axios
                .get(this.url)
                .then(response => {
                    this.data = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    components: { "b-modal": BModal },
    mounted() {
        let vm = this;
        var elementToToggle = $(".modal-container");
        $(document).click(function(event) {
            if ($(event.target).parents(elementToToggle).length === 5) {
                vm.modalState = false;
            }
        });
    }
};
</script>

<style>
.tw-h-10 {
    height: 10rem;
}
.tw-w-10 {
    width: 10rem;
}
.local {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}
.tw-bg-i {
    background-position: center !important;
    background-size: cover !important;
}
.local .setB {
    background: green;
    color: #fff;
    bottom: 0;
    padding: 0.25rem 0.75rem;
}
</style>
