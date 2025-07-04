class Attractor {
  constructor(x, y, z, c) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.r = hue(c);
    this.s = saturation(c);
    this.b = brightness(c);

    this.points = [];
  }

  update() {
    let dx = sigma * (this.y - this.x) * dt;
    let dy = (this.x * (rho - this.z) - this.y) * dt;
    let dz = (this.x * this.y - beta * this.z) * dt;

    this.x += dx;
    this.y += dy;
    this.z += dz;

    let p = createVector(this.x * 10, this.y * 10, this.z * 10);
    this.points.push(p);
    if (this.points.length > maxPoints) {
      this.points.shift();
    }
  }

  display() {
    strokeWeight(1.2);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let a = map(i, 0, this.points.length, 60, 255);
      stroke(this.r, this.s, this.b, a);
      let p = this.points[i];
      vertex(p.x, p.y, p.z);
    }
    endShape();

    // White glowing endpoint
    let end = this.points[this.points.length - 1];
    stroke(0, 0, 255); // HSB white
    strokeWeight(6);
    point(end.x, end.y, end.z);
  }
}
