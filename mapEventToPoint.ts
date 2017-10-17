import { Point } from "./point";

export function mapEventToPoint(element: HTMLElement, event: MouseEvent): Point {
        const rect = element.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
}