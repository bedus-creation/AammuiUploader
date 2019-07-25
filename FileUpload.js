var FileUpload = {
    data() {
        return {
            id: 0,
            files: []
        }
    },
    methods: {
        addFiles: function () {
            this.$refs.files.click();
        },
        submitFiles() {
            let formData = new FormData();
            for (var i = 0; i < this.files.length; i++) {
                let file = this.files[i];
                formData.append('files[' + i + ']', file);
            }
            axios.post(this.url,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function () {
                console.log('SUCCESS!!');
            })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        loadData:function(file,url) {
            this.files.push({
                id: this.id,
                file: file,
                url: url,
                uploaded: false
            });
            this.id = this.id + 1;
        },
        handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files;
            for (var i = 0; i < uploadedFiles.length; i++) {
                let file = uploadedFiles[i];
                var reader = new FileReader();
                let vm = this;
                reader.onload = function () {
                    vm.loadData(file,reader.result)
                };
                reader.readAsDataURL(file);
            }
            this.submitFiles();
        },
        removeFile(key) {
            this.files.splice(key, 1);
        },
        getItem: function (key) {
            console.log(key);
            return this.files.filter(item => {
                console.log(key);
                return item.id==key;
            });
        }
    }
}
export {FileUpload}
