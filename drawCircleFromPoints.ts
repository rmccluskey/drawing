import { distanceBetweenPoints } from "./distanceBetweenPoints";
import { drawCircle } from "./drawCircle";
import { Point } from "./point";

export function drawCircleFromPoints(context: CanvasRenderingContext2D, midPoint: Point, edgePoint: Point): void {
    const distance = distanceBetweenPoints(midPoint, edgePoint);
    drawCircle(context, midPoint, distance);
}