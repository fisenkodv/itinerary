import { Action } from '@ngrx/store';

import { Instrument, Point } from '../../models';

export const SET_INSTRUMENT = '[Toolbar] Set instrument';
export const SET_FILL_COLOR = '[Toolbar] Set fill color';
export const SET_STROKE_COLOR = '[Toolbar] Set stroke color';
export const SET_STROKE_WIDTH = '[Toolbar] Set stroke width';
export const CLEAR_ALL = '[Toolbar] Clear all';
export const MOVE_CANVAS = '[Toolbar] Move';
export const ZOOM_CANVAS = '[Toolbar] Zoom';

export class SetInstrumentAction implements Action {
  readonly type = SET_INSTRUMENT;

  constructor(public payload: Instrument) { }
}

export class SetFillColorAction implements Action {
  readonly type = SET_FILL_COLOR;

  constructor(public payload: string) { }
}

export class SetStrokeColorAction implements Action {
  readonly type = SET_STROKE_COLOR;

  constructor(public payload: string) { }
}

export class SetStrokeWidthAction implements Action {
  readonly type = SET_STROKE_WIDTH;

  constructor(public payload: number) { }
}

export class ClearAllAction implements Action {
  readonly type = CLEAR_ALL;
  readonly payload;

  constructor() { }
}

export class MoveCanvasAction implements Action {
  readonly type = MOVE_CANVAS;

  constructor(public payload: Point) { }
}

export class ZoomAction implements Action {
  readonly type = ZOOM_CANVAS;

  constructor(public payload: number) { }
}

export type Actions = SetInstrumentAction
  | SetFillColorAction
  | SetStrokeColorAction
  | SetStrokeWidthAction
  | ClearAllAction
  | MoveCanvasAction
  | ZoomAction;
