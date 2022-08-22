import * as BABYLON from "babylonjs";
import "./index.css";
import { Environment } from "./environment";
// import { Move } from "./move";
import { GameTable }  from "./board"; 
import { Piece } from "./piece";
import { Util } from "./util";
import { PIECES, PIECE_SIZE, TILE_SIZE } from "./constant";
import * as GUI from "babylonjs-gui";
import Tile from "./tile";

export default class App {
  private scene: BABYLON.Scene;
  private canvas: HTMLCanvasElement;
  private engine: BABYLON.Engine;
  public gamescene: BABYLON.Scene;
  public environment: Environment;
  public width: number;
  public height: number;
  public gameTable: GameTable;
  public context: any;
  public boards: any[];
  public currPiece: any;
  public gameUI: GUI.AdvancedDynamicTexture;
  // public move: Move;

  constructor() {
    // Canvas
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.width = this.canvas.getBoundingClientRect().width;
    this.height = this.canvas.getBoundingClientRect().height;
    this.scene = new BABYLON.Scene(this.engine);

    // this.canvas.onmousedown = (e) => this.handleMouseDown(e);
    // this.canvas.onmouseup = (e) => this.handleMouseUp(e);
    // this.canvas.onmousemove = (e) => this.handleMouseMove(e);
    // this.canvas.onmouseout = (e) => this.handleMouseOut(e);

    
    this.boards = [];
    // this.setPieceOnBoard(1);
    // this.setPieceOnBoard(2);
    this.currPiece = null;

    this.main();
  }

  private async main(): Promise<void> {
    // Register a render loop to repeatedly render the scene
    // Scene render loop
    await this.goToLoading();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    //resize if the screen is resized/rotated
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  private async goToLoading(): Promise<void> {
    await this.setUpGame().then((res) => {
      this.goToGame();
    });
  }

  private async setUpGame() {
    let camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );
    let scene = new BABYLON.Scene(this.engine);
    this.gamescene = scene;
    await this.initializeGameAsync(scene);
  }

  private async initializeGameAsync(scene): Promise<void> {
    //temporary light to light the entire scene
    var light0 = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light0.intensity = 40;
    // const light = new BABYLON.PointLight(
    //   "sparklight",
    //   new BABYLON.Vector3(0, 0, 0),
    //   scene
    // );
    // light.diffuse = new BABYLON.Color3(1, 1, 1);
    // light.intensity = 35;
    // light.radius = 1;
  }

  private async goToGame() {
    //--SETUP SCENE--
    this.scene.detachControl();
    this.gamescene.clearColor = new BABYLON.Color4(
      0.01568627450980392,
      0.01568627450980392,
      0.20392156862745098
    ); // a color that fit the overall color scheme better
    var camera4 = new BABYLON.ArcRotateCamera(
      "arc",
      -Math.PI / 2,
      Math.PI / 2,
      40,
      new BABYLON.Vector3(0, 3, 0),
      this.gamescene
    );

    this.gameUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    this.environment = new Environment(this.gamescene, this);
    // this.move = new Move(this.gamescene, this, this.environment);
    this.gameTable = new GameTable(this.gamescene, this, 10, 10);


    this.setPieceOnBoard(0);
    this.setPieceOnBoard(1);
    this.setPieceOnBoard(2);
    // let tile = new Tile(this,this.gamescene, "#ccc", "#000", 0, 0);
    this.canvas.addEventListener("pointerdown", (e) => this.handleMouseDown(e), false);
    this.canvas.addEventListener("pointerup", (e) => this.handleMouseUp(e), false);
    this.canvas.addEventListener("pointermove", (e) => this.handleMouseMove(e), false);
    this.canvas.addEventListener("pointerout", (e) => this.handleMouseOut(e), false);

    //--WHEN SCENE FINISHED LOADING--
    await this.gamescene.whenReadyAsync();
    this.scene.dispose();
    this.scene = this.gamescene;
    this.scene.attachControl();
  }

  private setPieceOnBoard(index) {
    let pos = index == 1 ? 0 : index == 0 ? -1.2 : 1.2;
    this.boards[index] = new Piece(
      this,
      this.gamescene,
      index,
      Util.random(PIECES.length),
      this.width / 2 - (pos * PIECE_SIZE) - TILE_SIZE,
      this.height - PIECE_SIZE
      // this.width / 2 - (pos * PIECE_SIZE ) - TILE_SIZE * 2 ,
      // this.height - PIECE_SIZE
    );
    // console.log(this.width / 2 - (pos * PIECE_SIZE) - TILE_SIZE );
    
  }

  

  private handleMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    let px = e.clientX;
    let py = e.clientY;
    // console.log(e.clientX);
    
    this.currPiece = this.getPieceOnBoard(px, py);
    // console.log(this.currPiece);
    
  }

  private handleMouseUp(e) {
    e = e || window.event;
    e.preventDefault();
    if (this.currPiece) {
      if (this.gameTable.putPiece(this.currPiece)) {
        this.setPieceOnBoard(this.currPiece.indexUI);
      } else {
        this.currPiece.reset();
      }
      this.gameTable.reset();
      this.currPiece = null;
    }
  }

  private handleMouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    let px = e.clientX;
    let py = e.clientY;
    if (this.currPiece) {
      this.currPiece.setPosition(px - PIECE_SIZE / 2, py - PIECE_SIZE);
      this.gameTable.preview(this.currPiece);
    }
  }

  private handleMouseOut(e) {
    e = e || window.event;
    e.preventDefault();
    if (this.currPiece) {
      this.currPiece.reset();
      this.gameTable.reset();
      this.currPiece = null;
    }
  }
  public getPieceOnBoard(x, y) {
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[i] && this.boards[i].isCollisions(x, y)) {
        return this.boards[i];
      }
    }
    return null;
  }
}
new App();
