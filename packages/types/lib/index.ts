import type {Method as _Method} from 'axios';
import type {Server} from 'http';
import type {
  Class as _Class,
  ConditionalPick,
  LiteralUnion,
  MultidimensionalReadonlyArray,
} from 'type-fest';
import {ServerArgs} from './config';
import {Capabilities, W3CCapabilities} from './capabilities';
import type {Express} from 'express';
import {ExternalDriver} from './driver';
import type {Logger} from 'npmlog';

export * from './driver';
export * from './plugin';
export {AppiumW3CCapabilities} from './capabilities';
export {AppiumConfig, NormalizedAppiumConfig} from './config';
export * from './appium-config';
export {ServerArgs, Capabilities, W3CCapabilities};

/**
 * A log prefix for {@linkcode AppiumLogger}
 *
 * If a function, the function will return the prefix.  Log messages will be prefixed with this value.
 */
export type AppiumLoggerPrefix = string | (() => string);

/**
 * Possible "log levels" for {@linkcode AppiumLogger}.
 *
 * Extracted from `npmlog`.
 */
export type AppiumLoggerLevel =
  | 'silly'
  | 'verbose'
  | 'debug'
  | 'info'
  | 'http'
  | 'warn'
  | 'error';

/**
 * Describes the `npmlog`-based internal logger.
 *
 * @see https://npm.im/npmlog
 */
export interface AppiumLogger {
  /**
   * Returns the underlying `npmlog` {@link Logger}.
   */
  unwrap(): Logger;
  level: AppiumLoggerLevel;
  levels: AppiumLoggerLevel[];
  /**
   * Log prefix, if applicable.
   */
  prefix?: AppiumLoggerPrefix;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  verbose: (...args: any[]) => void;
  silly: (...args: any[]) => void;
  http: (...args: any[]) => void;
  errorAndThrow: (...args: any[]) => never;
}

/**
 * Appium's slightly-modified {@linkcode Server http.Server}.
 */
export type AppiumServer = Omit<Server, 'close'> & {
  close: () => Promise<void>;
};

/**
 * The definition of an extension method, which will be provided via Appium's API.
 *
 */
export interface Method<T> {
  /**
   * Name of the command.
   */
  command?: keyof ConditionalPick<Required<T>, (...args: any) => Promise<unknown>>;
  /**
   * If true, this `Method` will never proxy.
   */
  neverProxy?: boolean;
  /**
   * Specifies shape of payload
   */
  payloadParams?: PayloadParams;
}

/**
 * Defines the shape of a payload for a {@linkcode Method}.
 */
export interface PayloadParams {
  wrap?: string;
  unwrap?: string;
  required?: Readonly<string[]> | MultidimensionalReadonlyArray<string, 2>;
  optional?: Readonly<string[]> | MultidimensionalReadonlyArray<string, 2>;
  validate?: (obj: any, protocol: string) => boolean | string | undefined;
  makeArgs?: (obj: any) => any;
}
/**
 * A mapping of URL paths to HTTP methods to {@linkcode Method}s.
 *
 * @todo Should use {@linkcode HTTPMethod} here
 */
export type MethodMap<Extension = ExternalDriver> = Record<
  string,
  Record<string, Method<Extension & ExternalDriver>>
>;

/**
 * Wraps {@linkcode _Class `type-fest`'s `Class`} to include static members.
 */
export type Class<
  Proto,
  StaticMembers extends object = {},
  Args extends unknown[] = any[]
> = _Class<Proto, Args> & StaticMembers;

/**
 * The string referring to a "driver"-type extension
 */
export type DriverType = 'driver';

/**
 * The string referring to a "plugin"-type extension
 *
 */
export type PluginType = 'plugin';

/**
 * The strings referring to all extension types.
 */
export type ExtensionType = DriverType | PluginType;

/**
 * The `updateServer` static method of an extension's main class.
 */
export type UpdateServerCallback = (

/**
 * Possible HTTP methods, as stolen from `axios`.
 *
 * @see https://npm.im/axios
 */
export type HTTPMethod = _Method;
