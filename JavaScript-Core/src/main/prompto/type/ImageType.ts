import BinaryType from './BinaryType'
import { Identifier } from '../grammar'
import {TypeFamily} from "../store";

export default class ImageType extends BinaryType {

    static instance = new ImageType();

    constructor() {
        super(new Identifier("Image"), TypeFamily.IMAGE);
    }
}
