import { difference } from "./difference";
import { Point } from "./point";
import { square } from "./square";

export function distanceBetweenPoints(pointA: Point, pointB: Point): number {
    return Math.sqrt(square(difference(pointA.x, pointB.x)) + square(difference(pointA.y, pointB.y)));
}