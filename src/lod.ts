/*
 * Copyright (C) UDEER AI PTE.LTD（2023）
 *
 * All rights reserved.
 *
 * This document contains proprietary information belonging to UDEER AI PTE.LTD.
 * Passing on and copying of this document, and communication of its contents
 * is not permitted without prior written authorization.
 */

import type { WebGLCapabilities } from "three";

export enum DetailLevel {
  Low,
  Medium,
  High,
}

/** Returns the number of samples used for Multi-Sample Anti-Aliasing (MSAA) */
export function msaaSamples(capabilities: WebGLCapabilities): number {
  // NOTE: Type definition workaround
  return (capabilities as { maxSamples?: number }).maxSamples ?? 0;
}

export function arrowShaftSubdivisions(lod: DetailLevel): number {
  switch (lod) {
    case DetailLevel.Low: {
      return 12;
    }
    case DetailLevel.Medium: {
      return 20;
    }
    case DetailLevel.High: {
      return 32;
    }
  }
}

export function arrowHeadSubdivisions(lod: DetailLevel): number {
  switch (lod) {
    case DetailLevel.Low: {
      return 12;
    }
    case DetailLevel.Medium: {
      return 20;
    }
    case DetailLevel.High: {
      return 32;
    }
  }
}

export function cylinderSubdivisions(lod: DetailLevel): number {
  switch (lod) {
    case DetailLevel.Low: {
      return 12;
    }
    case DetailLevel.Medium: {
      return 20;
    }
    case DetailLevel.High: {
      return 32;
    }
  }
}

export function sphereSubdivisions(lod: DetailLevel): number {
  switch (lod) {
    case DetailLevel.Low: {
      return 10;
    }
    case DetailLevel.Medium: {
      return 24;
    }
    case DetailLevel.High: {
      return 32;
    }
  }
}
