import {RemoteEntryModule} from "./app/entry.module";
export * from "./app/entry.module";
import {XsModule, XsModuleLayout} from "@solenopsys/fl-globals";

export const ENTRY: XsModule<RemoteEntryModule> = new XsModuleLayout<RemoteEntryModule>(RemoteEntryModule);

