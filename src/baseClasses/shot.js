export class Shot {
  constructor({ x, y, direction, source, target, damage, damageType, context }) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.source = source;
    this.target = target;
    this.damage = damage;
    this.damageType = damageType;
    this.context = context;

    this.speed = 5;
    this.type = 'shot';
  }

  move() {
    this.x += this.direction * this.speed;
  }

  update() {
    this.move();
  }
}
