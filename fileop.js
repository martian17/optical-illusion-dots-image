//defined functions:
// getImageDataFromFile

var getImageDataFromFile = function(file){
    return new Promise((resolve,reject)=>{
        var img = document.createElement("img");
        var reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", ()=>{
            img.src = reader.result;
            img.addEventListener("load",function(){
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0);
                resolve(ctx.getImageData(0,0,img.width,img.height));
                //everything else, including the temp elements here and there, will be garbage collected
            });
        }, false);
    });
};

var getImageFromFile = function(file){
    return new Promise((resolve,reject)=>{
        var img = document.createElement("img");
        var reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", ()=>{
            img.src = reader.result;
            img.addEventListener("load",function(){
                return resolve(img);
            });
        }, false);
    });
};



var getImageFromInput = async function(input){
    if(filecache && filecache === finput.e.files[0]){
        var img = imgcache;
    }else{
        throw new Error("file not attached");
    }
    return await getImageFromInput(file);
};


var getImageDataFromImage = function(img){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    return ctx.getImageData(0,0,img.width,img.height);
};