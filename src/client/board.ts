import * as BABYLON from "babylonjs";

import App from "./index";
import { Environment } from "./otherenvironment";
import { TILE_SIZE } from "./constant";

export class GameTable {
  public scene: BABYLON.Scene;

  public app: App;
  public row: number;
  public column: number;
  public data: any[];
  public prPiece: any;
  public prPieceRow: number;
  public prPieceColumn: number;
  public prPieceCanPut: boolean;
  public scores: number;
  public environment: Environment;

  public cellTablePath: string =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAACXBIWXMAAAsSAAALEgHS3X78AAAEx0lEQVR4nOWcS08TURTH/20HCh1oWCCTwIYFyqIEEhcSVyobontc+SXmizCu/AJ+AjUuTdyYEA1iQBYmYk0ID0l4hJYCfcyY/6S3KU9v2+ncO+NJmg6lnd7zO+eee++59zTheR7+dzGE/o7j9AJ4BOApgBnDMIbjxMZ13ZLruj8AfATwxrbtQ/E/3xMcxxkF8M40zftTU1MYGxtDOp1W2+qApVar4eDgAOvr69jZ2TkC8MK27ff8lsTi4iI94ItlWdNzc3Po7e2Nk+5XhEZfW1vDyspKCcAT27Y/JwE8M01zenZ2FslkUrMmd0cmJiYwPj6eAfAS9ZiwkMvl0NPTg7OzM/T19cEwDCQSCb8B4jmqIgI/n13XxenpqX/Nbr+5ufnQcZweI5lMPrAsq6Hi+fk5UqmUf10oFHBycoJqtYoojiLUo7+/H9ls1jdsuVxu6MGYNzIywviQNlKp1GhzHKBHlEolHB4e+h8cHBxsQImaUGHqsr297ethmqbvDXxQMpmMz4rdoaGhiAnHx8d+NxgaGsLAwEAkAQih4ru7u75OtD51FBBEV78QCfkih5JKpeLHBvYfPqIqVPbo6Mj3burGmHddjGtMlgQEfpBuJLyiWCz63YI3ikpcoB5sK2MajYq6l/P6nxBuEroSuwbdiUB0FhqRnsw2MxA2g7lJpDQiQRE8xRDTqmXCCq78LhpL9HsZkYJAABwmOVy2O2+gO4blRfQAxjR6hIxITRHFJKOTiRPvQZBhSKvfJQ0hiKAYNghZkYIQ5NQ5TBCyomTFpBsIZctGgtBl1aq0FZzB6SDKTdE8oVElWvijahDapJJUgtAqn6YKhHZJRRUgtMyshg1C2/RymCCkIajIOocFQhqCqmQrQXTbANIQwswHXBZuA3QTREsxIa4gWg6McQTR1ugQNxBtD5EEwdyjChgE0byl1ql0PE8gDCY1VQgTqbLJ1Ft1CKLtTJCoAkFv6DRLFdiMUSWITtN1gU6bowoi8LWDLiBaGUG6soCKmkd0bRWpGoTYjZaRri6lVY8astL1fIJKELISSlJFdxChZZZ0BhFqek1XEKHnGAmCWSqdzj8pSbQSAg+C6SLKss0qcxKXRWnKXRcQyvcddAChxeaLahDa7EARhKpgKX16rZUFSbvC5W8QIDj8ttJeKR/kTXn0nyfew7AWvaLdBAkNxuP9hCBbxyUFgclM3pwgoiAiocJ2C6PdNjm7AIFv5A3EaXdahKltXovXoySiSxDEbTPVKxDEsX6eLOO1ABBFEcakLtSN3eNaCJ7nlT3PS4sPUFgqwxpC4Q1RhUCFRQEYK2Bo3OZ9CuEpRrVa3S4Wi5NUHPV+RMVZ38BD3fw7yqXE7AKsdeLq9fKuVT3GVdkdvuXz+cmZmRmfmNjr4xYbwcShJJAPAqDl2cUJZn9/n6VBPE1aIYS3Gxsbzy3LStD6qA8zol4oLhBQjxFi6255eZkvfWCvSM3Pz7ue593Z2trKMXDQ+lGOA9eJMCZhsCxoaWmJtV0/WSdv2/Z3esJvAK9rtVphdXV1IZ/PZ4eHh/1AEpeyYSrPbs7KuL29PUbDTwBeMRSgqWr+LoB7ALIAHgOYAsCfDtC76kteOOwVAGzUfzrgF4A/tm1/BYC/EPWbUoVzkLYAAAAASUVORK5CYII=";

