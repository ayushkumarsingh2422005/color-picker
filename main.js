window.onload = function() {
    const img_in = document.querySelector('.fa-image');
    const cam_in = document.querySelector('.fa-camera');
    const canvas = document.querySelector('#myCanvas');
    const marker = document.querySelector('#marker');
    const parent = document.querySelector('#container');
    const top_el = document.querySelector('#upload');
    const data_ele = document.querySelector('#cd');
    const color = document.querySelector('#color');
    //screen.lockOrientation('landscape');
    //screen.orientation.lock('landscape');
    var top_h;
    var top_w;
    var ele_x;
    var ele_y;
    var pos_x;
    var pos_y;
    var pic_x;
    var pic_y;
    var org_x;
    var org_y;
    var imgData;
    var r, g, b, a;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    window.addEventListener("orientationchange", function() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ////.log('o')
        //ctx.beginPath();
        //ctx.fillRect(0, 0, 100, 100);
    }, false);

    const ctx = canvas.getContext('2d');
    img_in.onclick = function() {
        let in_im = document.createElement('input');
        in_im.type = 'file';
        in_im.accept = 'images/*'
        in_im.click();
        in_im.onchange = function(ev) {
            let file = ev.target.files[0];
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
        //.log('hello')
    }

    cam_in.onclick = function() {
        let in_im = document.createElement('input');
        in_im.type = 'file';
        in_im.accept = 'images/*';
        in_im.capture = 'camera';
        in_im.click();
        in_im.onchange = function(ev) {
            let file = ev.target.files[0];
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = URL.createObjectURL(file);
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ////.log(img.height,img.width)
            }
        }
        //.log('hello')
    }
    
    canvas.addEventListener('touchstart', function(e) {
        pos_x = e.touches[0].pageX
        pos_y = e.touches[0].pageY
        marker.style.opacity = '1';
        ele_x = parent.offsetLeft;
        ele_y = parent.offsetTop;
        top_h = top_el.clientHeight;
        top_w = top_el.clientWidth;
        marker.style.top = pos_y - 10 +'px';
        marker.style.left = pos_x - 10 +'px';
        if(window.innerWidth <= 500){
            org_x = pos_x - ele_x;
            org_y = pos_y - ele_y - top_h;
        }
        else{
            org_x = pos_x - ele_x - top_w;
            org_y = pos_y - ele_y;
        }
        imgData = ctx.getImageData(org_x, org_y, 1, 1).data;
        r = imgData[0];
        g = imgData[1];
        b = imgData[2];
        a = imgData[3];
        
        data_ele.innerHTML = `
            RGBA : (${r}, ${g}, ${b}, ${a})
        `;
        color.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    });
    canvas.addEventListener('touchmove',function(e){
        pos_x = e.touches[0].pageX
        pos_y = e.touches[0].pageY
        marker.style.top = pos_y - 10 + 'px';
        marker.style.left = pos_x - 10 + 'px';
        if (window.innerWidth <= 500) {
            org_x = pos_x - ele_x;
            org_y = pos_y - ele_y - top_h;
        }
        else {
            org_x = pos_x - ele_x - top_w;
            org_y = pos_y - ele_y;
        }
        imgData = ctx.getImageData(org_x, org_y, 1, 1).data;
        r = imgData[0];
        g = imgData[1];
        b = imgData[2];
        a = imgData[3];
        ////.log(org_x, org_y)
        data_ele.innerHTML = `
            RGBA : (${r}, ${g}, ${b}, ${a})
        `;
        color.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    });
    canvas.addEventListener('touchend', function(e) {
        marker.style.opacity = '0.5';
    });
}
