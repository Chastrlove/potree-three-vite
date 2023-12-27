import {
  Euler,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  SphereGeometry,
  Vector2,
  Vector3,
} from "three";
import {
  PointCloudOctree,
  PointColorType,
  TURBO,
} from "@/components/potreeCore";
import { Renderer } from "./Renderer";

document.body.onload = function () {
  let pointClouds: PointCloudOctree[] = [];

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0px";
  canvas.style.left = "0px";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  document.body.appendChild(canvas);

  const { gl: webgl, potree, scene, camera, controls } = new Renderer(canvas);

  // const light = new AmbientLight(0xffffff);
  // scene.add(light);
  // const axis = new Axis("axis", this);
  // scene.add(axis);

  // const controls = new OrbitControls(camera, canvas);
  // camera.position.z = 100;

  const raycaster = new Raycaster();

  raycaster.params.Points.threshold = 1e-2;
  const normalized = new Vector2();

  canvas.onmousemove = function (event) {
    normalized.set(
      (event.clientX / canvas.width) * 2 - 1,
      -(event.clientY / canvas.height) * 2 + 1,
    );
    raycaster.setFromCamera(normalized, camera);
  };

  canvas.ondblclick = function () {
    const intesects = raycaster.intersectObject(scene, true);

    if (intesects.length > 0) {
      const geometry = new SphereGeometry(0.2, 32, 32);
      const material = new MeshBasicMaterial({
        color: Math.random() * 0xaa4444,
      });
      const sphere = new Mesh(geometry, material);
      sphere.position.copy(intesects[0].point);
      scene.add(sphere);
    }
  };

  loadPointCloud("/perugia/", "metadata.json");

  function loadPointCloud(
    baseUrl: string,
    url: string,
    position?: Vector3,
    rotation?: Euler,
    scale?: Vector3,
  ) {
    potree
      .loadPointCloud(url, (url) => `${baseUrl}${url}`)
      .then(function (pco: PointCloudOctree) {
        pco.material.size = 0.1;
        pco.material.shape = 1;
        pco.material.inputColorEncoding = 1;
        pco.material.outputColorEncoding = 1;
        pco.material.gradient = TURBO;

        pco.material.pointColorType = PointColorType.INTENSITY_GRADIENT;

        // pco.material.elevationRange = [720, 800];

        if (position) {
          pco.position.copy(position);
        }
        if (rotation) {
          pco.rotation.copy(rotation);
        }
        if (scale) {
          pco.scale.copy(scale);
        }

        console.log("Pointcloud file loaded", pco);
        pco.showBoundingBox = false;

        add(pco);
      });
  }

  function add(pco: PointCloudOctree): void {
    scene.add(pco);
    pointClouds.push(pco);
  }

  function unload(): void {
    pointClouds.forEach((pco) => {
      scene.remove(pco);
      pco.dispose();
    });

    pointClouds = [];
  }

  function loop() {
    potree.updatePointClouds(pointClouds, camera, webgl);

    controls.update();
    webgl.render(scene, camera);

    requestAnimationFrame(loop);
  }

  loop();

  document.body.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;

    webgl.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  // @ts-ignore
  document.body.onresize();
};
