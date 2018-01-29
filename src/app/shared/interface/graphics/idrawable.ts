import {Context} from "./context";
export interface IDrawable {

  drawDefault(context: Context, p: p5)
  drawHovered(context: Context, p: p5)
  drawSelected(context: Context, p: p5)

}
