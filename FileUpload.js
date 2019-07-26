var FileUpload = {
    data() {
        return {
            id: 0,
            files: [],
        }
    },
    methods: {
        addFiles: function () {
            this.$refs.files.click();
        },
        getunUploadedFile: function () {
            return this.files.filter(item => {
                return item.uploaded == false;
            });
        },
        sendToServer: async function (formData, index, id) {
            await axios.post(this.url,
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
            ).then(response => {
                this.updateSuccess(response.data,id);
            }).catch(function (error) {
                    console.log(error);
                });
        },
        submitFiles(index=0) {
            let files = this.getunUploadedFile();
            let formData = new FormData();
            if (index >= files.length) {
                return;
            };
            let file = files[index].file;
            formData.append('file', file);
            // console.log('index '+index+'Id '+files[index].id);
            this.sendToServer(formData, index, files[index].id);
            this.submitFiles(index + 1);
        },
        updateSuccess: function (data,id) {
            let item = this.getItem(id);
            // console.log("Id"+id);
            // console.log(item);
            let index = this.files.indexOf(item[0]);
            // console.log(index);
            // console.log(item+"Strin");
            this.files[index].uploaded = true;
            this.files[index].data = data;
            // console.log(item);
        },
        loadData: function (file, url) {
            // console.log('file'+url);
            this.files.unshift({
                id: this.id,
                file: file,
                url: url,
                uploaded: false,
                data: {}
            });
            this.id = this.id + 1;
        },
        handleFilesUpload() {
            let files = this.$refs.files.files;
            var reader = new FileReader();
            let vm = this;
            function readFile(index) {
                if (index >= files.length) {
                    return vm.submitFiles();
                };
                var file = files[index];
                reader.onload = function (e) {
                    vm.loadData(file, reader.result)
                    readFile(index + 1)
                }
                reader.readAsDataURL(file);
            }
            readFile(0)
        },
        removeFile(key) {
            this.files.splice(key, 1);
        },
        getItem: function (key) {
            return this.files.filter(item => {
                return item.id==key;
            });
        }
    }
}
export {FileUpload}






