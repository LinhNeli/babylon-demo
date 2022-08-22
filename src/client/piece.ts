import * as BABYLON from "babylonjs";
import App from "./index";
import Tile from "./tile";
import { Util } from "./util";
import {
  TILE_SIZE,
  TILE_COLORS,
  PIECES,
  TILE_BORDER_COLORS,
  PIECE_SIZE,
} from "./constant";

export class Piece {
  public app: App;
  public scene: BABYLON.Scene;
  public indexUI: any;
  public type: any;
  public dx: any;
  public dy: any;
  public px: any;
  public py: any;
  public data: any;
  public color: string;
  public borderColor: string;
  public tiles: any[];

  constructor(app: App, scene: BABYLON.Scene, index, type, x, y) {
    this.app = app;
    this.scene = scene;
    this.indexUI = index;
    this.type = type;
    this.dx = x;
    this.dy = y;
    this.px = x;
    this.py = y;

    this.data = PIECES[type];
    let indexColor = Util.random(TILE_COLORS.length);
    this.color = TILE_COLORS[indexColor];
    this.borderColor = TILE_BORDER_COLORS[indexColor];

    this.tiles = [];
    for (let i = 0; i < this.data.length; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j]) {
          this.tiles[i][j] = new Tile(
            this.app,
            this.scene,
            this.color,
            this.borderColor,
            this.px + j * TILE_SIZE,
            this.py + i * TILE_SIZE
          );
        }
      }
    }
  }

  draw(context) {
    // context.strokeStyle = this.color;
    // context.strokeRect(this.px, this.py, PIECE_SIZE, PIECE_SIZE);
    this.drawPreview(context, this.px + 15, this.py + 50);
  }

  drawPreview(context, px, py, type = -1) {
    let color = this.color;
    let borderColor = this.borderColor;
    if (type == 0) {
      color = "rgba(242, 53, 53, 0.5)";
      borderColor = "rgba(124, 4, 4, 0.5)";
    } else if (type == 1) {
      color = "rgba(19, 129, 219, 0.5)";
      borderColor = "rgba(13, 77, 130, 0.5)";
    }
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j]) {
          let dx = px + j * TILE_SIZE;
          let dy = py + i * TILE_SIZE;
          this.tiles[i][j].setColor(color, borderColor);
          this.tiles[i][j].setPosition(dx, dy);
          this.tiles[i][j].draw(context);
        }
      }
    }
  }

  setPosition(x, y) {
    this.px = x;
    this.py = y;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j]) {
          this.tiles[i][j].setPosition(
            this.px + j * TILE_SIZE,
            this.py + i * TILE_SIZE
          );
        }
      }
    }
  }

  isCollisions(x, y) {
    return (
      x >= this.px &&
      x <= this.px + PIECE_SIZE &&
      y >= this.py &&
      x <= this.py + PIECE_SIZE
    );
  }

  reset() {
    this.setPosition(this.dx, this.dy);
  }
}
