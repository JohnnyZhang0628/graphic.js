/**
 * 画图基类
 */
class Graphic {
    constructor(elemFilter) {
        const canvas = document.querySelector(elemFilter);
        //判断浏览器是否支持canvas
        if (canvas.getContext) {
            this.canvas = canvas;
        }
        else {
            throw (errorMsg["001"]);
        }

    }
    /**
     * 给ctx 添加样式
     * @param {*} ctx canvas.getContext('2d')得到的对象
     * @param {*} pen 画笔
     */
    draw(ctx, pen) {
        ctx.fillStyle = pen.fillStyle;
        ctx.strokeStyle = pen.strokeStyle;
        ctx.shadowBlur = pen.shadowBlur;
        ctx.shadowColor = pen.shadowColor;
        ctx.shadowOffsetX = pen.shadowOffsetX;
        ctx.shadowOffsetY = pen.shadowOffsetY;
        ctx.globalAlpha = pen.globalAlpha;
        ctx.textAlign = pen.textAlign;
        ctx.font = pen.font;
        ctx.lineWidth = pen.lineWidth;
        ctx.lineCap = pen.lineCap;
        ctx.lineJoin = pen.lineJoin;
        ctx.miterLimit = pen.miterLimit;
        return ctx;
    }
    /**
     * 绘制指定的矩形。
     * @param {number} x 矩形左上角的 x 坐标
     * @param {number} y 矩形左上角的 y 坐标。
     * @param {number} width 矩形的宽度，以像素计。
     * @param {number} height 矩形的高度，以像素计。
     * @param {*} pen 画笔类
     * @param {*} hasFill true则填充整个矩形，false则只有矩形边框
     */
    drawRect(x, y, width, height, pen = new Pen(), hasFill = false) {
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();

    }
    /**
     * 绘制圆角矩形的函数.
     * @param {number} x 矩形左上角的 x 坐标
     * @param {number} y 矩形左上角的 y 坐标。
     * @param {number} width 矩形的宽度，以像素计。
     * @param {number} height 矩形的高度，以像素计。
     * @param {number} radius 圆角的半径
     * @param {Pen} pen 画笔
     * @param {boolean} hasFill 是否填充
     */
    DrawRectArc(x, y, width, height, radius, pen = new Pen(), hasFill = false) {
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();

    }
    /**
     * 绘制制定的圆弧
     * @param {number} x 圆的中心的 x 坐标。
     * @param {number} y 圆的中心的 y 坐标。
     * @param {number} r 圆的半径。
     * @param {number} sAngle 起始角，以弧度计（弧的圆形的三点钟位置是 0 度）。
     * @param {number} eAngle 结束角，以弧度计。
     * @param {boolean} counterclockwise 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
     */
    DrawArc(x, y, r, sAngle, eAngle, counterclockwise = false, pen = new Pen(), hasFill = false) {
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.beginPath();
        ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();
    }
   /**
    * 绘制指定的椭圆。
    * @param {number} x 椭圆的中心的 x 坐标。
    * @param {number} y 椭圆的中心的 y 坐标。
    * @param {number} a 椭圆在x轴上的长半轴
    * @param {number} b 椭圆在y轴上的长半轴
    * @param {Pen} pen 画笔
    * @param {boolean} hasFill 是否填充
    */
    DrawEllipse(x,y,a,b,pen = new Pen(), hasFill = false) {
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.save();
        const r=a>b?a:b;
        const ratioX=a/r;
        const ratioY=b/r;
        ctx.scale(ratioX,ratioY);
        ctx.beginPath();
        ctx.arc(x/ratioX,y/ratioY,r,0,2*Math.PI);
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();
        ctx.restore();

    }
    /**
     * 绘制给定的三角形
     * @param {Array} data 3*2的数组
     * @param {Pen} pen 画笔类
     * @param {boolean} hasFill 是否填充
     */
    DrawTriangle(data = [], pen = new Pen(), hasFill = false) {
        if (data.length != 3) {
            throw (errorMsg["002"]);
        }
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.beginPath();
        ctx.moveTo(data[0][0], data[0][1]);
        ctx.lineTo(data[1][0], data[1][1]);
        ctx.lineTo(data[2][0], data[2][1]);
        ctx.lineTo(data[0][0], data[0][1]);
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();
    }
    /**
     * 填充文字
     * @param {number} x 开始绘制文本的 x 坐标位置（相对于画布）。
     * @param {number} y 开始绘制文本的 y 坐标位置（相对于画布）。
     * @param {string} text 规定在画布上输出的文本。
     * @param {Pen} pen 画笔
     * @param {boolean} hasFill 是否填充
     */
    DrawText(x,y,text,pen = new Pen(), hasFill = false)
    {
        let ctx = this.canvas.getContext('2d');
        ctx = this.draw(ctx, pen);
        ctx.beginPath();
       
        if (hasFill)
            ctx.fillText(text,x,y);
        else
            ctx.strokeText(text,x,y);

    }
}
/**
 * 画笔类，用于填充样式
 */

class Pen {
    constructor() {
        /**
         * 设置或返回用于填充绘画的颜色、渐变或模式。
         */
        this.fillStyle = '#000000';
        /**
        * 设置或返回用于笔触的颜色、渐变或模式。
        */
        this.strokeStyle = '#000000';
        /**
        * 设置或返回用于阴影的颜色。
         */
        this.shadowColor = '#000000';
        /**
        * 设置或返回用于阴影的模糊级别。
        */
        this.shadowBlur = 0;
        /**
        * 设置或返回阴影与形状的水平距离。
        */
        this.shadowOffsetX = 0;
        /**
        * 设置或返回阴影与形状的垂直距离。
        */
        this.shadowOffsetY = 0;
        /**
         * 设置或返回绘图的当前透明值
         * 属性值必须是介于 0.0（完全透明） 与 1.0（不透明） 之间的数字。
         */
        this.globalAlpha = 1.0;
        /**
         * 设置或返回文本内容的当前对齐方式。
         * center|end|left|right|start
         */
        this.textAlign = 'start';
        /**
         * 设置或返回画布上文本内容的当前字体属性。
         * 使用的语法与 CSS font 属性 相同。
         */
        this.font = '10px sans-serif';
        /**
         * 设置或返回当前线条的宽度，以像素计
         */
        this.lineWidth=1;
        /**
         * 设置或返回线条末端线帽的样式。
         * butt|round|square 平直|圆|正方形
         */
        this.lineCap='butt';
        /**
         * 属性设置或返回所创建边角的类型，当两条线交汇时
         * bevel|round|miter 斜角|圆角|尖角
         */
        this.lineJoin='miter';
        /**
         * 设置或返回最大斜接长度
         * 斜接长度指的是在两条线交汇处内角和外角之间的距离。
         */
        this.miterLimit=10;

    }
}


const errorMsg = {
    '001': 'web browser not support canvas!',//您的浏览器不支持canvas
    '002': 'data length only is 3!',//数组长度只能为3
}


const myGUI = new Graphic('canvas');
const pen = new Pen();
pen.strokeStyle = 'red';
pen.font='30px Arial';


const data = [[70, 50], [100, 75], [100, 25]];
myGUI.DrawTriangle(data, pen, true);

myGUI.DrawEllipse(100,100,100,50,pen);

myGUI.DrawText(10,10,'您好',pen,true);




