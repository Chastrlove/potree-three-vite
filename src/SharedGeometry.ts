/*
 * Copyright (C) UDEER AI PTE.LTD（2023）
 *
 * All rights reserved.
 *
 * This document contains proprietary information belonging to UDEER AI PTE.LTD.
 * Passing on and copying of this document, and communication of its contents
 * is not permitted without prior written authorization.
 */

import * as THREE from "three";

/**
 * Class for storing a single instance of each geometry to reuse across scene extensions
 * Callers of `getGeometry` will need to specify a unique key from which to extract the
 * singleton geometry.
 */
export class SharedGeometry {
  #geometryMap = new Map<string, THREE.BufferGeometry>();

  /**
   * Get a geometry from the map, or create it if it doesn't exist.
   * Note that this map will not allow overwriting of existing geometries.
   * @param key unique key to identify the geometry
   * @param createGeometry - function to create the geometry if it does not exist
   * @returns - created geometry if it doesn't exist or the existing geometry from the map
   */
  public getGeometry<T extends THREE.BufferGeometry>(key: string, createGeometry: () => T): T {
    let geometry = this.#geometryMap.get(key);
    if (!geometry) {
      geometry = createGeometry();
      this.#geometryMap.set(key, geometry);
    }
    return geometry as T;
  }
  // disposes of all geometries and clears the map
  public dispose(): void {
    for (const geometry of this.#geometryMap.values()) {
      geometry.dispose();
    }
    this.#geometryMap.clear();
  }
}