  public cell: BABYLON.Sprite;

  constructor(scene: BABYLON.Scene, app: App, row, column) {
    this.scene = scene;
    this.app = app;
    this.row = row;
    this.column = column;
    // this.app.width = row * TILE_SIZE;
    // this.app.height = column * TILE_SIZE;

    // init table
    this.data = [];
    for (let i = 0; i < row; i++) {
      this.data[i] = [];
      for (let j = 0; j < column; j++) {
        this.data[i][j] = 0;
      }
    }
    this.scores = 0;
  }

  //    draw (context) {
  //        // draw table
  //        for (let i = 0; i < this.row; i++) {
  //            for (let j = 0; j < this.column; j++) {
  //                context.strokeStyle = '#ccc';
  //                context.strokeRect(
  //                    j * TILE_SIZE + 3,
  //                    i * TILE_SIZE + 3,
  //                    TILE_SIZE - 3,
  //                    TILE_SIZE - 3
  //                );
  //            }
  //        }

  //        // draw tile
  //        for (let i = 0; i < this.row; i++) {
  //            for (let j = 0; j < this.column; j++) {
  //                if (this.data[i][j]) {
  //                    this.data[i][j].draw(context);
  //                }
  //            }
  //        }
  //        if (this.prPiece && this.prPieceRow != -1 && this.prPieceColumn != -1) {
  //            this.prPiece.drawPreview(
  //                context,
  //                this.prPieceRow * TILE_SIZE,
  //                this.prPieceColumn * TILE_SIZE,
  //                this.prPieceCanPut ? 1 : 0
  //            );
  //        }
  //    }

  preview(piece) {
    let pr = Math.round(piece.px / TILE_SIZE);
    let pc = Math.round(piece.py / TILE_SIZE);
    this.prPiece = piece;
    this.prPieceCanPut = this.isCanPut(pr, pc, piece.data);
    this.prPieceRow = pr;
    this.prPieceColumn = pc;
  }

  isCanPut(row, col, data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (
          data[i][j] &&
          (j + row < 0 ||
            i + col < 0 ||
            j + row >= this.row ||
            i + col >= this.column ||
            this.data[row + j][col + i])
        ) {
          return false;
        }
      }
    }
    return true;
  }

  putPiece(piece) {
    let pc = Math.round(piece.px / TILE_SIZE);
    let pr = Math.round(piece.py / TILE_SIZE);
    console.log(piece);
    if (this.isCanPut(pc, pr, piece.data)) {
      for (let i = 0; i < piece.data.length; i++) {
        for (let j = 0; j < piece.data[i].length; j++) {
          if (piece.data[i][j]) {
            let row = pr + i;
            let col = pc + j;
            console.log(row, col);

            piece.tiles[i][j].setPosition(
              col * TILE_SIZE + 25,
              row * TILE_SIZE + 50
            );

            this.data[col][row] = piece.tiles[i][j];
            // console.log(piece.tiles[i][j]);
            this.scores += this.compare(row, col);
          }
        }
      }

      console.log("scores =", this.scores);
      return true;
    }
    return false;
  }

  compare(row, col) {
    // col check
    let emptyTile = false;
    for (let i = 0; i < this.row; i++) {
      if (!this.data[col][i]) {
        emptyTile = true;
        break;
      }
    }
    if (!emptyTile) {
      for (let i = 0; i < this.row; i++) {
        this.data[col][i] = undefined;
      }
      return 1;
    }

    // row check
    emptyTile = false;
    for (let i = 0; i < this.column; i++) {
      if (!this.data[i][row]) {
        emptyTile = true;
        break;
      }
    }
    if (!emptyTile) {
      for (let i = 0; i < this.column; i++) {
        this.data[i][row] = undefined;
      }
      return 1;
    }
    return 0;
  }

  reset() {
    this.prPiece = null;
    this.prPieceRow = -1;
    this.prPieceColumn = -1;
  }
}
