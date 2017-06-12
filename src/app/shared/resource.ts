import {ResourceType} from "./resource-type.enum";

export class Resource {

  private _name: string;
  private _description: string;
  private _pps: number;
  private _id: string;
  private _amount: number;
  private _type: ResourceType;

  constructor(name: string, description: string, pps: number, id: string, amount: number, type: ResourceType) {
    this._name = name;
    this._description = description;
    this._pps = pps;
    this._id = id;
    this._amount = amount;
    this._type = type;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get pps(): number {
    return this._pps;
  }

  set pps(value: number) {
    this._pps = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get type(): ResourceType {
    return this._type;
  }

  set type(value: ResourceType) {
    this._type = value;
  }
}
