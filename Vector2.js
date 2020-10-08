class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

Vector2.right = new Vector2(1, 0);
Vector2.left = new Vector2(-1, 0);
Vector2.up = new Vector2(0, 1);
Vector2.down = new Vector2(0, -1);