import { IdGenerator } from "../domain/gateways/IdGenerator";
import uniqid from "uniqid";

export class UniqidIdGenerator implements IdGenerator {
  generate() {
    return uniqid();
  }
}
