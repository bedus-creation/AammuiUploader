<template>
    <div>
        <input type="hidden" v-model="selected.id" :name="name" />
        <input
            type="file"
            ref="files"
            multiple
            accept="image/*"
            style="display:none"
            v-on:change="handleFilesUpload()"
        />
        <button id="show-modal" @click="showModal()">Show Modal</button>
        <modal
            name="aammui-uploader-modal"
            class="mb-2"
            width="700px"
            height="auto"
            :minHeight="400"
            :scrollable="true"
            :pivotY="0.2"
        >
            <div class="d-flex justify-content-between w-100 p-4">
                <div class="d-flex w-100">
                    <button
                        @click="uploaded=false"
                        :class="{'btn-primary text-white':!uploaded}"
                        class="btn btn-outline-primary w-50 px-3 py-2"
                    >
                        <h4 class="mb-0">Upload From Computer</h4>
                    </button>
                    <button
                        @click="uploaded=true"
                        :class="{'btn-primary text-white':uploaded}"
                        class="btn btn-outline-primary w-50 px-3 py-2"
                    >
                        <h4 class="mb-0">Choose From Server</h4>
                    </button>
                </div>
                <div class="p-2">
                    <button type="button" class="close" @click="hideModal()">×</button>
                </div>
            </div>
            <transition name="slide-fade">
                <div
                    class="container card card-body"
                    v-if="uploaded==false"
                    style="height:300px; overflow-y:auto"
                >
                    <button class="btn btn-success w-100 px-2" @click="addFiles()">Upload File</button>
                    <div class="row my-2">
                        <div v-for="item in files" :key="item.id" class="col-md-3 mb-2">
                            <div
                                :style="'background-image: url('+item.url+'); cursor: pointer; background-color: rgba(0, 0, 0, 0.2);'"
                                class="w-100 tw-h-10 tw-bg-i"
                                @click="setSelected(item.data, item.uploaded)"
                            >
                                <div class="local" v-if="item.uploaded">
                                    <div>&nbsp;</div>
                                    <div class="setB">set Image</div>
                                </div>
                                <div
                                    class="d-flex justify-content-center align-items-center h-100"
                                    v-else
                                >
                                    <div class="lds-ellipsis">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="container card card-body"
                    v-else
                    style="min-height:300px; overflow-y:auto"
                >
                    <div class="row my-2">
                        <div v-for="item in data" :key="item.id" class="col-md-3 mb-2">
                            <div
                                :style="'background-image: url('+item.url+'); cursor: pointer;'"
                                class="w-100 tw-h-10 tw-bg-i"
                                @click="setSelected(item,true)"
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
        </modal>
    </div>
</template>
<script>
import Vue from "vue";
import VModal from "vue-js-modal/dist/ssr.index";
Vue.use(VModal);
import $ from "jquery";
import { BModal, VBModal } from "bootstrap-vue";
import { FileUpload } from "../FileUpload";
import axios from "axios";
export default {
    props: ["url", "name", "imgholder"],
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
        setSelected: function(item, status) {
            // Don't allow click when file is uploading
            if (status == false) return;
            this.selected.id = item.id;
            this.selected.link = item.url;
            this.hideModal();
            this.setPlaceholder(item.url);
        },
        setPlaceholder: function(url) {
            let imgholder = document.querySelector(this.imgholder);
            imgholder.innerHTML = '<img class="w-100" src="' + url + '" />';
        },
        showModal: function() {
            this.$modal.show("aammui-uploader-modal");
            this.fecthData();
        },
        hideModal: function() {
            this.$modal.hide("aammui-uploader-modal");
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

<style lang="scss" scoped>
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
    background: rgba(0, 0, 0, 0.2);
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
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
}
.lds-ellipsis div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(19px, 0);
    }
}
</style>
