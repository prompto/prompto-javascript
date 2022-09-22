import BaseStatement from './BaseStatement'

export default abstract class SimpleStatement extends BaseStatement {

    isSimple() {
        return true;
    }
}

