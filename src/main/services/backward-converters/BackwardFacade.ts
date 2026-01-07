import { renameMarks } from './rename-marks';

export class BackwardFacade {
  static processAll() {
    return renameMarks();
  }
}

export default BackwardFacade;
