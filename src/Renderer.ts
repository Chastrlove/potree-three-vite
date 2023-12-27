import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { AmbientLight, PerspectiveCamera, WebGLRenderer } from "three";
import { Potree } from "@/components/potreeCore";
import { SharedGeometry } from "./SharedGeometry";
import { DetailLevel } from "./lod";
import { Axis } from "./Axis";

export class Renderer {
  public camera: THREE.PerspectiveCamera;
  public controls: OrbitControls;
  public gl: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public render = () => {
    this.gl.render(this.scene, this.camera);
  };

  public maxLod = DetailLevel.High;

  public sharedGeometry = new SharedGeometry();

  private canvas: HTMLCanvasElement;

  public potree: Potree = new Potree();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.gl = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
      logarithmicDepthBuffer: false,
      precision: "highp",
      premultipliedAlpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });

    this.scene = new THREE.Scene();
    const gridHelper = new THREE.GridHelper(1000, 20);
    this.scene.add(gridHelper);

    gridHelper.rotateX(Math.PI / 2),
      // const { width, height } = this.getCanvasSize();
      (this.camera = new PerspectiveCamera());

    this.camera.position.set(0, 0, 1000);
    this.camera.up = new THREE.Vector3(0, 0, 1);
    // this.camera.rotation.order = 'ZXY';

    this.gl.setPixelRatio(window.devicePixelRatio);

    const light = new AmbientLight(0xffffff);
    this.scene.add(light);
    const axis = new Axis("axis", this);
    this.scene.add(axis);

    const controls = new OrbitControls(this.camera, this.gl.domElement);
    this.controls = controls;

    // controls.object.rotation.order = "ZXY",
    controls.addEventListener("change", this.render); // use if there is no animation loop
    // controls.minDistance = 0.01;
    // controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
    // controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    // controls.touches.ONE = THREE.TOUCH.PAN;
    // controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    // controls.maxDistance = 1000;
    controls.update();
    // this.gl.setSize(width, height);
  }
}
