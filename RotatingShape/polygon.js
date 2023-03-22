const PI2 = Math.PI * 2;
// https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Transformations
export class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  animate(ctx, moveX) {
    ctx.save(); // save context state 

    ctx.fillStyle = "#ccc";
    // ctx.beginPath();

    const angle = PI2 / this.sides;
    const angle2 = PI2 / 4;
    ctx.translate(this.x, this.y);

    this.rotate += moveX * 0.001;
    ctx.rotate(this.rotate);


    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);
      
      ctx.save(); // save context state
      ctx.translate(x, y);
      ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180);
      ctx.beginPath();

      for (let j = 0; j < 4; j++) {
        const x2 = 178 * Math.cos(angle2 * j);
        const y2 = 100 * Math.sin(angle2 * j);

        // ctx.arc(x,y, 30, 0, PI2, false);
        j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    // ctx.fill();
    // ctx.closePath();
    ctx.restore();
    // get last context state 
  }
}
