# aammui fileuploader
It's a vue filejs fileuploader.
![ScreenShot](https://raw.githubusercontent.com/bedus-creation/AammuiUploader/master/docs/screenshot.png)

# Installation
```
npm install aammui-uploader@0.1.0 --save
```
# Uses
```
<template>
    <file-uploader url="/medias" name="input_name" imgholder="id-to-hold-image-back"></file-uploader>
</template>
<script>
import { FileUploader } from "aammui-uploader";

export default {
    components: { FileUploader }
};
</script>
```
# Server file listing
we assume that same url but (Get and Post) url is used to fetch and post images to server.
For example: In above example the url /medias return the data in following format
```
{
    data: [
        {
            id: 188, // Media or Image Id that can be used to attach the media to other model.
            url: "http://localhost:8000/storage/upload/600-xQGysl5i1zsjwXt0I10UdODtdyziLIkT5FuDYElk.jpeg"
        }
    ]
}
```
# local File listing
Fileuploader will hit to same url by post methods and your backend should return the data in the 
following format.
```
{
    "id":189, // Media or Image Id that can be used to attach the media to other model.
    "url":"http:\/\/localhost:8000\/storage\/upload\/600-7Gz0FLKEbBA4ndStn97Na24xSg6kODkryp2Euvuw.jpeg"
}
```
# Displaying back image to placeholder
Suppose you want use this uploader to upload profile picture and when user upload and set picture you may want to display back that picture to cetain placeholder. To do so you can pass `imgholder` props.
```
<file-uploader url="/medias" name="input_name" imgholder="id-to-hold-image-back"></file-uploader>
```

