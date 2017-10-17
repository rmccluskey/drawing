import { Point } from "./point";

export function drawCircle(context: CanvasRenderingContext2D, point: Point, radius: number) {
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}