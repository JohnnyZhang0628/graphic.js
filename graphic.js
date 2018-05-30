/**
 * 画图基类
 */
class Graphic {
    constructor(elemFilter) {
        const canvas = document.querySelector(elemFilter);
        //判断浏览器是否支持canvas
        if (canvas.getContext) {
            this.ctx = canvas.getContext('2d');
        }
        else {
            throw (errorMsg["001"]);
        }

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
        const ctx = this.ctx;
        ctx.rect(x, y, width, height);
        ctx.fillStyle = pen.fillStyle;
        ctx.strokeStyle = pen.strokeStyle;
        ctx.shadowBlur = pen.shadowBlur;
        ctx.shadowColor = pen.shadowColor;
        ctx.shadowOffsetX = pen.shadowOffsetX;
        ctx.shadowOffsetY = pen.shadowOffsetY;
        if (hasFill)
            ctx.fill();
        else
            ctx.stroke();

    }
    /**
     * 画圆弧
     */
    DrawArc() {
        console.log(this.ctx.fillStyle);
    }
    /**
     * 绘制指定的椭圆。
     */
    DrawEllipse() {

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
    }
}


const errorMsg = {
    '001': 'web browser not support canvas!'//您的浏览器不支持canvas
}


const myGUI = new Graphic('canvas');
const pen = new Pen();
pen.strokeStyle = 'red';

myGUI.drawRect(10, 10, 400, 240,pen);
myGUI.DrawArc();




