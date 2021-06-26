const Events = function(){
    const eventTable = {};
    this.on = function(type, callback){
        if(!(type in eventTable)){
            eventTable[type] = [];
        }
        eventTable[type].push(callback);
    };
    this.emit = function(type){
        const elist = eventTable[type] || [];
        for(let i = 0; i < elist.length; i++){
            elist[i].apply(this,[...arguments].slice(1));
        }
    };
};

class ImageInput extends Events{
    constructor(root){
        super();
        var iconHeight = 100;
        var finput = root.add("input","type:file;",false,"display:none;").e;
        var fbutton = root.add("input","type:button;value:select image;");
        root.add("br");
        var canvas = root.add("canvas",false,false,`display:none;max-height:${iconHeight}px;`).e;//this canvas is for pre-viewing the image
        
        fbutton.addEventListener("click",function(){
            finput.click();
        });
        
        finput.addEventListener("input",function(){
            try{
                var img = getImageFromInput(finput);
                var data = getImageDataFromImage(img);
            }catch(){
                console.log("image loading failed");
                return false;
            }
            canvas.style.display = "block";
            var wa = Math.floor(data.width/data.height*iconHeight);
            canvas.width = wa;
            canvas.height = iconHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,0,0,wa,iconHeight);
            this.emit("img-load",data);
        });
    }
}

class Range extends Events{
    constructor(root, label, props = "", style = ""){
        var row = root.add("div","class:input-row");
        row.add("span",false,"dot density: ");
        var row.add("input","type:range;"+props,false,style);
        
    }
}

class Controls extends Events{
    constructor(root){
        super();
        var row1 = root.add("div","class:input-row");
        const config = {
            img:null,
            data:null,
            height:null,
            //no height because width is sufficient
        };
        var imgInput = ImageInput(row1,config);
        imgInput.on("img-load",function(data){
            //this.emit("draw-ready");
        });
        var row2 = root.add("div","class:input-row");
        row2.add("span",false,"dot density: ");
        row2.add("input","type:range");
        
        var row3 = root.add("div","class:input-row");
        row3.add("span",false,"size: ");
        row3.add("input","type:range");
        
    }
    
}





var main = function(){
    //basic root setup
    BODY.add("h1",false,"Day 6");
    var controls = BODY.add("div");
    var controls = new Controls(controls);
    var canvas = BODY.add("canvas");
    
    
};


