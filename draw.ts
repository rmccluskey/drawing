import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/takeUntil";
import { Observable } from "rxjs/Observable";
import { clearCanvas } from "./clearCanvas";
import { drawCircle } from "./drawCircle";
import { drawCircleFromPoints } from "./drawCircleFromPoints";
import { mapEventToPoint } from "./mapEventToPoint";

export class Draw {
    private baseContext: CanvasRenderingContext2D | null;
    private tempContext: CanvasRenderingContext2D | null;

    constructor(host: HTMLElement, baseCanvas: HTMLCanvasElement, tempCanvas: HTMLCanvasElement) {
        this.baseContext = baseCanvas.getContext("2d");
        this.tempContext = tempCanvas.getContext("2d");

        const mousemove = Observable.fromEvent(host, "mousemove")
            .map((event: MouseEvent) => mapEventToPoint(host, event));

        const mouseup = Observable.fromEvent(host, "mouseup")
            .map((event: MouseEvent) => mapEventToPoint(host, event));

        const mousedown = Observable.fromEvent(host, "mousedown")
            .map((event: MouseEvent) => mapEventToPoint(host, event));

        mousedown.subscribe((point) => {
            if (this.tempContext) {
                drawCircle(this.tempContext, point, 2);
            }
        });

        mousedown
            .mergeMap((start) => {
                return mousemove
                    .map((current) => {
                        return {
                            current,
                            start,
                        };
                    })
                    .takeUntil(mouseup);
            }).subscribe(({ current, start }) => {
                if (this.tempContext) {
                    clearCanvas(this.tempContext);
                    drawCircleFromPoints(this.tempContext, start, current);
                }
            });

        mousedown
            .mergeMap((start) => {
                return mouseup
                    .map((current) => {
                        return {
                            current,
                            start,
                        };
                    })
                    .first();
            }).subscribe(({ current, start }) => {
                if (this.tempContext) {
                    clearCanvas(this.tempContext);
                }

                if (this.baseContext) {
                    drawCircleFromPoints(this.baseContext, start, current);
                }
            });
    }

    public clear(): void {
        if (this.baseContext) {
            clearCanvas(this.baseContext);
        }
    }
}