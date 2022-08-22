import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import App from "./index";
import { TILE_SIZE } from "./constant";

export default class Tile {
  public app: App;
  public scene: BABYLON.Scene;
  public color: any;
  public borderColor: any;
  public x: number;
  public y: number;
  public tile: GUI.Image;
  // public tileManager: BABYLON.SpriteManager

  public tilePath: string =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA1IDc5LjE2NDU5MCwgMjAyMC8xMi8wOS0xMTo1Nzo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCNjQwNDEwODM0QzExRUJBMDJBRTEzODI4NDI4MkY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCNjQwNDExODM0QzExRUJBMDJBRTEzODI4NDI4MkY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEI2NDA0MEU4MzRDMTFFQkEwMkFFMTM4Mjg0MjgyRjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEI2NDA0MEY4MzRDMTFFQkEwMkFFMTM4Mjg0MjgyRjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz73yutkAAAF/klEQVR42uSbyU8b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";
  public gameUI: GUI.AdvancedDynamicTexture;

  constructor(
    app: App,
    scene: BABYLON.Scene,
    color,
    borderColor,
    x = -1,
    y = -1
  ) {
    this.app = app;
    this.scene = scene;
    this.color = color;
    this.borderColor = borderColor;
    this.x = x;
    this.y = y;
    

    // this.tileManager = new BABYLON.SpriteManager(
    //   "tileManager",
    //   this.tilePath,
    //   1,
    //   400,
    //   this.scene
    // );
    // this.tile = new BABYLON.Sprite("tileSprite", this.tileManager);
    // this.tile.size = 9.35;
    // // this.block1.position.y = 5.8;
    // // this.block1.position.x = 6.6;
    // this.tile.position.y = -6.9;
    // this.tile.position.x = -2.6;

    // this.tile = BABYLON.Mesh.CreatePlane("tile", 1, this.scene);
    //   var tileMat = new BABYLON.StandardMaterial("tileMat", this.scene);
    //   tileMat.diffuseTexture = new BABYLON.Texture(this.tilePath, this.scene);
    //   this.tile.material = tileMat;
    // this.tile.position = new BABYLON.Vector3((this.x - 145) / 20, 0, 0);
    // // this.tile.position.x = 1;
    // // this.tile.position.y = 1;
    // // this.tile.position.z = 0;
    // console.log(this.tile.position.x,this.tile.position.y);

    // this.tile.scaling = new BABYLON.Vector3(16,35,1);
    // console.log(this.tile);

    // this.gameUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    this.tile = new GUI.Image("tile", this.tilePath);
    this.tile.width = "33.7px";
    this.tile.height = "33.7px";
    this.tile.top = this.y;
    this.tile.left = this.x;
    
    this.tile.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.tile.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    this.app.gameUI.addControl(this.tile);
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    context.strokeStyle = this.borderColor;
    context.strokeRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
  }

  setPosition(x, y) {
    this.x = x ;
    this.y = y;
    this.tile.top = this.y;
    this.tile.left = this.x;
  }

  setColor(color, borderColor) {
    this.color = color;
    this.borderColor = borderColor;
  }
}
