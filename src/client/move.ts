// import * as BABYLON from "babylonjs";
// import App from "./index";
// // import { Environment } from "./environment";


// export class Move {
//   public scene: BABYLON.Scene;

//   public app: App;
//   // public environment : Environment;


//   constructor(scene: BABYLON.Scene, app: App, /*environment: Environment*/) {
//     this.scene = scene;
//     this.app = app;
//     var startingPoint;
//     var currentMesh;

//     var getGroundPosition = function () {
//       var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
//         // console.log(mesh, environment.background);
        
//         // return mesh == environment.background;
//       });
//         if (pickinfo.hit) {
//             return pickinfo.pickedPoint;
//         }

//         return null;
//     }

//     var pointerDown = function (mesh) {
//       // console.log(mesh);
      
//             currentMesh = mesh;
//       startingPoint = getGroundPosition();
//       // console.log(startingPoint);
      
//             if (startingPoint) { // we need to disconnect camera from canvas
//                 // setTimeout(function () {
//                 //     camera.detachControl(canvas);
//                 // }, 0);
//             }
//     }

//     var pointerUp = function () {
//         if (startingPoint) {
//             // camera.attachControl(canvas, true);
//             startingPoint = null;
//             return;
//         }
//     }

//     var pointerMove = function () {
//       // console.log(startingPoint);
      
//         if (!startingPoint) {
//             return;
//         }
//         var current = getGroundPosition();
//         if (!current) {
//             return;
//         }

//       var diff = current.subtract(startingPoint);
//       console.log(diff);
      
//         currentMesh.position.addInPlace(diff);

//         startingPoint = current;

//     }

//     this.scene.onPointerObservable.add((pointerInfo) => {      		
//         switch (pointerInfo.type) {
// 			case BABYLON.PointerEventTypes.POINTERDOWN:
// 				if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != environment.background) {
//                     pointerDown(pointerInfo.pickInfo.pickedMesh)
//                 }
// 				break;
// 			case BABYLON.PointerEventTypes.POINTERUP:
//                     pointerUp();
// 				break;
// 			case BABYLON.PointerEventTypes.POINTERMOVE:          
//                     pointerMove();
// 				break;
//         }
//     });
//   }
// }