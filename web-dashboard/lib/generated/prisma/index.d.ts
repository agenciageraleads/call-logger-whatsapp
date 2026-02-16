
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model CallLog
 * 
 */
export type CallLog = $Result.DefaultSelection<Prisma.$CallLogPayload>
/**
 * Model EvolutionInstance
 * 
 */
export type EvolutionInstance = $Result.DefaultSelection<Prisma.$EvolutionInstancePayload>
/**
 * Model DailyMetric
 * 
 */
export type DailyMetric = $Result.DefaultSelection<Prisma.$DailyMetricPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model DailyConversation
 * 
 */
export type DailyConversation = $Result.DefaultSelection<Prisma.$DailyConversationPayload>
/**
 * Model ProcessedMessage
 * 
 */
export type ProcessedMessage = $Result.DefaultSelection<Prisma.$ProcessedMessagePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Devices
 * const devices = await prisma.device.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Devices
   * const devices = await prisma.device.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs>;

  /**
   * `prisma.callLog`: Exposes CRUD operations for the **CallLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallLogs
    * const callLogs = await prisma.callLog.findMany()
    * ```
    */
  get callLog(): Prisma.CallLogDelegate<ExtArgs>;

  /**
   * `prisma.evolutionInstance`: Exposes CRUD operations for the **EvolutionInstance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvolutionInstances
    * const evolutionInstances = await prisma.evolutionInstance.findMany()
    * ```
    */
  get evolutionInstance(): Prisma.EvolutionInstanceDelegate<ExtArgs>;

  /**
   * `prisma.dailyMetric`: Exposes CRUD operations for the **DailyMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyMetrics
    * const dailyMetrics = await prisma.dailyMetric.findMany()
    * ```
    */
  get dailyMetric(): Prisma.DailyMetricDelegate<ExtArgs>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs>;

  /**
   * `prisma.dailyConversation`: Exposes CRUD operations for the **DailyConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyConversations
    * const dailyConversations = await prisma.dailyConversation.findMany()
    * ```
    */
  get dailyConversation(): Prisma.DailyConversationDelegate<ExtArgs>;

  /**
   * `prisma.processedMessage`: Exposes CRUD operations for the **ProcessedMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedMessages
    * const processedMessages = await prisma.processedMessage.findMany()
    * ```
    */
  get processedMessage(): Prisma.ProcessedMessageDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Device: 'Device',
    CallLog: 'CallLog',
    EvolutionInstance: 'EvolutionInstance',
    DailyMetric: 'DailyMetric',
    Contact: 'Contact',
    Lead: 'Lead',
    Note: 'Note',
    DailyConversation: 'DailyConversation',
    ProcessedMessage: 'ProcessedMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "device" | "callLog" | "evolutionInstance" | "dailyMetric" | "contact" | "lead" | "note" | "dailyConversation" | "processedMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      CallLog: {
        payload: Prisma.$CallLogPayload<ExtArgs>
        fields: Prisma.CallLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findFirst: {
            args: Prisma.CallLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          findMany: {
            args: Prisma.CallLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          create: {
            args: Prisma.CallLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          createMany: {
            args: Prisma.CallLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>[]
          }
          delete: {
            args: Prisma.CallLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          update: {
            args: Prisma.CallLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          deleteMany: {
            args: Prisma.CallLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CallLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallLogPayload>
          }
          aggregate: {
            args: Prisma.CallLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallLog>
          }
          groupBy: {
            args: Prisma.CallLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallLogCountArgs<ExtArgs>
            result: $Utils.Optional<CallLogCountAggregateOutputType> | number
          }
        }
      }
      EvolutionInstance: {
        payload: Prisma.$EvolutionInstancePayload<ExtArgs>
        fields: Prisma.EvolutionInstanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvolutionInstanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvolutionInstanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          findFirst: {
            args: Prisma.EvolutionInstanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvolutionInstanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          findMany: {
            args: Prisma.EvolutionInstanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>[]
          }
          create: {
            args: Prisma.EvolutionInstanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          createMany: {
            args: Prisma.EvolutionInstanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvolutionInstanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>[]
          }
          delete: {
            args: Prisma.EvolutionInstanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          update: {
            args: Prisma.EvolutionInstanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          deleteMany: {
            args: Prisma.EvolutionInstanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvolutionInstanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvolutionInstanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvolutionInstancePayload>
          }
          aggregate: {
            args: Prisma.EvolutionInstanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvolutionInstance>
          }
          groupBy: {
            args: Prisma.EvolutionInstanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvolutionInstanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvolutionInstanceCountArgs<ExtArgs>
            result: $Utils.Optional<EvolutionInstanceCountAggregateOutputType> | number
          }
        }
      }
      DailyMetric: {
        payload: Prisma.$DailyMetricPayload<ExtArgs>
        fields: Prisma.DailyMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          findFirst: {
            args: Prisma.DailyMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          findMany: {
            args: Prisma.DailyMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>[]
          }
          create: {
            args: Prisma.DailyMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          createMany: {
            args: Prisma.DailyMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>[]
          }
          delete: {
            args: Prisma.DailyMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          update: {
            args: Prisma.DailyMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          deleteMany: {
            args: Prisma.DailyMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMetricPayload>
          }
          aggregate: {
            args: Prisma.DailyMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyMetric>
          }
          groupBy: {
            args: Prisma.DailyMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyMetricCountArgs<ExtArgs>
            result: $Utils.Optional<DailyMetricCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      DailyConversation: {
        payload: Prisma.$DailyConversationPayload<ExtArgs>
        fields: Prisma.DailyConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          findFirst: {
            args: Prisma.DailyConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          findMany: {
            args: Prisma.DailyConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>[]
          }
          create: {
            args: Prisma.DailyConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          createMany: {
            args: Prisma.DailyConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>[]
          }
          delete: {
            args: Prisma.DailyConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          update: {
            args: Prisma.DailyConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          deleteMany: {
            args: Prisma.DailyConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DailyConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyConversationPayload>
          }
          aggregate: {
            args: Prisma.DailyConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyConversation>
          }
          groupBy: {
            args: Prisma.DailyConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyConversationCountArgs<ExtArgs>
            result: $Utils.Optional<DailyConversationCountAggregateOutputType> | number
          }
        }
      }
      ProcessedMessage: {
        payload: Prisma.$ProcessedMessagePayload<ExtArgs>
        fields: Prisma.ProcessedMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          findFirst: {
            args: Prisma.ProcessedMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          findMany: {
            args: Prisma.ProcessedMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>[]
          }
          create: {
            args: Prisma.ProcessedMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          createMany: {
            args: Prisma.ProcessedMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>[]
          }
          delete: {
            args: Prisma.ProcessedMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          update: {
            args: Prisma.ProcessedMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          deleteMany: {
            args: Prisma.ProcessedMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcessedMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedMessagePayload>
          }
          aggregate: {
            args: Prisma.ProcessedMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedMessage>
          }
          groupBy: {
            args: Prisma.ProcessedMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    calls: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | DeviceCountOutputTypeCountCallsArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
  }


  /**
   * Count Type EvolutionInstanceCountOutputType
   */

  export type EvolutionInstanceCountOutputType = {
    contacts: number
    conversations: number
    metrics: number
    processedMessages: number
  }

  export type EvolutionInstanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | EvolutionInstanceCountOutputTypeCountContactsArgs
    conversations?: boolean | EvolutionInstanceCountOutputTypeCountConversationsArgs
    metrics?: boolean | EvolutionInstanceCountOutputTypeCountMetricsArgs
    processedMessages?: boolean | EvolutionInstanceCountOutputTypeCountProcessedMessagesArgs
  }

  // Custom InputTypes
  /**
   * EvolutionInstanceCountOutputType without action
   */
  export type EvolutionInstanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstanceCountOutputType
     */
    select?: EvolutionInstanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvolutionInstanceCountOutputType without action
   */
  export type EvolutionInstanceCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * EvolutionInstanceCountOutputType without action
   */
  export type EvolutionInstanceCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyConversationWhereInput
  }

  /**
   * EvolutionInstanceCountOutputType without action
   */
  export type EvolutionInstanceCountOutputTypeCountMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMetricWhereInput
  }

  /**
   * EvolutionInstanceCountOutputType without action
   */
  export type EvolutionInstanceCountOutputTypeCountProcessedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedMessageWhereInput
  }


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    notes: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | LeadCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    name: string | null
    lastSeen: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    lastSeen: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    name: number
    lastSeen: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeviceMinAggregateInputType = {
    id?: true
    name?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    name?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    name?: true
    lastSeen?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    name: string | null
    lastSeen: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    calls?: boolean | Device$callsArgs<ExtArgs>
    evolutionInstance?: boolean | Device$evolutionInstanceArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    name?: boolean
    lastSeen?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | Device$callsArgs<ExtArgs>
    evolutionInstance?: boolean | Device$evolutionInstanceArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      calls: Prisma.$CallLogPayload<ExtArgs>[]
      evolutionInstance: Prisma.$EvolutionInstancePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      lastSeen: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calls<T extends Device$callsArgs<ExtArgs> = {}>(args?: Subset<T, Device$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany"> | Null>
    evolutionInstance<T extends Device$evolutionInstanceArgs<ExtArgs> = {}>(args?: Subset<T, Device$evolutionInstanceArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */ 
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly name: FieldRef<"Device", 'String'>
    readonly lastSeen: FieldRef<"Device", 'DateTime'>
    readonly createdAt: FieldRef<"Device", 'DateTime'>
    readonly updatedAt: FieldRef<"Device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
  }

  /**
   * Device.calls
   */
  export type Device$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    cursor?: CallLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * Device.evolutionInstance
   */
  export type Device$evolutionInstanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    where?: EvolutionInstanceWhereInput
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model CallLog
   */

  export type AggregateCallLog = {
    _count: CallLogCountAggregateOutputType | null
    _avg: CallLogAvgAggregateOutputType | null
    _sum: CallLogSumAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  export type CallLogAvgAggregateOutputType = {
    duration: number | null
  }

  export type CallLogSumAggregateOutputType = {
    duration: number | null
  }

  export type CallLogMinAggregateOutputType = {
    id: string | null
    person: string | null
    duration: number | null
    type: string | null
    status: string | null
    timestamp: Date | null
    deviceId: string | null
    createdAt: Date | null
  }

  export type CallLogMaxAggregateOutputType = {
    id: string | null
    person: string | null
    duration: number | null
    type: string | null
    status: string | null
    timestamp: Date | null
    deviceId: string | null
    createdAt: Date | null
  }

  export type CallLogCountAggregateOutputType = {
    id: number
    person: number
    duration: number
    type: number
    status: number
    timestamp: number
    deviceId: number
    createdAt: number
    _all: number
  }


  export type CallLogAvgAggregateInputType = {
    duration?: true
  }

  export type CallLogSumAggregateInputType = {
    duration?: true
  }

  export type CallLogMinAggregateInputType = {
    id?: true
    person?: true
    duration?: true
    type?: true
    status?: true
    timestamp?: true
    deviceId?: true
    createdAt?: true
  }

  export type CallLogMaxAggregateInputType = {
    id?: true
    person?: true
    duration?: true
    type?: true
    status?: true
    timestamp?: true
    deviceId?: true
    createdAt?: true
  }

  export type CallLogCountAggregateInputType = {
    id?: true
    person?: true
    duration?: true
    type?: true
    status?: true
    timestamp?: true
    deviceId?: true
    createdAt?: true
    _all?: true
  }

  export type CallLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLog to aggregate.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallLogs
    **/
    _count?: true | CallLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallLogMaxAggregateInputType
  }

  export type GetCallLogAggregateType<T extends CallLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCallLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallLog[P]>
      : GetScalarType<T[P], AggregateCallLog[P]>
  }




  export type CallLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallLogWhereInput
    orderBy?: CallLogOrderByWithAggregationInput | CallLogOrderByWithAggregationInput[]
    by: CallLogScalarFieldEnum[] | CallLogScalarFieldEnum
    having?: CallLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallLogCountAggregateInputType | true
    _avg?: CallLogAvgAggregateInputType
    _sum?: CallLogSumAggregateInputType
    _min?: CallLogMinAggregateInputType
    _max?: CallLogMaxAggregateInputType
  }

  export type CallLogGroupByOutputType = {
    id: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date
    deviceId: string
    createdAt: Date
    _count: CallLogCountAggregateOutputType | null
    _avg: CallLogAvgAggregateOutputType | null
    _sum: CallLogSumAggregateOutputType | null
    _min: CallLogMinAggregateOutputType | null
    _max: CallLogMaxAggregateOutputType | null
  }

  type GetCallLogGroupByPayload<T extends CallLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallLogGroupByOutputType[P]>
            : GetScalarType<T[P], CallLogGroupByOutputType[P]>
        }
      >
    >


  export type CallLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    person?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    timestamp?: boolean
    deviceId?: boolean
    createdAt?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    person?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    timestamp?: boolean
    deviceId?: boolean
    createdAt?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["callLog"]>

  export type CallLogSelectScalar = {
    id?: boolean
    person?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    timestamp?: boolean
    deviceId?: boolean
    createdAt?: boolean
  }

  export type CallLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type CallLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $CallLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallLog"
    objects: {
      device: Prisma.$DevicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      person: string
      duration: number
      type: string
      status: string
      timestamp: Date
      deviceId: string
      createdAt: Date
    }, ExtArgs["result"]["callLog"]>
    composites: {}
  }

  type CallLogGetPayload<S extends boolean | null | undefined | CallLogDefaultArgs> = $Result.GetResult<Prisma.$CallLogPayload, S>

  type CallLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CallLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CallLogCountAggregateInputType | true
    }

  export interface CallLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallLog'], meta: { name: 'CallLog' } }
    /**
     * Find zero or one CallLog that matches the filter.
     * @param {CallLogFindUniqueArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallLogFindUniqueArgs>(args: SelectSubset<T, CallLogFindUniqueArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CallLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CallLogFindUniqueOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CallLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CallLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallLogFindFirstArgs>(args?: SelectSubset<T, CallLogFindFirstArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CallLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindFirstOrThrowArgs} args - Arguments to find a CallLog
     * @example
     * // Get one CallLog
     * const callLog = await prisma.callLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CallLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CallLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallLogs
     * const callLogs = await prisma.callLog.findMany()
     * 
     * // Get first 10 CallLogs
     * const callLogs = await prisma.callLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callLogWithIdOnly = await prisma.callLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallLogFindManyArgs>(args?: SelectSubset<T, CallLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CallLog.
     * @param {CallLogCreateArgs} args - Arguments to create a CallLog.
     * @example
     * // Create one CallLog
     * const CallLog = await prisma.callLog.create({
     *   data: {
     *     // ... data to create a CallLog
     *   }
     * })
     * 
     */
    create<T extends CallLogCreateArgs>(args: SelectSubset<T, CallLogCreateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CallLogs.
     * @param {CallLogCreateManyArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallLogCreateManyArgs>(args?: SelectSubset<T, CallLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallLogs and returns the data saved in the database.
     * @param {CallLogCreateManyAndReturnArgs} args - Arguments to create many CallLogs.
     * @example
     * // Create many CallLogs
     * const callLog = await prisma.callLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallLogs and only return the `id`
     * const callLogWithIdOnly = await prisma.callLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CallLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CallLog.
     * @param {CallLogDeleteArgs} args - Arguments to delete one CallLog.
     * @example
     * // Delete one CallLog
     * const CallLog = await prisma.callLog.delete({
     *   where: {
     *     // ... filter to delete one CallLog
     *   }
     * })
     * 
     */
    delete<T extends CallLogDeleteArgs>(args: SelectSubset<T, CallLogDeleteArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CallLog.
     * @param {CallLogUpdateArgs} args - Arguments to update one CallLog.
     * @example
     * // Update one CallLog
     * const callLog = await prisma.callLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallLogUpdateArgs>(args: SelectSubset<T, CallLogUpdateArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CallLogs.
     * @param {CallLogDeleteManyArgs} args - Arguments to filter CallLogs to delete.
     * @example
     * // Delete a few CallLogs
     * const { count } = await prisma.callLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallLogDeleteManyArgs>(args?: SelectSubset<T, CallLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallLogs
     * const callLog = await prisma.callLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallLogUpdateManyArgs>(args: SelectSubset<T, CallLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CallLog.
     * @param {CallLogUpsertArgs} args - Arguments to update or create a CallLog.
     * @example
     * // Update or create a CallLog
     * const callLog = await prisma.callLog.upsert({
     *   create: {
     *     // ... data to create a CallLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallLog we want to update
     *   }
     * })
     */
    upsert<T extends CallLogUpsertArgs>(args: SelectSubset<T, CallLogUpsertArgs<ExtArgs>>): Prisma__CallLogClient<$Result.GetResult<Prisma.$CallLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogCountArgs} args - Arguments to filter CallLogs to count.
     * @example
     * // Count the number of CallLogs
     * const count = await prisma.callLog.count({
     *   where: {
     *     // ... the filter for the CallLogs we want to count
     *   }
     * })
    **/
    count<T extends CallLogCountArgs>(
      args?: Subset<T, CallLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallLogAggregateArgs>(args: Subset<T, CallLogAggregateArgs>): Prisma.PrismaPromise<GetCallLogAggregateType<T>>

    /**
     * Group by CallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallLogGroupByArgs['orderBy'] }
        : { orderBy?: CallLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallLog model
   */
  readonly fields: CallLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    device<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallLog model
   */ 
  interface CallLogFieldRefs {
    readonly id: FieldRef<"CallLog", 'String'>
    readonly person: FieldRef<"CallLog", 'String'>
    readonly duration: FieldRef<"CallLog", 'Int'>
    readonly type: FieldRef<"CallLog", 'String'>
    readonly status: FieldRef<"CallLog", 'String'>
    readonly timestamp: FieldRef<"CallLog", 'DateTime'>
    readonly deviceId: FieldRef<"CallLog", 'String'>
    readonly createdAt: FieldRef<"CallLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallLog findUnique
   */
  export type CallLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findUniqueOrThrow
   */
  export type CallLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog findFirst
   */
  export type CallLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findFirstOrThrow
   */
  export type CallLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLog to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallLogs.
     */
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog findMany
   */
  export type CallLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter, which CallLogs to fetch.
     */
    where?: CallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallLogs to fetch.
     */
    orderBy?: CallLogOrderByWithRelationInput | CallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallLogs.
     */
    cursor?: CallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallLogs.
     */
    skip?: number
    distinct?: CallLogScalarFieldEnum | CallLogScalarFieldEnum[]
  }

  /**
   * CallLog create
   */
  export type CallLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CallLog.
     */
    data: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
  }

  /**
   * CallLog createMany
   */
  export type CallLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
  }

  /**
   * CallLog createManyAndReturn
   */
  export type CallLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CallLogs.
     */
    data: CallLogCreateManyInput | CallLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallLog update
   */
  export type CallLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CallLog.
     */
    data: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
    /**
     * Choose, which CallLog to update.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog updateMany
   */
  export type CallLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallLogs.
     */
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyInput>
    /**
     * Filter which CallLogs to update
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog upsert
   */
  export type CallLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CallLog to update in case it exists.
     */
    where: CallLogWhereUniqueInput
    /**
     * In case the CallLog found by the `where` argument doesn't exist, create a new CallLog with this data.
     */
    create: XOR<CallLogCreateInput, CallLogUncheckedCreateInput>
    /**
     * In case the CallLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallLogUpdateInput, CallLogUncheckedUpdateInput>
  }

  /**
   * CallLog delete
   */
  export type CallLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
    /**
     * Filter which CallLog to delete.
     */
    where: CallLogWhereUniqueInput
  }

  /**
   * CallLog deleteMany
   */
  export type CallLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallLogs to delete
     */
    where?: CallLogWhereInput
  }

  /**
   * CallLog without action
   */
  export type CallLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallLog
     */
    select?: CallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallLogInclude<ExtArgs> | null
  }


  /**
   * Model EvolutionInstance
   */

  export type AggregateEvolutionInstance = {
    _count: EvolutionInstanceCountAggregateOutputType | null
    _min: EvolutionInstanceMinAggregateOutputType | null
    _max: EvolutionInstanceMaxAggregateOutputType | null
  }

  export type EvolutionInstanceMinAggregateOutputType = {
    id: string | null
    name: string | null
    instanceId: string | null
    phoneNumber: string | null
    apiKey: string | null
    endpointUrl: string | null
    webhookSecret: string | null
    deviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvolutionInstanceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    instanceId: string | null
    phoneNumber: string | null
    apiKey: string | null
    endpointUrl: string | null
    webhookSecret: string | null
    deviceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvolutionInstanceCountAggregateOutputType = {
    id: number
    name: number
    instanceId: number
    phoneNumber: number
    apiKey: number
    endpointUrl: number
    webhookSecret: number
    deviceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EvolutionInstanceMinAggregateInputType = {
    id?: true
    name?: true
    instanceId?: true
    phoneNumber?: true
    apiKey?: true
    endpointUrl?: true
    webhookSecret?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvolutionInstanceMaxAggregateInputType = {
    id?: true
    name?: true
    instanceId?: true
    phoneNumber?: true
    apiKey?: true
    endpointUrl?: true
    webhookSecret?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvolutionInstanceCountAggregateInputType = {
    id?: true
    name?: true
    instanceId?: true
    phoneNumber?: true
    apiKey?: true
    endpointUrl?: true
    webhookSecret?: true
    deviceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EvolutionInstanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvolutionInstance to aggregate.
     */
    where?: EvolutionInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvolutionInstances to fetch.
     */
    orderBy?: EvolutionInstanceOrderByWithRelationInput | EvolutionInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvolutionInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvolutionInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvolutionInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvolutionInstances
    **/
    _count?: true | EvolutionInstanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvolutionInstanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvolutionInstanceMaxAggregateInputType
  }

  export type GetEvolutionInstanceAggregateType<T extends EvolutionInstanceAggregateArgs> = {
        [P in keyof T & keyof AggregateEvolutionInstance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvolutionInstance[P]>
      : GetScalarType<T[P], AggregateEvolutionInstance[P]>
  }




  export type EvolutionInstanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvolutionInstanceWhereInput
    orderBy?: EvolutionInstanceOrderByWithAggregationInput | EvolutionInstanceOrderByWithAggregationInput[]
    by: EvolutionInstanceScalarFieldEnum[] | EvolutionInstanceScalarFieldEnum
    having?: EvolutionInstanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvolutionInstanceCountAggregateInputType | true
    _min?: EvolutionInstanceMinAggregateInputType
    _max?: EvolutionInstanceMaxAggregateInputType
  }

  export type EvolutionInstanceGroupByOutputType = {
    id: string
    name: string
    instanceId: string
    phoneNumber: string | null
    apiKey: string | null
    endpointUrl: string | null
    webhookSecret: string | null
    deviceId: string | null
    createdAt: Date
    updatedAt: Date
    _count: EvolutionInstanceCountAggregateOutputType | null
    _min: EvolutionInstanceMinAggregateOutputType | null
    _max: EvolutionInstanceMaxAggregateOutputType | null
  }

  type GetEvolutionInstanceGroupByPayload<T extends EvolutionInstanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvolutionInstanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvolutionInstanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvolutionInstanceGroupByOutputType[P]>
            : GetScalarType<T[P], EvolutionInstanceGroupByOutputType[P]>
        }
      >
    >


  export type EvolutionInstanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    instanceId?: boolean
    phoneNumber?: boolean
    apiKey?: boolean
    endpointUrl?: boolean
    webhookSecret?: boolean
    deviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contacts?: boolean | EvolutionInstance$contactsArgs<ExtArgs>
    conversations?: boolean | EvolutionInstance$conversationsArgs<ExtArgs>
    metrics?: boolean | EvolutionInstance$metricsArgs<ExtArgs>
    device?: boolean | EvolutionInstance$deviceArgs<ExtArgs>
    processedMessages?: boolean | EvolutionInstance$processedMessagesArgs<ExtArgs>
    _count?: boolean | EvolutionInstanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evolutionInstance"]>

  export type EvolutionInstanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    instanceId?: boolean
    phoneNumber?: boolean
    apiKey?: boolean
    endpointUrl?: boolean
    webhookSecret?: boolean
    deviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | EvolutionInstance$deviceArgs<ExtArgs>
  }, ExtArgs["result"]["evolutionInstance"]>

  export type EvolutionInstanceSelectScalar = {
    id?: boolean
    name?: boolean
    instanceId?: boolean
    phoneNumber?: boolean
    apiKey?: boolean
    endpointUrl?: boolean
    webhookSecret?: boolean
    deviceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EvolutionInstanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contacts?: boolean | EvolutionInstance$contactsArgs<ExtArgs>
    conversations?: boolean | EvolutionInstance$conversationsArgs<ExtArgs>
    metrics?: boolean | EvolutionInstance$metricsArgs<ExtArgs>
    device?: boolean | EvolutionInstance$deviceArgs<ExtArgs>
    processedMessages?: boolean | EvolutionInstance$processedMessagesArgs<ExtArgs>
    _count?: boolean | EvolutionInstanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EvolutionInstanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | EvolutionInstance$deviceArgs<ExtArgs>
  }

  export type $EvolutionInstancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvolutionInstance"
    objects: {
      contacts: Prisma.$ContactPayload<ExtArgs>[]
      conversations: Prisma.$DailyConversationPayload<ExtArgs>[]
      metrics: Prisma.$DailyMetricPayload<ExtArgs>[]
      device: Prisma.$DevicePayload<ExtArgs> | null
      processedMessages: Prisma.$ProcessedMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      instanceId: string
      phoneNumber: string | null
      apiKey: string | null
      endpointUrl: string | null
      webhookSecret: string | null
      deviceId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["evolutionInstance"]>
    composites: {}
  }

  type EvolutionInstanceGetPayload<S extends boolean | null | undefined | EvolutionInstanceDefaultArgs> = $Result.GetResult<Prisma.$EvolutionInstancePayload, S>

  type EvolutionInstanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EvolutionInstanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EvolutionInstanceCountAggregateInputType | true
    }

  export interface EvolutionInstanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvolutionInstance'], meta: { name: 'EvolutionInstance' } }
    /**
     * Find zero or one EvolutionInstance that matches the filter.
     * @param {EvolutionInstanceFindUniqueArgs} args - Arguments to find a EvolutionInstance
     * @example
     * // Get one EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvolutionInstanceFindUniqueArgs>(args: SelectSubset<T, EvolutionInstanceFindUniqueArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EvolutionInstance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EvolutionInstanceFindUniqueOrThrowArgs} args - Arguments to find a EvolutionInstance
     * @example
     * // Get one EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvolutionInstanceFindUniqueOrThrowArgs>(args: SelectSubset<T, EvolutionInstanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EvolutionInstance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceFindFirstArgs} args - Arguments to find a EvolutionInstance
     * @example
     * // Get one EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvolutionInstanceFindFirstArgs>(args?: SelectSubset<T, EvolutionInstanceFindFirstArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EvolutionInstance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceFindFirstOrThrowArgs} args - Arguments to find a EvolutionInstance
     * @example
     * // Get one EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvolutionInstanceFindFirstOrThrowArgs>(args?: SelectSubset<T, EvolutionInstanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EvolutionInstances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvolutionInstances
     * const evolutionInstances = await prisma.evolutionInstance.findMany()
     * 
     * // Get first 10 EvolutionInstances
     * const evolutionInstances = await prisma.evolutionInstance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evolutionInstanceWithIdOnly = await prisma.evolutionInstance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvolutionInstanceFindManyArgs>(args?: SelectSubset<T, EvolutionInstanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EvolutionInstance.
     * @param {EvolutionInstanceCreateArgs} args - Arguments to create a EvolutionInstance.
     * @example
     * // Create one EvolutionInstance
     * const EvolutionInstance = await prisma.evolutionInstance.create({
     *   data: {
     *     // ... data to create a EvolutionInstance
     *   }
     * })
     * 
     */
    create<T extends EvolutionInstanceCreateArgs>(args: SelectSubset<T, EvolutionInstanceCreateArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EvolutionInstances.
     * @param {EvolutionInstanceCreateManyArgs} args - Arguments to create many EvolutionInstances.
     * @example
     * // Create many EvolutionInstances
     * const evolutionInstance = await prisma.evolutionInstance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvolutionInstanceCreateManyArgs>(args?: SelectSubset<T, EvolutionInstanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EvolutionInstances and returns the data saved in the database.
     * @param {EvolutionInstanceCreateManyAndReturnArgs} args - Arguments to create many EvolutionInstances.
     * @example
     * // Create many EvolutionInstances
     * const evolutionInstance = await prisma.evolutionInstance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EvolutionInstances and only return the `id`
     * const evolutionInstanceWithIdOnly = await prisma.evolutionInstance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvolutionInstanceCreateManyAndReturnArgs>(args?: SelectSubset<T, EvolutionInstanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EvolutionInstance.
     * @param {EvolutionInstanceDeleteArgs} args - Arguments to delete one EvolutionInstance.
     * @example
     * // Delete one EvolutionInstance
     * const EvolutionInstance = await prisma.evolutionInstance.delete({
     *   where: {
     *     // ... filter to delete one EvolutionInstance
     *   }
     * })
     * 
     */
    delete<T extends EvolutionInstanceDeleteArgs>(args: SelectSubset<T, EvolutionInstanceDeleteArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EvolutionInstance.
     * @param {EvolutionInstanceUpdateArgs} args - Arguments to update one EvolutionInstance.
     * @example
     * // Update one EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvolutionInstanceUpdateArgs>(args: SelectSubset<T, EvolutionInstanceUpdateArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EvolutionInstances.
     * @param {EvolutionInstanceDeleteManyArgs} args - Arguments to filter EvolutionInstances to delete.
     * @example
     * // Delete a few EvolutionInstances
     * const { count } = await prisma.evolutionInstance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvolutionInstanceDeleteManyArgs>(args?: SelectSubset<T, EvolutionInstanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvolutionInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvolutionInstances
     * const evolutionInstance = await prisma.evolutionInstance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvolutionInstanceUpdateManyArgs>(args: SelectSubset<T, EvolutionInstanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvolutionInstance.
     * @param {EvolutionInstanceUpsertArgs} args - Arguments to update or create a EvolutionInstance.
     * @example
     * // Update or create a EvolutionInstance
     * const evolutionInstance = await prisma.evolutionInstance.upsert({
     *   create: {
     *     // ... data to create a EvolutionInstance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvolutionInstance we want to update
     *   }
     * })
     */
    upsert<T extends EvolutionInstanceUpsertArgs>(args: SelectSubset<T, EvolutionInstanceUpsertArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EvolutionInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceCountArgs} args - Arguments to filter EvolutionInstances to count.
     * @example
     * // Count the number of EvolutionInstances
     * const count = await prisma.evolutionInstance.count({
     *   where: {
     *     // ... the filter for the EvolutionInstances we want to count
     *   }
     * })
    **/
    count<T extends EvolutionInstanceCountArgs>(
      args?: Subset<T, EvolutionInstanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvolutionInstanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvolutionInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvolutionInstanceAggregateArgs>(args: Subset<T, EvolutionInstanceAggregateArgs>): Prisma.PrismaPromise<GetEvolutionInstanceAggregateType<T>>

    /**
     * Group by EvolutionInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvolutionInstanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvolutionInstanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvolutionInstanceGroupByArgs['orderBy'] }
        : { orderBy?: EvolutionInstanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvolutionInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvolutionInstanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvolutionInstance model
   */
  readonly fields: EvolutionInstanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvolutionInstance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvolutionInstanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contacts<T extends EvolutionInstance$contactsArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstance$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany"> | Null>
    conversations<T extends EvolutionInstance$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstance$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findMany"> | Null>
    metrics<T extends EvolutionInstance$metricsArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstance$metricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findMany"> | Null>
    device<T extends EvolutionInstance$deviceArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstance$deviceArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    processedMessages<T extends EvolutionInstance$processedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstance$processedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvolutionInstance model
   */ 
  interface EvolutionInstanceFieldRefs {
    readonly id: FieldRef<"EvolutionInstance", 'String'>
    readonly name: FieldRef<"EvolutionInstance", 'String'>
    readonly instanceId: FieldRef<"EvolutionInstance", 'String'>
    readonly phoneNumber: FieldRef<"EvolutionInstance", 'String'>
    readonly apiKey: FieldRef<"EvolutionInstance", 'String'>
    readonly endpointUrl: FieldRef<"EvolutionInstance", 'String'>
    readonly webhookSecret: FieldRef<"EvolutionInstance", 'String'>
    readonly deviceId: FieldRef<"EvolutionInstance", 'String'>
    readonly createdAt: FieldRef<"EvolutionInstance", 'DateTime'>
    readonly updatedAt: FieldRef<"EvolutionInstance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EvolutionInstance findUnique
   */
  export type EvolutionInstanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter, which EvolutionInstance to fetch.
     */
    where: EvolutionInstanceWhereUniqueInput
  }

  /**
   * EvolutionInstance findUniqueOrThrow
   */
  export type EvolutionInstanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter, which EvolutionInstance to fetch.
     */
    where: EvolutionInstanceWhereUniqueInput
  }

  /**
   * EvolutionInstance findFirst
   */
  export type EvolutionInstanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter, which EvolutionInstance to fetch.
     */
    where?: EvolutionInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvolutionInstances to fetch.
     */
    orderBy?: EvolutionInstanceOrderByWithRelationInput | EvolutionInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvolutionInstances.
     */
    cursor?: EvolutionInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvolutionInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvolutionInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvolutionInstances.
     */
    distinct?: EvolutionInstanceScalarFieldEnum | EvolutionInstanceScalarFieldEnum[]
  }

  /**
   * EvolutionInstance findFirstOrThrow
   */
  export type EvolutionInstanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter, which EvolutionInstance to fetch.
     */
    where?: EvolutionInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvolutionInstances to fetch.
     */
    orderBy?: EvolutionInstanceOrderByWithRelationInput | EvolutionInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvolutionInstances.
     */
    cursor?: EvolutionInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvolutionInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvolutionInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvolutionInstances.
     */
    distinct?: EvolutionInstanceScalarFieldEnum | EvolutionInstanceScalarFieldEnum[]
  }

  /**
   * EvolutionInstance findMany
   */
  export type EvolutionInstanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter, which EvolutionInstances to fetch.
     */
    where?: EvolutionInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvolutionInstances to fetch.
     */
    orderBy?: EvolutionInstanceOrderByWithRelationInput | EvolutionInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvolutionInstances.
     */
    cursor?: EvolutionInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvolutionInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvolutionInstances.
     */
    skip?: number
    distinct?: EvolutionInstanceScalarFieldEnum | EvolutionInstanceScalarFieldEnum[]
  }

  /**
   * EvolutionInstance create
   */
  export type EvolutionInstanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * The data needed to create a EvolutionInstance.
     */
    data: XOR<EvolutionInstanceCreateInput, EvolutionInstanceUncheckedCreateInput>
  }

  /**
   * EvolutionInstance createMany
   */
  export type EvolutionInstanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvolutionInstances.
     */
    data: EvolutionInstanceCreateManyInput | EvolutionInstanceCreateManyInput[]
  }

  /**
   * EvolutionInstance createManyAndReturn
   */
  export type EvolutionInstanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EvolutionInstances.
     */
    data: EvolutionInstanceCreateManyInput | EvolutionInstanceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EvolutionInstance update
   */
  export type EvolutionInstanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * The data needed to update a EvolutionInstance.
     */
    data: XOR<EvolutionInstanceUpdateInput, EvolutionInstanceUncheckedUpdateInput>
    /**
     * Choose, which EvolutionInstance to update.
     */
    where: EvolutionInstanceWhereUniqueInput
  }

  /**
   * EvolutionInstance updateMany
   */
  export type EvolutionInstanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvolutionInstances.
     */
    data: XOR<EvolutionInstanceUpdateManyMutationInput, EvolutionInstanceUncheckedUpdateManyInput>
    /**
     * Filter which EvolutionInstances to update
     */
    where?: EvolutionInstanceWhereInput
  }

  /**
   * EvolutionInstance upsert
   */
  export type EvolutionInstanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * The filter to search for the EvolutionInstance to update in case it exists.
     */
    where: EvolutionInstanceWhereUniqueInput
    /**
     * In case the EvolutionInstance found by the `where` argument doesn't exist, create a new EvolutionInstance with this data.
     */
    create: XOR<EvolutionInstanceCreateInput, EvolutionInstanceUncheckedCreateInput>
    /**
     * In case the EvolutionInstance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvolutionInstanceUpdateInput, EvolutionInstanceUncheckedUpdateInput>
  }

  /**
   * EvolutionInstance delete
   */
  export type EvolutionInstanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
    /**
     * Filter which EvolutionInstance to delete.
     */
    where: EvolutionInstanceWhereUniqueInput
  }

  /**
   * EvolutionInstance deleteMany
   */
  export type EvolutionInstanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvolutionInstances to delete
     */
    where?: EvolutionInstanceWhereInput
  }

  /**
   * EvolutionInstance.contacts
   */
  export type EvolutionInstance$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * EvolutionInstance.conversations
   */
  export type EvolutionInstance$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    where?: DailyConversationWhereInput
    orderBy?: DailyConversationOrderByWithRelationInput | DailyConversationOrderByWithRelationInput[]
    cursor?: DailyConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyConversationScalarFieldEnum | DailyConversationScalarFieldEnum[]
  }

  /**
   * EvolutionInstance.metrics
   */
  export type EvolutionInstance$metricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    where?: DailyMetricWhereInput
    orderBy?: DailyMetricOrderByWithRelationInput | DailyMetricOrderByWithRelationInput[]
    cursor?: DailyMetricWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyMetricScalarFieldEnum | DailyMetricScalarFieldEnum[]
  }

  /**
   * EvolutionInstance.device
   */
  export type EvolutionInstance$deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
  }

  /**
   * EvolutionInstance.processedMessages
   */
  export type EvolutionInstance$processedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    where?: ProcessedMessageWhereInput
    orderBy?: ProcessedMessageOrderByWithRelationInput | ProcessedMessageOrderByWithRelationInput[]
    cursor?: ProcessedMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcessedMessageScalarFieldEnum | ProcessedMessageScalarFieldEnum[]
  }

  /**
   * EvolutionInstance without action
   */
  export type EvolutionInstanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvolutionInstance
     */
    select?: EvolutionInstanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvolutionInstanceInclude<ExtArgs> | null
  }


  /**
   * Model DailyMetric
   */

  export type AggregateDailyMetric = {
    _count: DailyMetricCountAggregateOutputType | null
    _avg: DailyMetricAvgAggregateOutputType | null
    _sum: DailyMetricSumAggregateOutputType | null
    _min: DailyMetricMinAggregateOutputType | null
    _max: DailyMetricMaxAggregateOutputType | null
  }

  export type DailyMetricAvgAggregateOutputType = {
    activeConversations: number | null
    newContacts: number | null
    messagesSent: number | null
    messagesReceived: number | null
    callsMade: number | null
    callsReceived: number | null
    callDuration: number | null
  }

  export type DailyMetricSumAggregateOutputType = {
    activeConversations: number | null
    newContacts: number | null
    messagesSent: number | null
    messagesReceived: number | null
    callsMade: number | null
    callsReceived: number | null
    callDuration: number | null
  }

  export type DailyMetricMinAggregateOutputType = {
    id: string | null
    date: Date | null
    instanceId: string | null
    activeConversations: number | null
    newContacts: number | null
    messagesSent: number | null
    messagesReceived: number | null
    callsMade: number | null
    callsReceived: number | null
    callDuration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMetricMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    instanceId: string | null
    activeConversations: number | null
    newContacts: number | null
    messagesSent: number | null
    messagesReceived: number | null
    callsMade: number | null
    callsReceived: number | null
    callDuration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMetricCountAggregateOutputType = {
    id: number
    date: number
    instanceId: number
    activeConversations: number
    newContacts: number
    messagesSent: number
    messagesReceived: number
    callsMade: number
    callsReceived: number
    callDuration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyMetricAvgAggregateInputType = {
    activeConversations?: true
    newContacts?: true
    messagesSent?: true
    messagesReceived?: true
    callsMade?: true
    callsReceived?: true
    callDuration?: true
  }

  export type DailyMetricSumAggregateInputType = {
    activeConversations?: true
    newContacts?: true
    messagesSent?: true
    messagesReceived?: true
    callsMade?: true
    callsReceived?: true
    callDuration?: true
  }

  export type DailyMetricMinAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    activeConversations?: true
    newContacts?: true
    messagesSent?: true
    messagesReceived?: true
    callsMade?: true
    callsReceived?: true
    callDuration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMetricMaxAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    activeConversations?: true
    newContacts?: true
    messagesSent?: true
    messagesReceived?: true
    callsMade?: true
    callsReceived?: true
    callDuration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMetricCountAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    activeConversations?: true
    newContacts?: true
    messagesSent?: true
    messagesReceived?: true
    callsMade?: true
    callsReceived?: true
    callDuration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMetric to aggregate.
     */
    where?: DailyMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMetrics to fetch.
     */
    orderBy?: DailyMetricOrderByWithRelationInput | DailyMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyMetrics
    **/
    _count?: true | DailyMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyMetricMaxAggregateInputType
  }

  export type GetDailyMetricAggregateType<T extends DailyMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyMetric[P]>
      : GetScalarType<T[P], AggregateDailyMetric[P]>
  }




  export type DailyMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMetricWhereInput
    orderBy?: DailyMetricOrderByWithAggregationInput | DailyMetricOrderByWithAggregationInput[]
    by: DailyMetricScalarFieldEnum[] | DailyMetricScalarFieldEnum
    having?: DailyMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyMetricCountAggregateInputType | true
    _avg?: DailyMetricAvgAggregateInputType
    _sum?: DailyMetricSumAggregateInputType
    _min?: DailyMetricMinAggregateInputType
    _max?: DailyMetricMaxAggregateInputType
  }

  export type DailyMetricGroupByOutputType = {
    id: string
    date: Date
    instanceId: string
    activeConversations: number
    newContacts: number
    messagesSent: number
    messagesReceived: number
    callsMade: number
    callsReceived: number
    callDuration: number
    createdAt: Date
    updatedAt: Date
    _count: DailyMetricCountAggregateOutputType | null
    _avg: DailyMetricAvgAggregateOutputType | null
    _sum: DailyMetricSumAggregateOutputType | null
    _min: DailyMetricMinAggregateOutputType | null
    _max: DailyMetricMaxAggregateOutputType | null
  }

  type GetDailyMetricGroupByPayload<T extends DailyMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyMetricGroupByOutputType[P]>
            : GetScalarType<T[P], DailyMetricGroupByOutputType[P]>
        }
      >
    >


  export type DailyMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    instanceId?: boolean
    activeConversations?: boolean
    newContacts?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    callsMade?: boolean
    callsReceived?: boolean
    callDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyMetric"]>

  export type DailyMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    instanceId?: boolean
    activeConversations?: boolean
    newContacts?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    callsMade?: boolean
    callsReceived?: boolean
    callDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyMetric"]>

  export type DailyMetricSelectScalar = {
    id?: boolean
    date?: boolean
    instanceId?: boolean
    activeConversations?: boolean
    newContacts?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    callsMade?: boolean
    callsReceived?: boolean
    callDuration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyMetricInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }
  export type DailyMetricIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }

  export type $DailyMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyMetric"
    objects: {
      instance: Prisma.$EvolutionInstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      instanceId: string
      activeConversations: number
      newContacts: number
      messagesSent: number
      messagesReceived: number
      callsMade: number
      callsReceived: number
      callDuration: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyMetric"]>
    composites: {}
  }

  type DailyMetricGetPayload<S extends boolean | null | undefined | DailyMetricDefaultArgs> = $Result.GetResult<Prisma.$DailyMetricPayload, S>

  type DailyMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyMetricFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyMetricCountAggregateInputType | true
    }

  export interface DailyMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyMetric'], meta: { name: 'DailyMetric' } }
    /**
     * Find zero or one DailyMetric that matches the filter.
     * @param {DailyMetricFindUniqueArgs} args - Arguments to find a DailyMetric
     * @example
     * // Get one DailyMetric
     * const dailyMetric = await prisma.dailyMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyMetricFindUniqueArgs>(args: SelectSubset<T, DailyMetricFindUniqueArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyMetric that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyMetricFindUniqueOrThrowArgs} args - Arguments to find a DailyMetric
     * @example
     * // Get one DailyMetric
     * const dailyMetric = await prisma.dailyMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricFindFirstArgs} args - Arguments to find a DailyMetric
     * @example
     * // Get one DailyMetric
     * const dailyMetric = await prisma.dailyMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyMetricFindFirstArgs>(args?: SelectSubset<T, DailyMetricFindFirstArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricFindFirstOrThrowArgs} args - Arguments to find a DailyMetric
     * @example
     * // Get one DailyMetric
     * const dailyMetric = await prisma.dailyMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyMetrics
     * const dailyMetrics = await prisma.dailyMetric.findMany()
     * 
     * // Get first 10 DailyMetrics
     * const dailyMetrics = await prisma.dailyMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyMetricWithIdOnly = await prisma.dailyMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyMetricFindManyArgs>(args?: SelectSubset<T, DailyMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyMetric.
     * @param {DailyMetricCreateArgs} args - Arguments to create a DailyMetric.
     * @example
     * // Create one DailyMetric
     * const DailyMetric = await prisma.dailyMetric.create({
     *   data: {
     *     // ... data to create a DailyMetric
     *   }
     * })
     * 
     */
    create<T extends DailyMetricCreateArgs>(args: SelectSubset<T, DailyMetricCreateArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyMetrics.
     * @param {DailyMetricCreateManyArgs} args - Arguments to create many DailyMetrics.
     * @example
     * // Create many DailyMetrics
     * const dailyMetric = await prisma.dailyMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyMetricCreateManyArgs>(args?: SelectSubset<T, DailyMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyMetrics and returns the data saved in the database.
     * @param {DailyMetricCreateManyAndReturnArgs} args - Arguments to create many DailyMetrics.
     * @example
     * // Create many DailyMetrics
     * const dailyMetric = await prisma.dailyMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyMetrics and only return the `id`
     * const dailyMetricWithIdOnly = await prisma.dailyMetric.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyMetric.
     * @param {DailyMetricDeleteArgs} args - Arguments to delete one DailyMetric.
     * @example
     * // Delete one DailyMetric
     * const DailyMetric = await prisma.dailyMetric.delete({
     *   where: {
     *     // ... filter to delete one DailyMetric
     *   }
     * })
     * 
     */
    delete<T extends DailyMetricDeleteArgs>(args: SelectSubset<T, DailyMetricDeleteArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyMetric.
     * @param {DailyMetricUpdateArgs} args - Arguments to update one DailyMetric.
     * @example
     * // Update one DailyMetric
     * const dailyMetric = await prisma.dailyMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyMetricUpdateArgs>(args: SelectSubset<T, DailyMetricUpdateArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyMetrics.
     * @param {DailyMetricDeleteManyArgs} args - Arguments to filter DailyMetrics to delete.
     * @example
     * // Delete a few DailyMetrics
     * const { count } = await prisma.dailyMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyMetricDeleteManyArgs>(args?: SelectSubset<T, DailyMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyMetrics
     * const dailyMetric = await prisma.dailyMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyMetricUpdateManyArgs>(args: SelectSubset<T, DailyMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyMetric.
     * @param {DailyMetricUpsertArgs} args - Arguments to update or create a DailyMetric.
     * @example
     * // Update or create a DailyMetric
     * const dailyMetric = await prisma.dailyMetric.upsert({
     *   create: {
     *     // ... data to create a DailyMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyMetric we want to update
     *   }
     * })
     */
    upsert<T extends DailyMetricUpsertArgs>(args: SelectSubset<T, DailyMetricUpsertArgs<ExtArgs>>): Prisma__DailyMetricClient<$Result.GetResult<Prisma.$DailyMetricPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricCountArgs} args - Arguments to filter DailyMetrics to count.
     * @example
     * // Count the number of DailyMetrics
     * const count = await prisma.dailyMetric.count({
     *   where: {
     *     // ... the filter for the DailyMetrics we want to count
     *   }
     * })
    **/
    count<T extends DailyMetricCountArgs>(
      args?: Subset<T, DailyMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyMetricAggregateArgs>(args: Subset<T, DailyMetricAggregateArgs>): Prisma.PrismaPromise<GetDailyMetricAggregateType<T>>

    /**
     * Group by DailyMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMetricGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyMetricGroupByArgs['orderBy'] }
        : { orderBy?: DailyMetricGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyMetric model
   */
  readonly fields: DailyMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends EvolutionInstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstanceDefaultArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyMetric model
   */ 
  interface DailyMetricFieldRefs {
    readonly id: FieldRef<"DailyMetric", 'String'>
    readonly date: FieldRef<"DailyMetric", 'DateTime'>
    readonly instanceId: FieldRef<"DailyMetric", 'String'>
    readonly activeConversations: FieldRef<"DailyMetric", 'Int'>
    readonly newContacts: FieldRef<"DailyMetric", 'Int'>
    readonly messagesSent: FieldRef<"DailyMetric", 'Int'>
    readonly messagesReceived: FieldRef<"DailyMetric", 'Int'>
    readonly callsMade: FieldRef<"DailyMetric", 'Int'>
    readonly callsReceived: FieldRef<"DailyMetric", 'Int'>
    readonly callDuration: FieldRef<"DailyMetric", 'Int'>
    readonly createdAt: FieldRef<"DailyMetric", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyMetric", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyMetric findUnique
   */
  export type DailyMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter, which DailyMetric to fetch.
     */
    where: DailyMetricWhereUniqueInput
  }

  /**
   * DailyMetric findUniqueOrThrow
   */
  export type DailyMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter, which DailyMetric to fetch.
     */
    where: DailyMetricWhereUniqueInput
  }

  /**
   * DailyMetric findFirst
   */
  export type DailyMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter, which DailyMetric to fetch.
     */
    where?: DailyMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMetrics to fetch.
     */
    orderBy?: DailyMetricOrderByWithRelationInput | DailyMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMetrics.
     */
    cursor?: DailyMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMetrics.
     */
    distinct?: DailyMetricScalarFieldEnum | DailyMetricScalarFieldEnum[]
  }

  /**
   * DailyMetric findFirstOrThrow
   */
  export type DailyMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter, which DailyMetric to fetch.
     */
    where?: DailyMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMetrics to fetch.
     */
    orderBy?: DailyMetricOrderByWithRelationInput | DailyMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMetrics.
     */
    cursor?: DailyMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMetrics.
     */
    distinct?: DailyMetricScalarFieldEnum | DailyMetricScalarFieldEnum[]
  }

  /**
   * DailyMetric findMany
   */
  export type DailyMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter, which DailyMetrics to fetch.
     */
    where?: DailyMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMetrics to fetch.
     */
    orderBy?: DailyMetricOrderByWithRelationInput | DailyMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyMetrics.
     */
    cursor?: DailyMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMetrics.
     */
    skip?: number
    distinct?: DailyMetricScalarFieldEnum | DailyMetricScalarFieldEnum[]
  }

  /**
   * DailyMetric create
   */
  export type DailyMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyMetric.
     */
    data: XOR<DailyMetricCreateInput, DailyMetricUncheckedCreateInput>
  }

  /**
   * DailyMetric createMany
   */
  export type DailyMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyMetrics.
     */
    data: DailyMetricCreateManyInput | DailyMetricCreateManyInput[]
  }

  /**
   * DailyMetric createManyAndReturn
   */
  export type DailyMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyMetrics.
     */
    data: DailyMetricCreateManyInput | DailyMetricCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyMetric update
   */
  export type DailyMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyMetric.
     */
    data: XOR<DailyMetricUpdateInput, DailyMetricUncheckedUpdateInput>
    /**
     * Choose, which DailyMetric to update.
     */
    where: DailyMetricWhereUniqueInput
  }

  /**
   * DailyMetric updateMany
   */
  export type DailyMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyMetrics.
     */
    data: XOR<DailyMetricUpdateManyMutationInput, DailyMetricUncheckedUpdateManyInput>
    /**
     * Filter which DailyMetrics to update
     */
    where?: DailyMetricWhereInput
  }

  /**
   * DailyMetric upsert
   */
  export type DailyMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyMetric to update in case it exists.
     */
    where: DailyMetricWhereUniqueInput
    /**
     * In case the DailyMetric found by the `where` argument doesn't exist, create a new DailyMetric with this data.
     */
    create: XOR<DailyMetricCreateInput, DailyMetricUncheckedCreateInput>
    /**
     * In case the DailyMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyMetricUpdateInput, DailyMetricUncheckedUpdateInput>
  }

  /**
   * DailyMetric delete
   */
  export type DailyMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
    /**
     * Filter which DailyMetric to delete.
     */
    where: DailyMetricWhereUniqueInput
  }

  /**
   * DailyMetric deleteMany
   */
  export type DailyMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMetrics to delete
     */
    where?: DailyMetricWhereInput
  }

  /**
   * DailyMetric without action
   */
  export type DailyMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMetric
     */
    select?: DailyMetricSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMetricInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    jid: string | null
    firstSeen: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    jid: string | null
    firstSeen: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    instanceId: number
    jid: number
    firstSeen: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    instanceId?: true
    jid?: true
    firstSeen?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    instanceId?: true
    jid?: true
    firstSeen?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    instanceId?: true
    jid?: true
    firstSeen?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    instanceId: string
    jid: string
    firstSeen: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    jid?: boolean
    firstSeen?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
    lead?: boolean | Contact$leadArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    jid?: boolean
    firstSeen?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    instanceId?: boolean
    jid?: boolean
    firstSeen?: boolean
  }

  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
    lead?: boolean | Contact$leadArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      instance: Prisma.$EvolutionInstancePayload<ExtArgs>
      lead: Prisma.$LeadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      jid: string
      firstSeen: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends EvolutionInstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstanceDefaultArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lead<T extends Contact$leadArgs<ExtArgs> = {}>(args?: Subset<T, Contact$leadArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */ 
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly instanceId: FieldRef<"Contact", 'String'>
    readonly jid: FieldRef<"Contact", 'String'>
    readonly firstSeen: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
  }

  /**
   * Contact.lead
   */
  export type Contact$leadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    score: number | null
  }

  export type LeadSumAggregateOutputType = {
    score: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    contactId: string | null
    status: string | null
    score: number | null
    contextSummary: string | null
    lastInteraction: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    contactId: string | null
    status: string | null
    score: number | null
    contextSummary: string | null
    lastInteraction: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    contactId: number
    status: number
    score: number
    contextSummary: number
    lastInteraction: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    score?: true
  }

  export type LeadSumAggregateInputType = {
    score?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    contactId?: true
    status?: true
    score?: true
    contextSummary?: true
    lastInteraction?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    contactId?: true
    status?: true
    score?: true
    contextSummary?: true
    lastInteraction?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    contactId?: true
    status?: true
    score?: true
    contextSummary?: true
    lastInteraction?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    contactId: string
    status: string
    score: number
    contextSummary: string | null
    lastInteraction: Date
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contactId?: boolean
    status?: boolean
    score?: boolean
    contextSummary?: boolean
    lastInteraction?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contact?: boolean | ContactDefaultArgs<ExtArgs>
    notes?: boolean | Lead$notesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contactId?: boolean
    status?: boolean
    score?: boolean
    contextSummary?: boolean
    lastInteraction?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contact?: boolean | ContactDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    contactId?: boolean
    status?: boolean
    score?: boolean
    contextSummary?: boolean
    lastInteraction?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | ContactDefaultArgs<ExtArgs>
    notes?: boolean | Lead$notesArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contact?: boolean | ContactDefaultArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      contact: Prisma.$ContactPayload<ExtArgs>
      notes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contactId: string
      status: string
      score: number
      contextSummary: string | null
      lastInteraction: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contact<T extends ContactDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContactDefaultArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    notes<T extends Lead$notesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */ 
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly contactId: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly score: FieldRef<"Lead", 'Int'>
    readonly contextSummary: FieldRef<"Lead", 'String'>
    readonly lastInteraction: FieldRef<"Lead", 'DateTime'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
  }

  /**
   * Lead.notes
   */
  export type Lead$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    leadId: number
    content: number
    createdAt: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    leadId?: true
    content?: true
    createdAt?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    leadId?: true
    content?: true
    createdAt?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    leadId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    leadId: string
    content: string
    createdAt: Date
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    content?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    content?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    leadId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */ 
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly leadId: FieldRef<"Note", 'String'>
    readonly content: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model DailyConversation
   */

  export type AggregateDailyConversation = {
    _count: DailyConversationCountAggregateOutputType | null
    _min: DailyConversationMinAggregateOutputType | null
    _max: DailyConversationMaxAggregateOutputType | null
  }

  export type DailyConversationMinAggregateOutputType = {
    id: string | null
    date: Date | null
    instanceId: string | null
    jid: string | null
    createdAt: Date | null
  }

  export type DailyConversationMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    instanceId: string | null
    jid: string | null
    createdAt: Date | null
  }

  export type DailyConversationCountAggregateOutputType = {
    id: number
    date: number
    instanceId: number
    jid: number
    createdAt: number
    _all: number
  }


  export type DailyConversationMinAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    jid?: true
    createdAt?: true
  }

  export type DailyConversationMaxAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    jid?: true
    createdAt?: true
  }

  export type DailyConversationCountAggregateInputType = {
    id?: true
    date?: true
    instanceId?: true
    jid?: true
    createdAt?: true
    _all?: true
  }

  export type DailyConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyConversation to aggregate.
     */
    where?: DailyConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyConversations to fetch.
     */
    orderBy?: DailyConversationOrderByWithRelationInput | DailyConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyConversations
    **/
    _count?: true | DailyConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyConversationMaxAggregateInputType
  }

  export type GetDailyConversationAggregateType<T extends DailyConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyConversation[P]>
      : GetScalarType<T[P], AggregateDailyConversation[P]>
  }




  export type DailyConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyConversationWhereInput
    orderBy?: DailyConversationOrderByWithAggregationInput | DailyConversationOrderByWithAggregationInput[]
    by: DailyConversationScalarFieldEnum[] | DailyConversationScalarFieldEnum
    having?: DailyConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyConversationCountAggregateInputType | true
    _min?: DailyConversationMinAggregateInputType
    _max?: DailyConversationMaxAggregateInputType
  }

  export type DailyConversationGroupByOutputType = {
    id: string
    date: Date
    instanceId: string
    jid: string
    createdAt: Date
    _count: DailyConversationCountAggregateOutputType | null
    _min: DailyConversationMinAggregateOutputType | null
    _max: DailyConversationMaxAggregateOutputType | null
  }

  type GetDailyConversationGroupByPayload<T extends DailyConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyConversationGroupByOutputType[P]>
            : GetScalarType<T[P], DailyConversationGroupByOutputType[P]>
        }
      >
    >


  export type DailyConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    instanceId?: boolean
    jid?: boolean
    createdAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyConversation"]>

  export type DailyConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    instanceId?: boolean
    jid?: boolean
    createdAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyConversation"]>

  export type DailyConversationSelectScalar = {
    id?: boolean
    date?: boolean
    instanceId?: boolean
    jid?: boolean
    createdAt?: boolean
  }

  export type DailyConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }
  export type DailyConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }

  export type $DailyConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyConversation"
    objects: {
      instance: Prisma.$EvolutionInstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      instanceId: string
      jid: string
      createdAt: Date
    }, ExtArgs["result"]["dailyConversation"]>
    composites: {}
  }

  type DailyConversationGetPayload<S extends boolean | null | undefined | DailyConversationDefaultArgs> = $Result.GetResult<Prisma.$DailyConversationPayload, S>

  type DailyConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DailyConversationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DailyConversationCountAggregateInputType | true
    }

  export interface DailyConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyConversation'], meta: { name: 'DailyConversation' } }
    /**
     * Find zero or one DailyConversation that matches the filter.
     * @param {DailyConversationFindUniqueArgs} args - Arguments to find a DailyConversation
     * @example
     * // Get one DailyConversation
     * const dailyConversation = await prisma.dailyConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyConversationFindUniqueArgs>(args: SelectSubset<T, DailyConversationFindUniqueArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DailyConversation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DailyConversationFindUniqueOrThrowArgs} args - Arguments to find a DailyConversation
     * @example
     * // Get one DailyConversation
     * const dailyConversation = await prisma.dailyConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DailyConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationFindFirstArgs} args - Arguments to find a DailyConversation
     * @example
     * // Get one DailyConversation
     * const dailyConversation = await prisma.dailyConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyConversationFindFirstArgs>(args?: SelectSubset<T, DailyConversationFindFirstArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DailyConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationFindFirstOrThrowArgs} args - Arguments to find a DailyConversation
     * @example
     * // Get one DailyConversation
     * const dailyConversation = await prisma.dailyConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DailyConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyConversations
     * const dailyConversations = await prisma.dailyConversation.findMany()
     * 
     * // Get first 10 DailyConversations
     * const dailyConversations = await prisma.dailyConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyConversationWithIdOnly = await prisma.dailyConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyConversationFindManyArgs>(args?: SelectSubset<T, DailyConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DailyConversation.
     * @param {DailyConversationCreateArgs} args - Arguments to create a DailyConversation.
     * @example
     * // Create one DailyConversation
     * const DailyConversation = await prisma.dailyConversation.create({
     *   data: {
     *     // ... data to create a DailyConversation
     *   }
     * })
     * 
     */
    create<T extends DailyConversationCreateArgs>(args: SelectSubset<T, DailyConversationCreateArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DailyConversations.
     * @param {DailyConversationCreateManyArgs} args - Arguments to create many DailyConversations.
     * @example
     * // Create many DailyConversations
     * const dailyConversation = await prisma.dailyConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyConversationCreateManyArgs>(args?: SelectSubset<T, DailyConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyConversations and returns the data saved in the database.
     * @param {DailyConversationCreateManyAndReturnArgs} args - Arguments to create many DailyConversations.
     * @example
     * // Create many DailyConversations
     * const dailyConversation = await prisma.dailyConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyConversations and only return the `id`
     * const dailyConversationWithIdOnly = await prisma.dailyConversation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DailyConversation.
     * @param {DailyConversationDeleteArgs} args - Arguments to delete one DailyConversation.
     * @example
     * // Delete one DailyConversation
     * const DailyConversation = await prisma.dailyConversation.delete({
     *   where: {
     *     // ... filter to delete one DailyConversation
     *   }
     * })
     * 
     */
    delete<T extends DailyConversationDeleteArgs>(args: SelectSubset<T, DailyConversationDeleteArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DailyConversation.
     * @param {DailyConversationUpdateArgs} args - Arguments to update one DailyConversation.
     * @example
     * // Update one DailyConversation
     * const dailyConversation = await prisma.dailyConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyConversationUpdateArgs>(args: SelectSubset<T, DailyConversationUpdateArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DailyConversations.
     * @param {DailyConversationDeleteManyArgs} args - Arguments to filter DailyConversations to delete.
     * @example
     * // Delete a few DailyConversations
     * const { count } = await prisma.dailyConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyConversationDeleteManyArgs>(args?: SelectSubset<T, DailyConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyConversations
     * const dailyConversation = await prisma.dailyConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyConversationUpdateManyArgs>(args: SelectSubset<T, DailyConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DailyConversation.
     * @param {DailyConversationUpsertArgs} args - Arguments to update or create a DailyConversation.
     * @example
     * // Update or create a DailyConversation
     * const dailyConversation = await prisma.dailyConversation.upsert({
     *   create: {
     *     // ... data to create a DailyConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyConversation we want to update
     *   }
     * })
     */
    upsert<T extends DailyConversationUpsertArgs>(args: SelectSubset<T, DailyConversationUpsertArgs<ExtArgs>>): Prisma__DailyConversationClient<$Result.GetResult<Prisma.$DailyConversationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DailyConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationCountArgs} args - Arguments to filter DailyConversations to count.
     * @example
     * // Count the number of DailyConversations
     * const count = await prisma.dailyConversation.count({
     *   where: {
     *     // ... the filter for the DailyConversations we want to count
     *   }
     * })
    **/
    count<T extends DailyConversationCountArgs>(
      args?: Subset<T, DailyConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyConversationAggregateArgs>(args: Subset<T, DailyConversationAggregateArgs>): Prisma.PrismaPromise<GetDailyConversationAggregateType<T>>

    /**
     * Group by DailyConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyConversationGroupByArgs['orderBy'] }
        : { orderBy?: DailyConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyConversation model
   */
  readonly fields: DailyConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends EvolutionInstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstanceDefaultArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyConversation model
   */ 
  interface DailyConversationFieldRefs {
    readonly id: FieldRef<"DailyConversation", 'String'>
    readonly date: FieldRef<"DailyConversation", 'DateTime'>
    readonly instanceId: FieldRef<"DailyConversation", 'String'>
    readonly jid: FieldRef<"DailyConversation", 'String'>
    readonly createdAt: FieldRef<"DailyConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyConversation findUnique
   */
  export type DailyConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter, which DailyConversation to fetch.
     */
    where: DailyConversationWhereUniqueInput
  }

  /**
   * DailyConversation findUniqueOrThrow
   */
  export type DailyConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter, which DailyConversation to fetch.
     */
    where: DailyConversationWhereUniqueInput
  }

  /**
   * DailyConversation findFirst
   */
  export type DailyConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter, which DailyConversation to fetch.
     */
    where?: DailyConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyConversations to fetch.
     */
    orderBy?: DailyConversationOrderByWithRelationInput | DailyConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyConversations.
     */
    cursor?: DailyConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyConversations.
     */
    distinct?: DailyConversationScalarFieldEnum | DailyConversationScalarFieldEnum[]
  }

  /**
   * DailyConversation findFirstOrThrow
   */
  export type DailyConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter, which DailyConversation to fetch.
     */
    where?: DailyConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyConversations to fetch.
     */
    orderBy?: DailyConversationOrderByWithRelationInput | DailyConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyConversations.
     */
    cursor?: DailyConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyConversations.
     */
    distinct?: DailyConversationScalarFieldEnum | DailyConversationScalarFieldEnum[]
  }

  /**
   * DailyConversation findMany
   */
  export type DailyConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter, which DailyConversations to fetch.
     */
    where?: DailyConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyConversations to fetch.
     */
    orderBy?: DailyConversationOrderByWithRelationInput | DailyConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyConversations.
     */
    cursor?: DailyConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyConversations.
     */
    skip?: number
    distinct?: DailyConversationScalarFieldEnum | DailyConversationScalarFieldEnum[]
  }

  /**
   * DailyConversation create
   */
  export type DailyConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyConversation.
     */
    data: XOR<DailyConversationCreateInput, DailyConversationUncheckedCreateInput>
  }

  /**
   * DailyConversation createMany
   */
  export type DailyConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyConversations.
     */
    data: DailyConversationCreateManyInput | DailyConversationCreateManyInput[]
  }

  /**
   * DailyConversation createManyAndReturn
   */
  export type DailyConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DailyConversations.
     */
    data: DailyConversationCreateManyInput | DailyConversationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyConversation update
   */
  export type DailyConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyConversation.
     */
    data: XOR<DailyConversationUpdateInput, DailyConversationUncheckedUpdateInput>
    /**
     * Choose, which DailyConversation to update.
     */
    where: DailyConversationWhereUniqueInput
  }

  /**
   * DailyConversation updateMany
   */
  export type DailyConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyConversations.
     */
    data: XOR<DailyConversationUpdateManyMutationInput, DailyConversationUncheckedUpdateManyInput>
    /**
     * Filter which DailyConversations to update
     */
    where?: DailyConversationWhereInput
  }

  /**
   * DailyConversation upsert
   */
  export type DailyConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyConversation to update in case it exists.
     */
    where: DailyConversationWhereUniqueInput
    /**
     * In case the DailyConversation found by the `where` argument doesn't exist, create a new DailyConversation with this data.
     */
    create: XOR<DailyConversationCreateInput, DailyConversationUncheckedCreateInput>
    /**
     * In case the DailyConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyConversationUpdateInput, DailyConversationUncheckedUpdateInput>
  }

  /**
   * DailyConversation delete
   */
  export type DailyConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
    /**
     * Filter which DailyConversation to delete.
     */
    where: DailyConversationWhereUniqueInput
  }

  /**
   * DailyConversation deleteMany
   */
  export type DailyConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyConversations to delete
     */
    where?: DailyConversationWhereInput
  }

  /**
   * DailyConversation without action
   */
  export type DailyConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyConversation
     */
    select?: DailyConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyConversationInclude<ExtArgs> | null
  }


  /**
   * Model ProcessedMessage
   */

  export type AggregateProcessedMessage = {
    _count: ProcessedMessageCountAggregateOutputType | null
    _min: ProcessedMessageMinAggregateOutputType | null
    _max: ProcessedMessageMaxAggregateOutputType | null
  }

  export type ProcessedMessageMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    messageId: string | null
    jid: string | null
    direction: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type ProcessedMessageMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    messageId: string | null
    jid: string | null
    direction: string | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type ProcessedMessageCountAggregateOutputType = {
    id: number
    instanceId: number
    messageId: number
    jid: number
    direction: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type ProcessedMessageMinAggregateInputType = {
    id?: true
    instanceId?: true
    messageId?: true
    jid?: true
    direction?: true
    timestamp?: true
    createdAt?: true
  }

  export type ProcessedMessageMaxAggregateInputType = {
    id?: true
    instanceId?: true
    messageId?: true
    jid?: true
    direction?: true
    timestamp?: true
    createdAt?: true
  }

  export type ProcessedMessageCountAggregateInputType = {
    id?: true
    instanceId?: true
    messageId?: true
    jid?: true
    direction?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type ProcessedMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedMessage to aggregate.
     */
    where?: ProcessedMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedMessages to fetch.
     */
    orderBy?: ProcessedMessageOrderByWithRelationInput | ProcessedMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedMessages
    **/
    _count?: true | ProcessedMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedMessageMaxAggregateInputType
  }

  export type GetProcessedMessageAggregateType<T extends ProcessedMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedMessage[P]>
      : GetScalarType<T[P], AggregateProcessedMessage[P]>
  }




  export type ProcessedMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedMessageWhereInput
    orderBy?: ProcessedMessageOrderByWithAggregationInput | ProcessedMessageOrderByWithAggregationInput[]
    by: ProcessedMessageScalarFieldEnum[] | ProcessedMessageScalarFieldEnum
    having?: ProcessedMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedMessageCountAggregateInputType | true
    _min?: ProcessedMessageMinAggregateInputType
    _max?: ProcessedMessageMaxAggregateInputType
  }

  export type ProcessedMessageGroupByOutputType = {
    id: string
    instanceId: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date
    createdAt: Date
    _count: ProcessedMessageCountAggregateOutputType | null
    _min: ProcessedMessageMinAggregateOutputType | null
    _max: ProcessedMessageMaxAggregateOutputType | null
  }

  type GetProcessedMessageGroupByPayload<T extends ProcessedMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedMessageGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    messageId?: boolean
    jid?: boolean
    direction?: boolean
    timestamp?: boolean
    createdAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processedMessage"]>

  export type ProcessedMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    messageId?: boolean
    jid?: boolean
    direction?: boolean
    timestamp?: boolean
    createdAt?: boolean
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processedMessage"]>

  export type ProcessedMessageSelectScalar = {
    id?: boolean
    instanceId?: boolean
    messageId?: boolean
    jid?: boolean
    direction?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type ProcessedMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }
  export type ProcessedMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | EvolutionInstanceDefaultArgs<ExtArgs>
  }

  export type $ProcessedMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedMessage"
    objects: {
      instance: Prisma.$EvolutionInstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      messageId: string
      jid: string
      direction: string
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["processedMessage"]>
    composites: {}
  }

  type ProcessedMessageGetPayload<S extends boolean | null | undefined | ProcessedMessageDefaultArgs> = $Result.GetResult<Prisma.$ProcessedMessagePayload, S>

  type ProcessedMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProcessedMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProcessedMessageCountAggregateInputType | true
    }

  export interface ProcessedMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedMessage'], meta: { name: 'ProcessedMessage' } }
    /**
     * Find zero or one ProcessedMessage that matches the filter.
     * @param {ProcessedMessageFindUniqueArgs} args - Arguments to find a ProcessedMessage
     * @example
     * // Get one ProcessedMessage
     * const processedMessage = await prisma.processedMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedMessageFindUniqueArgs>(args: SelectSubset<T, ProcessedMessageFindUniqueArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProcessedMessage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProcessedMessageFindUniqueOrThrowArgs} args - Arguments to find a ProcessedMessage
     * @example
     * // Get one ProcessedMessage
     * const processedMessage = await prisma.processedMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProcessedMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageFindFirstArgs} args - Arguments to find a ProcessedMessage
     * @example
     * // Get one ProcessedMessage
     * const processedMessage = await prisma.processedMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedMessageFindFirstArgs>(args?: SelectSubset<T, ProcessedMessageFindFirstArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProcessedMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageFindFirstOrThrowArgs} args - Arguments to find a ProcessedMessage
     * @example
     * // Get one ProcessedMessage
     * const processedMessage = await prisma.processedMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProcessedMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedMessages
     * const processedMessages = await prisma.processedMessage.findMany()
     * 
     * // Get first 10 ProcessedMessages
     * const processedMessages = await prisma.processedMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedMessageWithIdOnly = await prisma.processedMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedMessageFindManyArgs>(args?: SelectSubset<T, ProcessedMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProcessedMessage.
     * @param {ProcessedMessageCreateArgs} args - Arguments to create a ProcessedMessage.
     * @example
     * // Create one ProcessedMessage
     * const ProcessedMessage = await prisma.processedMessage.create({
     *   data: {
     *     // ... data to create a ProcessedMessage
     *   }
     * })
     * 
     */
    create<T extends ProcessedMessageCreateArgs>(args: SelectSubset<T, ProcessedMessageCreateArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProcessedMessages.
     * @param {ProcessedMessageCreateManyArgs} args - Arguments to create many ProcessedMessages.
     * @example
     * // Create many ProcessedMessages
     * const processedMessage = await prisma.processedMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedMessageCreateManyArgs>(args?: SelectSubset<T, ProcessedMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedMessages and returns the data saved in the database.
     * @param {ProcessedMessageCreateManyAndReturnArgs} args - Arguments to create many ProcessedMessages.
     * @example
     * // Create many ProcessedMessages
     * const processedMessage = await prisma.processedMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedMessages and only return the `id`
     * const processedMessageWithIdOnly = await prisma.processedMessage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProcessedMessage.
     * @param {ProcessedMessageDeleteArgs} args - Arguments to delete one ProcessedMessage.
     * @example
     * // Delete one ProcessedMessage
     * const ProcessedMessage = await prisma.processedMessage.delete({
     *   where: {
     *     // ... filter to delete one ProcessedMessage
     *   }
     * })
     * 
     */
    delete<T extends ProcessedMessageDeleteArgs>(args: SelectSubset<T, ProcessedMessageDeleteArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProcessedMessage.
     * @param {ProcessedMessageUpdateArgs} args - Arguments to update one ProcessedMessage.
     * @example
     * // Update one ProcessedMessage
     * const processedMessage = await prisma.processedMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedMessageUpdateArgs>(args: SelectSubset<T, ProcessedMessageUpdateArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProcessedMessages.
     * @param {ProcessedMessageDeleteManyArgs} args - Arguments to filter ProcessedMessages to delete.
     * @example
     * // Delete a few ProcessedMessages
     * const { count } = await prisma.processedMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedMessageDeleteManyArgs>(args?: SelectSubset<T, ProcessedMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedMessages
     * const processedMessage = await prisma.processedMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedMessageUpdateManyArgs>(args: SelectSubset<T, ProcessedMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProcessedMessage.
     * @param {ProcessedMessageUpsertArgs} args - Arguments to update or create a ProcessedMessage.
     * @example
     * // Update or create a ProcessedMessage
     * const processedMessage = await prisma.processedMessage.upsert({
     *   create: {
     *     // ... data to create a ProcessedMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedMessage we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedMessageUpsertArgs>(args: SelectSubset<T, ProcessedMessageUpsertArgs<ExtArgs>>): Prisma__ProcessedMessageClient<$Result.GetResult<Prisma.$ProcessedMessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProcessedMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageCountArgs} args - Arguments to filter ProcessedMessages to count.
     * @example
     * // Count the number of ProcessedMessages
     * const count = await prisma.processedMessage.count({
     *   where: {
     *     // ... the filter for the ProcessedMessages we want to count
     *   }
     * })
    **/
    count<T extends ProcessedMessageCountArgs>(
      args?: Subset<T, ProcessedMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedMessageAggregateArgs>(args: Subset<T, ProcessedMessageAggregateArgs>): Prisma.PrismaPromise<GetProcessedMessageAggregateType<T>>

    /**
     * Group by ProcessedMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedMessageGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedMessage model
   */
  readonly fields: ProcessedMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends EvolutionInstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvolutionInstanceDefaultArgs<ExtArgs>>): Prisma__EvolutionInstanceClient<$Result.GetResult<Prisma.$EvolutionInstancePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedMessage model
   */ 
  interface ProcessedMessageFieldRefs {
    readonly id: FieldRef<"ProcessedMessage", 'String'>
    readonly instanceId: FieldRef<"ProcessedMessage", 'String'>
    readonly messageId: FieldRef<"ProcessedMessage", 'String'>
    readonly jid: FieldRef<"ProcessedMessage", 'String'>
    readonly direction: FieldRef<"ProcessedMessage", 'String'>
    readonly timestamp: FieldRef<"ProcessedMessage", 'DateTime'>
    readonly createdAt: FieldRef<"ProcessedMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedMessage findUnique
   */
  export type ProcessedMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedMessage to fetch.
     */
    where: ProcessedMessageWhereUniqueInput
  }

  /**
   * ProcessedMessage findUniqueOrThrow
   */
  export type ProcessedMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedMessage to fetch.
     */
    where: ProcessedMessageWhereUniqueInput
  }

  /**
   * ProcessedMessage findFirst
   */
  export type ProcessedMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedMessage to fetch.
     */
    where?: ProcessedMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedMessages to fetch.
     */
    orderBy?: ProcessedMessageOrderByWithRelationInput | ProcessedMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedMessages.
     */
    cursor?: ProcessedMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedMessages.
     */
    distinct?: ProcessedMessageScalarFieldEnum | ProcessedMessageScalarFieldEnum[]
  }

  /**
   * ProcessedMessage findFirstOrThrow
   */
  export type ProcessedMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedMessage to fetch.
     */
    where?: ProcessedMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedMessages to fetch.
     */
    orderBy?: ProcessedMessageOrderByWithRelationInput | ProcessedMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedMessages.
     */
    cursor?: ProcessedMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedMessages.
     */
    distinct?: ProcessedMessageScalarFieldEnum | ProcessedMessageScalarFieldEnum[]
  }

  /**
   * ProcessedMessage findMany
   */
  export type ProcessedMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedMessages to fetch.
     */
    where?: ProcessedMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedMessages to fetch.
     */
    orderBy?: ProcessedMessageOrderByWithRelationInput | ProcessedMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedMessages.
     */
    cursor?: ProcessedMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedMessages.
     */
    skip?: number
    distinct?: ProcessedMessageScalarFieldEnum | ProcessedMessageScalarFieldEnum[]
  }

  /**
   * ProcessedMessage create
   */
  export type ProcessedMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessedMessage.
     */
    data: XOR<ProcessedMessageCreateInput, ProcessedMessageUncheckedCreateInput>
  }

  /**
   * ProcessedMessage createMany
   */
  export type ProcessedMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedMessages.
     */
    data: ProcessedMessageCreateManyInput | ProcessedMessageCreateManyInput[]
  }

  /**
   * ProcessedMessage createManyAndReturn
   */
  export type ProcessedMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProcessedMessages.
     */
    data: ProcessedMessageCreateManyInput | ProcessedMessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessedMessage update
   */
  export type ProcessedMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessedMessage.
     */
    data: XOR<ProcessedMessageUpdateInput, ProcessedMessageUncheckedUpdateInput>
    /**
     * Choose, which ProcessedMessage to update.
     */
    where: ProcessedMessageWhereUniqueInput
  }

  /**
   * ProcessedMessage updateMany
   */
  export type ProcessedMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedMessages.
     */
    data: XOR<ProcessedMessageUpdateManyMutationInput, ProcessedMessageUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedMessages to update
     */
    where?: ProcessedMessageWhereInput
  }

  /**
   * ProcessedMessage upsert
   */
  export type ProcessedMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessedMessage to update in case it exists.
     */
    where: ProcessedMessageWhereUniqueInput
    /**
     * In case the ProcessedMessage found by the `where` argument doesn't exist, create a new ProcessedMessage with this data.
     */
    create: XOR<ProcessedMessageCreateInput, ProcessedMessageUncheckedCreateInput>
    /**
     * In case the ProcessedMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedMessageUpdateInput, ProcessedMessageUncheckedUpdateInput>
  }

  /**
   * ProcessedMessage delete
   */
  export type ProcessedMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
    /**
     * Filter which ProcessedMessage to delete.
     */
    where: ProcessedMessageWhereUniqueInput
  }

  /**
   * ProcessedMessage deleteMany
   */
  export type ProcessedMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedMessages to delete
     */
    where?: ProcessedMessageWhereInput
  }

  /**
   * ProcessedMessage without action
   */
  export type ProcessedMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedMessage
     */
    select?: ProcessedMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    lastSeen: 'lastSeen',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const CallLogScalarFieldEnum: {
    id: 'id',
    person: 'person',
    duration: 'duration',
    type: 'type',
    status: 'status',
    timestamp: 'timestamp',
    deviceId: 'deviceId',
    createdAt: 'createdAt'
  };

  export type CallLogScalarFieldEnum = (typeof CallLogScalarFieldEnum)[keyof typeof CallLogScalarFieldEnum]


  export const EvolutionInstanceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    instanceId: 'instanceId',
    phoneNumber: 'phoneNumber',
    apiKey: 'apiKey',
    endpointUrl: 'endpointUrl',
    webhookSecret: 'webhookSecret',
    deviceId: 'deviceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EvolutionInstanceScalarFieldEnum = (typeof EvolutionInstanceScalarFieldEnum)[keyof typeof EvolutionInstanceScalarFieldEnum]


  export const DailyMetricScalarFieldEnum: {
    id: 'id',
    date: 'date',
    instanceId: 'instanceId',
    activeConversations: 'activeConversations',
    newContacts: 'newContacts',
    messagesSent: 'messagesSent',
    messagesReceived: 'messagesReceived',
    callsMade: 'callsMade',
    callsReceived: 'callsReceived',
    callDuration: 'callDuration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyMetricScalarFieldEnum = (typeof DailyMetricScalarFieldEnum)[keyof typeof DailyMetricScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    jid: 'jid',
    firstSeen: 'firstSeen'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    contactId: 'contactId',
    status: 'status',
    score: 'score',
    contextSummary: 'contextSummary',
    lastInteraction: 'lastInteraction',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const DailyConversationScalarFieldEnum: {
    id: 'id',
    date: 'date',
    instanceId: 'instanceId',
    jid: 'jid',
    createdAt: 'createdAt'
  };

  export type DailyConversationScalarFieldEnum = (typeof DailyConversationScalarFieldEnum)[keyof typeof DailyConversationScalarFieldEnum]


  export const ProcessedMessageScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    messageId: 'messageId',
    jid: 'jid',
    direction: 'direction',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type ProcessedMessageScalarFieldEnum = (typeof ProcessedMessageScalarFieldEnum)[keyof typeof ProcessedMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: StringFilter<"Device"> | string
    name?: StringNullableFilter<"Device"> | string | null
    lastSeen?: DateTimeNullableFilter<"Device"> | Date | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    calls?: CallLogListRelationFilter
    evolutionInstance?: XOR<EvolutionInstanceNullableRelationFilter, EvolutionInstanceWhereInput> | null
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    lastSeen?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    calls?: CallLogOrderByRelationAggregateInput
    evolutionInstance?: EvolutionInstanceOrderByWithRelationInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    name?: StringNullableFilter<"Device"> | string | null
    lastSeen?: DateTimeNullableFilter<"Device"> | Date | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    calls?: CallLogListRelationFilter
    evolutionInstance?: XOR<EvolutionInstanceNullableRelationFilter, EvolutionInstanceWhereInput> | null
  }, "id">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    lastSeen?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Device"> | string
    name?: StringNullableWithAggregatesFilter<"Device"> | string | null
    lastSeen?: DateTimeNullableWithAggregatesFilter<"Device"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
  }

  export type CallLogWhereInput = {
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    id?: StringFilter<"CallLog"> | string
    person?: StringFilter<"CallLog"> | string
    duration?: IntFilter<"CallLog"> | number
    type?: StringFilter<"CallLog"> | string
    status?: StringFilter<"CallLog"> | string
    timestamp?: DateTimeFilter<"CallLog"> | Date | string
    deviceId?: StringFilter<"CallLog"> | string
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }

  export type CallLogOrderByWithRelationInput = {
    id?: SortOrder
    person?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type CallLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CallLogWhereInput | CallLogWhereInput[]
    OR?: CallLogWhereInput[]
    NOT?: CallLogWhereInput | CallLogWhereInput[]
    person?: StringFilter<"CallLog"> | string
    duration?: IntFilter<"CallLog"> | number
    type?: StringFilter<"CallLog"> | string
    status?: StringFilter<"CallLog"> | string
    timestamp?: DateTimeFilter<"CallLog"> | Date | string
    deviceId?: StringFilter<"CallLog"> | string
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
    device?: XOR<DeviceRelationFilter, DeviceWhereInput>
  }, "id">

  export type CallLogOrderByWithAggregationInput = {
    id?: SortOrder
    person?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    _count?: CallLogCountOrderByAggregateInput
    _avg?: CallLogAvgOrderByAggregateInput
    _max?: CallLogMaxOrderByAggregateInput
    _min?: CallLogMinOrderByAggregateInput
    _sum?: CallLogSumOrderByAggregateInput
  }

  export type CallLogScalarWhereWithAggregatesInput = {
    AND?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    OR?: CallLogScalarWhereWithAggregatesInput[]
    NOT?: CallLogScalarWhereWithAggregatesInput | CallLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CallLog"> | string
    person?: StringWithAggregatesFilter<"CallLog"> | string
    duration?: IntWithAggregatesFilter<"CallLog"> | number
    type?: StringWithAggregatesFilter<"CallLog"> | string
    status?: StringWithAggregatesFilter<"CallLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"CallLog"> | Date | string
    deviceId?: StringWithAggregatesFilter<"CallLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CallLog"> | Date | string
  }

  export type EvolutionInstanceWhereInput = {
    AND?: EvolutionInstanceWhereInput | EvolutionInstanceWhereInput[]
    OR?: EvolutionInstanceWhereInput[]
    NOT?: EvolutionInstanceWhereInput | EvolutionInstanceWhereInput[]
    id?: StringFilter<"EvolutionInstance"> | string
    name?: StringFilter<"EvolutionInstance"> | string
    instanceId?: StringFilter<"EvolutionInstance"> | string
    phoneNumber?: StringNullableFilter<"EvolutionInstance"> | string | null
    apiKey?: StringNullableFilter<"EvolutionInstance"> | string | null
    endpointUrl?: StringNullableFilter<"EvolutionInstance"> | string | null
    webhookSecret?: StringNullableFilter<"EvolutionInstance"> | string | null
    deviceId?: StringNullableFilter<"EvolutionInstance"> | string | null
    createdAt?: DateTimeFilter<"EvolutionInstance"> | Date | string
    updatedAt?: DateTimeFilter<"EvolutionInstance"> | Date | string
    contacts?: ContactListRelationFilter
    conversations?: DailyConversationListRelationFilter
    metrics?: DailyMetricListRelationFilter
    device?: XOR<DeviceNullableRelationFilter, DeviceWhereInput> | null
    processedMessages?: ProcessedMessageListRelationFilter
  }

  export type EvolutionInstanceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    instanceId?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    endpointUrl?: SortOrderInput | SortOrder
    webhookSecret?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contacts?: ContactOrderByRelationAggregateInput
    conversations?: DailyConversationOrderByRelationAggregateInput
    metrics?: DailyMetricOrderByRelationAggregateInput
    device?: DeviceOrderByWithRelationInput
    processedMessages?: ProcessedMessageOrderByRelationAggregateInput
  }

  export type EvolutionInstanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instanceId?: string
    deviceId?: string
    AND?: EvolutionInstanceWhereInput | EvolutionInstanceWhereInput[]
    OR?: EvolutionInstanceWhereInput[]
    NOT?: EvolutionInstanceWhereInput | EvolutionInstanceWhereInput[]
    name?: StringFilter<"EvolutionInstance"> | string
    phoneNumber?: StringNullableFilter<"EvolutionInstance"> | string | null
    apiKey?: StringNullableFilter<"EvolutionInstance"> | string | null
    endpointUrl?: StringNullableFilter<"EvolutionInstance"> | string | null
    webhookSecret?: StringNullableFilter<"EvolutionInstance"> | string | null
    createdAt?: DateTimeFilter<"EvolutionInstance"> | Date | string
    updatedAt?: DateTimeFilter<"EvolutionInstance"> | Date | string
    contacts?: ContactListRelationFilter
    conversations?: DailyConversationListRelationFilter
    metrics?: DailyMetricListRelationFilter
    device?: XOR<DeviceNullableRelationFilter, DeviceWhereInput> | null
    processedMessages?: ProcessedMessageListRelationFilter
  }, "id" | "instanceId" | "deviceId">

  export type EvolutionInstanceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    instanceId?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    endpointUrl?: SortOrderInput | SortOrder
    webhookSecret?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EvolutionInstanceCountOrderByAggregateInput
    _max?: EvolutionInstanceMaxOrderByAggregateInput
    _min?: EvolutionInstanceMinOrderByAggregateInput
  }

  export type EvolutionInstanceScalarWhereWithAggregatesInput = {
    AND?: EvolutionInstanceScalarWhereWithAggregatesInput | EvolutionInstanceScalarWhereWithAggregatesInput[]
    OR?: EvolutionInstanceScalarWhereWithAggregatesInput[]
    NOT?: EvolutionInstanceScalarWhereWithAggregatesInput | EvolutionInstanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvolutionInstance"> | string
    name?: StringWithAggregatesFilter<"EvolutionInstance"> | string
    instanceId?: StringWithAggregatesFilter<"EvolutionInstance"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"EvolutionInstance"> | string | null
    apiKey?: StringNullableWithAggregatesFilter<"EvolutionInstance"> | string | null
    endpointUrl?: StringNullableWithAggregatesFilter<"EvolutionInstance"> | string | null
    webhookSecret?: StringNullableWithAggregatesFilter<"EvolutionInstance"> | string | null
    deviceId?: StringNullableWithAggregatesFilter<"EvolutionInstance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EvolutionInstance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EvolutionInstance"> | Date | string
  }

  export type DailyMetricWhereInput = {
    AND?: DailyMetricWhereInput | DailyMetricWhereInput[]
    OR?: DailyMetricWhereInput[]
    NOT?: DailyMetricWhereInput | DailyMetricWhereInput[]
    id?: StringFilter<"DailyMetric"> | string
    date?: DateTimeFilter<"DailyMetric"> | Date | string
    instanceId?: StringFilter<"DailyMetric"> | string
    activeConversations?: IntFilter<"DailyMetric"> | number
    newContacts?: IntFilter<"DailyMetric"> | number
    messagesSent?: IntFilter<"DailyMetric"> | number
    messagesReceived?: IntFilter<"DailyMetric"> | number
    callsMade?: IntFilter<"DailyMetric"> | number
    callsReceived?: IntFilter<"DailyMetric"> | number
    callDuration?: IntFilter<"DailyMetric"> | number
    createdAt?: DateTimeFilter<"DailyMetric"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMetric"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }

  export type DailyMetricOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instance?: EvolutionInstanceOrderByWithRelationInput
  }

  export type DailyMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date_instanceId?: DailyMetricDateInstanceIdCompoundUniqueInput
    AND?: DailyMetricWhereInput | DailyMetricWhereInput[]
    OR?: DailyMetricWhereInput[]
    NOT?: DailyMetricWhereInput | DailyMetricWhereInput[]
    date?: DateTimeFilter<"DailyMetric"> | Date | string
    instanceId?: StringFilter<"DailyMetric"> | string
    activeConversations?: IntFilter<"DailyMetric"> | number
    newContacts?: IntFilter<"DailyMetric"> | number
    messagesSent?: IntFilter<"DailyMetric"> | number
    messagesReceived?: IntFilter<"DailyMetric"> | number
    callsMade?: IntFilter<"DailyMetric"> | number
    callsReceived?: IntFilter<"DailyMetric"> | number
    callDuration?: IntFilter<"DailyMetric"> | number
    createdAt?: DateTimeFilter<"DailyMetric"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMetric"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }, "id" | "date_instanceId">

  export type DailyMetricOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyMetricCountOrderByAggregateInput
    _avg?: DailyMetricAvgOrderByAggregateInput
    _max?: DailyMetricMaxOrderByAggregateInput
    _min?: DailyMetricMinOrderByAggregateInput
    _sum?: DailyMetricSumOrderByAggregateInput
  }

  export type DailyMetricScalarWhereWithAggregatesInput = {
    AND?: DailyMetricScalarWhereWithAggregatesInput | DailyMetricScalarWhereWithAggregatesInput[]
    OR?: DailyMetricScalarWhereWithAggregatesInput[]
    NOT?: DailyMetricScalarWhereWithAggregatesInput | DailyMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyMetric"> | string
    date?: DateTimeWithAggregatesFilter<"DailyMetric"> | Date | string
    instanceId?: StringWithAggregatesFilter<"DailyMetric"> | string
    activeConversations?: IntWithAggregatesFilter<"DailyMetric"> | number
    newContacts?: IntWithAggregatesFilter<"DailyMetric"> | number
    messagesSent?: IntWithAggregatesFilter<"DailyMetric"> | number
    messagesReceived?: IntWithAggregatesFilter<"DailyMetric"> | number
    callsMade?: IntWithAggregatesFilter<"DailyMetric"> | number
    callsReceived?: IntWithAggregatesFilter<"DailyMetric"> | number
    callDuration?: IntWithAggregatesFilter<"DailyMetric"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DailyMetric"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyMetric"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    instanceId?: StringFilter<"Contact"> | string
    jid?: StringFilter<"Contact"> | string
    firstSeen?: DateTimeFilter<"Contact"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
    lead?: XOR<LeadNullableRelationFilter, LeadWhereInput> | null
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    firstSeen?: SortOrder
    instance?: EvolutionInstanceOrderByWithRelationInput
    lead?: LeadOrderByWithRelationInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instanceId_jid?: ContactInstanceIdJidCompoundUniqueInput
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    instanceId?: StringFilter<"Contact"> | string
    jid?: StringFilter<"Contact"> | string
    firstSeen?: DateTimeFilter<"Contact"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
    lead?: XOR<LeadNullableRelationFilter, LeadWhereInput> | null
  }, "id" | "instanceId_jid">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    firstSeen?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    instanceId?: StringWithAggregatesFilter<"Contact"> | string
    jid?: StringWithAggregatesFilter<"Contact"> | string
    firstSeen?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    contactId?: StringFilter<"Lead"> | string
    status?: StringFilter<"Lead"> | string
    score?: IntFilter<"Lead"> | number
    contextSummary?: StringNullableFilter<"Lead"> | string | null
    lastInteraction?: DateTimeFilter<"Lead"> | Date | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    contact?: XOR<ContactRelationFilter, ContactWhereInput>
    notes?: NoteListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    contactId?: SortOrder
    status?: SortOrder
    score?: SortOrder
    contextSummary?: SortOrderInput | SortOrder
    lastInteraction?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contact?: ContactOrderByWithRelationInput
    notes?: NoteOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contactId?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    status?: StringFilter<"Lead"> | string
    score?: IntFilter<"Lead"> | number
    contextSummary?: StringNullableFilter<"Lead"> | string | null
    lastInteraction?: DateTimeFilter<"Lead"> | Date | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    contact?: XOR<ContactRelationFilter, ContactWhereInput>
    notes?: NoteListRelationFilter
  }, "id" | "contactId">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    contactId?: SortOrder
    status?: SortOrder
    score?: SortOrder
    contextSummary?: SortOrderInput | SortOrder
    lastInteraction?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    contactId?: StringWithAggregatesFilter<"Lead"> | string
    status?: StringWithAggregatesFilter<"Lead"> | string
    score?: IntWithAggregatesFilter<"Lead"> | number
    contextSummary?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    lastInteraction?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    leadId?: StringFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    leadId?: StringFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    lead?: XOR<LeadRelationFilter, LeadWhereInput>
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    leadId?: StringWithAggregatesFilter<"Note"> | string
    content?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
  }

  export type DailyConversationWhereInput = {
    AND?: DailyConversationWhereInput | DailyConversationWhereInput[]
    OR?: DailyConversationWhereInput[]
    NOT?: DailyConversationWhereInput | DailyConversationWhereInput[]
    id?: StringFilter<"DailyConversation"> | string
    date?: DateTimeFilter<"DailyConversation"> | Date | string
    instanceId?: StringFilter<"DailyConversation"> | string
    jid?: StringFilter<"DailyConversation"> | string
    createdAt?: DateTimeFilter<"DailyConversation"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }

  export type DailyConversationOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    createdAt?: SortOrder
    instance?: EvolutionInstanceOrderByWithRelationInput
  }

  export type DailyConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date_instanceId_jid?: DailyConversationDateInstanceIdJidCompoundUniqueInput
    AND?: DailyConversationWhereInput | DailyConversationWhereInput[]
    OR?: DailyConversationWhereInput[]
    NOT?: DailyConversationWhereInput | DailyConversationWhereInput[]
    date?: DateTimeFilter<"DailyConversation"> | Date | string
    instanceId?: StringFilter<"DailyConversation"> | string
    jid?: StringFilter<"DailyConversation"> | string
    createdAt?: DateTimeFilter<"DailyConversation"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }, "id" | "date_instanceId_jid">

  export type DailyConversationOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    createdAt?: SortOrder
    _count?: DailyConversationCountOrderByAggregateInput
    _max?: DailyConversationMaxOrderByAggregateInput
    _min?: DailyConversationMinOrderByAggregateInput
  }

  export type DailyConversationScalarWhereWithAggregatesInput = {
    AND?: DailyConversationScalarWhereWithAggregatesInput | DailyConversationScalarWhereWithAggregatesInput[]
    OR?: DailyConversationScalarWhereWithAggregatesInput[]
    NOT?: DailyConversationScalarWhereWithAggregatesInput | DailyConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyConversation"> | string
    date?: DateTimeWithAggregatesFilter<"DailyConversation"> | Date | string
    instanceId?: StringWithAggregatesFilter<"DailyConversation"> | string
    jid?: StringWithAggregatesFilter<"DailyConversation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyConversation"> | Date | string
  }

  export type ProcessedMessageWhereInput = {
    AND?: ProcessedMessageWhereInput | ProcessedMessageWhereInput[]
    OR?: ProcessedMessageWhereInput[]
    NOT?: ProcessedMessageWhereInput | ProcessedMessageWhereInput[]
    id?: StringFilter<"ProcessedMessage"> | string
    instanceId?: StringFilter<"ProcessedMessage"> | string
    messageId?: StringFilter<"ProcessedMessage"> | string
    jid?: StringFilter<"ProcessedMessage"> | string
    direction?: StringFilter<"ProcessedMessage"> | string
    timestamp?: DateTimeFilter<"ProcessedMessage"> | Date | string
    createdAt?: DateTimeFilter<"ProcessedMessage"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }

  export type ProcessedMessageOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    messageId?: SortOrder
    jid?: SortOrder
    direction?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    instance?: EvolutionInstanceOrderByWithRelationInput
  }

  export type ProcessedMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instanceId_messageId?: ProcessedMessageInstanceIdMessageIdCompoundUniqueInput
    AND?: ProcessedMessageWhereInput | ProcessedMessageWhereInput[]
    OR?: ProcessedMessageWhereInput[]
    NOT?: ProcessedMessageWhereInput | ProcessedMessageWhereInput[]
    instanceId?: StringFilter<"ProcessedMessage"> | string
    messageId?: StringFilter<"ProcessedMessage"> | string
    jid?: StringFilter<"ProcessedMessage"> | string
    direction?: StringFilter<"ProcessedMessage"> | string
    timestamp?: DateTimeFilter<"ProcessedMessage"> | Date | string
    createdAt?: DateTimeFilter<"ProcessedMessage"> | Date | string
    instance?: XOR<EvolutionInstanceRelationFilter, EvolutionInstanceWhereInput>
  }, "id" | "instanceId_messageId">

  export type ProcessedMessageOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    messageId?: SortOrder
    jid?: SortOrder
    direction?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: ProcessedMessageCountOrderByAggregateInput
    _max?: ProcessedMessageMaxOrderByAggregateInput
    _min?: ProcessedMessageMinOrderByAggregateInput
  }

  export type ProcessedMessageScalarWhereWithAggregatesInput = {
    AND?: ProcessedMessageScalarWhereWithAggregatesInput | ProcessedMessageScalarWhereWithAggregatesInput[]
    OR?: ProcessedMessageScalarWhereWithAggregatesInput[]
    NOT?: ProcessedMessageScalarWhereWithAggregatesInput | ProcessedMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessedMessage"> | string
    instanceId?: StringWithAggregatesFilter<"ProcessedMessage"> | string
    messageId?: StringWithAggregatesFilter<"ProcessedMessage"> | string
    jid?: StringWithAggregatesFilter<"ProcessedMessage"> | string
    direction?: StringWithAggregatesFilter<"ProcessedMessage"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ProcessedMessage"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProcessedMessage"> | Date | string
  }

  export type DeviceCreateInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CallLogCreateNestedManyWithoutDeviceInput
    evolutionInstance?: EvolutionInstanceCreateNestedOneWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CallLogUncheckedCreateNestedManyWithoutDeviceInput
    evolutionInstance?: EvolutionInstanceUncheckedCreateNestedOneWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CallLogUpdateManyWithoutDeviceNestedInput
    evolutionInstance?: EvolutionInstanceUpdateOneWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CallLogUncheckedUpdateManyWithoutDeviceNestedInput
    evolutionInstance?: EvolutionInstanceUncheckedUpdateOneWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogCreateInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    createdAt?: Date | string
    device: DeviceCreateNestedOneWithoutCallsInput
  }

  export type CallLogUncheckedCreateInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    deviceId: string
    createdAt?: Date | string
  }

  export type CallLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutCallsNestedInput
  }

  export type CallLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogCreateManyInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    deviceId: string
    createdAt?: Date | string
  }

  export type CallLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    deviceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvolutionInstanceCreateInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricCreateNestedManyWithoutInstanceInput
    device?: DeviceCreateNestedOneWithoutEvolutionInstanceInput
    processedMessages?: ProcessedMessageCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationUncheckedCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricUncheckedCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUpdateManyWithoutInstanceNestedInput
    device?: DeviceUpdateOneWithoutEvolutionInstanceNestedInput
    processedMessages?: ProcessedMessageUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceCreateManyInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvolutionInstanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvolutionInstanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricCreateInput = {
    id?: string
    date: Date | string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    instance: EvolutionInstanceCreateNestedOneWithoutMetricsInput
  }

  export type DailyMetricUncheckedCreateInput = {
    id?: string
    date: Date | string
    instanceId: string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: EvolutionInstanceUpdateOneRequiredWithoutMetricsNestedInput
  }

  export type DailyMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    instanceId?: StringFieldUpdateOperationsInput | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricCreateManyInput = {
    id?: string
    date: Date | string
    instanceId: string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    instanceId?: StringFieldUpdateOperationsInput | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    jid: string
    firstSeen?: Date | string
    instance: EvolutionInstanceCreateNestedOneWithoutContactsInput
    lead?: LeadCreateNestedOneWithoutContactInput
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    instanceId: string
    jid: string
    firstSeen?: Date | string
    lead?: LeadUncheckedCreateNestedOneWithoutContactInput
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: EvolutionInstanceUpdateOneRequiredWithoutContactsNestedInput
    lead?: LeadUpdateOneWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUncheckedUpdateOneWithoutContactNestedInput
  }

  export type ContactCreateManyInput = {
    id?: string
    instanceId: string
    jid: string
    firstSeen?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    contact: ContactCreateNestedOneWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    contactId: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contact?: ContactUpdateOneRequiredWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contactId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    contactId: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contactId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    leadId: string
    content: string
    createdAt?: Date | string
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyInput = {
    id?: string
    leadId: string
    content: string
    createdAt?: Date | string
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationCreateInput = {
    id?: string
    date: Date | string
    jid: string
    createdAt?: Date | string
    instance: EvolutionInstanceCreateNestedOneWithoutConversationsInput
  }

  export type DailyConversationUncheckedCreateInput = {
    id?: string
    date: Date | string
    instanceId: string
    jid: string
    createdAt?: Date | string
  }

  export type DailyConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: EvolutionInstanceUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type DailyConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    instanceId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationCreateManyInput = {
    id?: string
    date: Date | string
    instanceId: string
    jid: string
    createdAt?: Date | string
  }

  export type DailyConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    instanceId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageCreateInput = {
    id?: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
    instance: EvolutionInstanceCreateNestedOneWithoutProcessedMessagesInput
  }

  export type ProcessedMessageUncheckedCreateInput = {
    id?: string
    instanceId: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ProcessedMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: EvolutionInstanceUpdateOneRequiredWithoutProcessedMessagesNestedInput
  }

  export type ProcessedMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageCreateManyInput = {
    id?: string
    instanceId: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ProcessedMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CallLogListRelationFilter = {
    every?: CallLogWhereInput
    some?: CallLogWhereInput
    none?: CallLogWhereInput
  }

  export type EvolutionInstanceNullableRelationFilter = {
    is?: EvolutionInstanceWhereInput | null
    isNot?: EvolutionInstanceWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CallLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    lastSeen?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DeviceRelationFilter = {
    is?: DeviceWhereInput
    isNot?: DeviceWhereInput
  }

  export type CallLogCountOrderByAggregateInput = {
    id?: SortOrder
    person?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type CallLogAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type CallLogMaxOrderByAggregateInput = {
    id?: SortOrder
    person?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type CallLogMinOrderByAggregateInput = {
    id?: SortOrder
    person?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
  }

  export type CallLogSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type DailyConversationListRelationFilter = {
    every?: DailyConversationWhereInput
    some?: DailyConversationWhereInput
    none?: DailyConversationWhereInput
  }

  export type DailyMetricListRelationFilter = {
    every?: DailyMetricWhereInput
    some?: DailyMetricWhereInput
    none?: DailyMetricWhereInput
  }

  export type DeviceNullableRelationFilter = {
    is?: DeviceWhereInput | null
    isNot?: DeviceWhereInput | null
  }

  export type ProcessedMessageListRelationFilter = {
    every?: ProcessedMessageWhereInput
    some?: ProcessedMessageWhereInput
    none?: ProcessedMessageWhereInput
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyMetricOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProcessedMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvolutionInstanceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instanceId?: SortOrder
    phoneNumber?: SortOrder
    apiKey?: SortOrder
    endpointUrl?: SortOrder
    webhookSecret?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvolutionInstanceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instanceId?: SortOrder
    phoneNumber?: SortOrder
    apiKey?: SortOrder
    endpointUrl?: SortOrder
    webhookSecret?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvolutionInstanceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    instanceId?: SortOrder
    phoneNumber?: SortOrder
    apiKey?: SortOrder
    endpointUrl?: SortOrder
    webhookSecret?: SortOrder
    deviceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvolutionInstanceRelationFilter = {
    is?: EvolutionInstanceWhereInput
    isNot?: EvolutionInstanceWhereInput
  }

  export type DailyMetricDateInstanceIdCompoundUniqueInput = {
    date: Date | string
    instanceId: string
  }

  export type DailyMetricCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMetricAvgOrderByAggregateInput = {
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
  }

  export type DailyMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMetricMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMetricSumOrderByAggregateInput = {
    activeConversations?: SortOrder
    newContacts?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    callsMade?: SortOrder
    callsReceived?: SortOrder
    callDuration?: SortOrder
  }

  export type LeadNullableRelationFilter = {
    is?: LeadWhereInput | null
    isNot?: LeadWhereInput | null
  }

  export type ContactInstanceIdJidCompoundUniqueInput = {
    instanceId: string
    jid: string
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    firstSeen?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    firstSeen?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    firstSeen?: SortOrder
  }

  export type ContactRelationFilter = {
    is?: ContactWhereInput
    isNot?: ContactWhereInput
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    status?: SortOrder
    score?: SortOrder
    contextSummary?: SortOrder
    lastInteraction?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    status?: SortOrder
    score?: SortOrder
    contextSummary?: SortOrder
    lastInteraction?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    contactId?: SortOrder
    status?: SortOrder
    score?: SortOrder
    contextSummary?: SortOrder
    lastInteraction?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type LeadRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyConversationDateInstanceIdJidCompoundUniqueInput = {
    date: Date | string
    instanceId: string
    jid: string
  }

  export type DailyConversationCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    createdAt?: SortOrder
  }

  export type DailyConversationMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    instanceId?: SortOrder
    jid?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedMessageInstanceIdMessageIdCompoundUniqueInput = {
    instanceId: string
    messageId: string
  }

  export type ProcessedMessageCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    messageId?: SortOrder
    jid?: SortOrder
    direction?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    messageId?: SortOrder
    jid?: SortOrder
    direction?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedMessageMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    messageId?: SortOrder
    jid?: SortOrder
    direction?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type CallLogCreateNestedManyWithoutDeviceInput = {
    create?: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput> | CallLogCreateWithoutDeviceInput[] | CallLogUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutDeviceInput | CallLogCreateOrConnectWithoutDeviceInput[]
    createMany?: CallLogCreateManyDeviceInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type EvolutionInstanceCreateNestedOneWithoutDeviceInput = {
    create?: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutDeviceInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type CallLogUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput> | CallLogCreateWithoutDeviceInput[] | CallLogUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutDeviceInput | CallLogCreateOrConnectWithoutDeviceInput[]
    createMany?: CallLogCreateManyDeviceInputEnvelope
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
  }

  export type EvolutionInstanceUncheckedCreateNestedOneWithoutDeviceInput = {
    create?: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutDeviceInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CallLogUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput> | CallLogCreateWithoutDeviceInput[] | CallLogUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutDeviceInput | CallLogCreateOrConnectWithoutDeviceInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutDeviceInput | CallLogUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: CallLogCreateManyDeviceInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutDeviceInput | CallLogUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutDeviceInput | CallLogUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type EvolutionInstanceUpdateOneWithoutDeviceNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutDeviceInput
    upsert?: EvolutionInstanceUpsertWithoutDeviceInput
    disconnect?: EvolutionInstanceWhereInput | boolean
    delete?: EvolutionInstanceWhereInput | boolean
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutDeviceInput, EvolutionInstanceUpdateWithoutDeviceInput>, EvolutionInstanceUncheckedUpdateWithoutDeviceInput>
  }

  export type CallLogUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput> | CallLogCreateWithoutDeviceInput[] | CallLogUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: CallLogCreateOrConnectWithoutDeviceInput | CallLogCreateOrConnectWithoutDeviceInput[]
    upsert?: CallLogUpsertWithWhereUniqueWithoutDeviceInput | CallLogUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: CallLogCreateManyDeviceInputEnvelope
    set?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    disconnect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    delete?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    connect?: CallLogWhereUniqueInput | CallLogWhereUniqueInput[]
    update?: CallLogUpdateWithWhereUniqueWithoutDeviceInput | CallLogUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: CallLogUpdateManyWithWhereWithoutDeviceInput | CallLogUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
  }

  export type EvolutionInstanceUncheckedUpdateOneWithoutDeviceNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutDeviceInput
    upsert?: EvolutionInstanceUpsertWithoutDeviceInput
    disconnect?: EvolutionInstanceWhereInput | boolean
    delete?: EvolutionInstanceWhereInput | boolean
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutDeviceInput, EvolutionInstanceUpdateWithoutDeviceInput>, EvolutionInstanceUncheckedUpdateWithoutDeviceInput>
  }

  export type DeviceCreateNestedOneWithoutCallsInput = {
    create?: XOR<DeviceCreateWithoutCallsInput, DeviceUncheckedCreateWithoutCallsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCallsInput
    connect?: DeviceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<DeviceCreateWithoutCallsInput, DeviceUncheckedCreateWithoutCallsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutCallsInput
    upsert?: DeviceUpsertWithoutCallsInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutCallsInput, DeviceUpdateWithoutCallsInput>, DeviceUncheckedUpdateWithoutCallsInput>
  }

  export type ContactCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type DailyConversationCreateNestedManyWithoutInstanceInput = {
    create?: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput> | DailyConversationCreateWithoutInstanceInput[] | DailyConversationUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyConversationCreateOrConnectWithoutInstanceInput | DailyConversationCreateOrConnectWithoutInstanceInput[]
    createMany?: DailyConversationCreateManyInstanceInputEnvelope
    connect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
  }

  export type DailyMetricCreateNestedManyWithoutInstanceInput = {
    create?: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput> | DailyMetricCreateWithoutInstanceInput[] | DailyMetricUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyMetricCreateOrConnectWithoutInstanceInput | DailyMetricCreateOrConnectWithoutInstanceInput[]
    createMany?: DailyMetricCreateManyInstanceInputEnvelope
    connect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
  }

  export type DeviceCreateNestedOneWithoutEvolutionInstanceInput = {
    create?: XOR<DeviceCreateWithoutEvolutionInstanceInput, DeviceUncheckedCreateWithoutEvolutionInstanceInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutEvolutionInstanceInput
    connect?: DeviceWhereUniqueInput
  }

  export type ProcessedMessageCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput> | ProcessedMessageCreateWithoutInstanceInput[] | ProcessedMessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ProcessedMessageCreateOrConnectWithoutInstanceInput | ProcessedMessageCreateOrConnectWithoutInstanceInput[]
    createMany?: ProcessedMessageCreateManyInstanceInputEnvelope
    connect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type DailyConversationUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput> | DailyConversationCreateWithoutInstanceInput[] | DailyConversationUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyConversationCreateOrConnectWithoutInstanceInput | DailyConversationCreateOrConnectWithoutInstanceInput[]
    createMany?: DailyConversationCreateManyInstanceInputEnvelope
    connect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
  }

  export type DailyMetricUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput> | DailyMetricCreateWithoutInstanceInput[] | DailyMetricUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyMetricCreateOrConnectWithoutInstanceInput | DailyMetricCreateOrConnectWithoutInstanceInput[]
    createMany?: DailyMetricCreateManyInstanceInputEnvelope
    connect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
  }

  export type ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput> | ProcessedMessageCreateWithoutInstanceInput[] | ProcessedMessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ProcessedMessageCreateOrConnectWithoutInstanceInput | ProcessedMessageCreateOrConnectWithoutInstanceInput[]
    createMany?: ProcessedMessageCreateManyInstanceInputEnvelope
    connect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
  }

  export type ContactUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutInstanceInput | ContactUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutInstanceInput | ContactUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutInstanceInput | ContactUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type DailyConversationUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput> | DailyConversationCreateWithoutInstanceInput[] | DailyConversationUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyConversationCreateOrConnectWithoutInstanceInput | DailyConversationCreateOrConnectWithoutInstanceInput[]
    upsert?: DailyConversationUpsertWithWhereUniqueWithoutInstanceInput | DailyConversationUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: DailyConversationCreateManyInstanceInputEnvelope
    set?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    disconnect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    delete?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    connect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    update?: DailyConversationUpdateWithWhereUniqueWithoutInstanceInput | DailyConversationUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: DailyConversationUpdateManyWithWhereWithoutInstanceInput | DailyConversationUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: DailyConversationScalarWhereInput | DailyConversationScalarWhereInput[]
  }

  export type DailyMetricUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput> | DailyMetricCreateWithoutInstanceInput[] | DailyMetricUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyMetricCreateOrConnectWithoutInstanceInput | DailyMetricCreateOrConnectWithoutInstanceInput[]
    upsert?: DailyMetricUpsertWithWhereUniqueWithoutInstanceInput | DailyMetricUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: DailyMetricCreateManyInstanceInputEnvelope
    set?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    disconnect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    delete?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    connect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    update?: DailyMetricUpdateWithWhereUniqueWithoutInstanceInput | DailyMetricUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: DailyMetricUpdateManyWithWhereWithoutInstanceInput | DailyMetricUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: DailyMetricScalarWhereInput | DailyMetricScalarWhereInput[]
  }

  export type DeviceUpdateOneWithoutEvolutionInstanceNestedInput = {
    create?: XOR<DeviceCreateWithoutEvolutionInstanceInput, DeviceUncheckedCreateWithoutEvolutionInstanceInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutEvolutionInstanceInput
    upsert?: DeviceUpsertWithoutEvolutionInstanceInput
    disconnect?: DeviceWhereInput | boolean
    delete?: DeviceWhereInput | boolean
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutEvolutionInstanceInput, DeviceUpdateWithoutEvolutionInstanceInput>, DeviceUncheckedUpdateWithoutEvolutionInstanceInput>
  }

  export type ProcessedMessageUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput> | ProcessedMessageCreateWithoutInstanceInput[] | ProcessedMessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ProcessedMessageCreateOrConnectWithoutInstanceInput | ProcessedMessageCreateOrConnectWithoutInstanceInput[]
    upsert?: ProcessedMessageUpsertWithWhereUniqueWithoutInstanceInput | ProcessedMessageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ProcessedMessageCreateManyInstanceInputEnvelope
    set?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    disconnect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    delete?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    connect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    update?: ProcessedMessageUpdateWithWhereUniqueWithoutInstanceInput | ProcessedMessageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ProcessedMessageUpdateManyWithWhereWithoutInstanceInput | ProcessedMessageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ProcessedMessageScalarWhereInput | ProcessedMessageScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutInstanceInput | ContactUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutInstanceInput | ContactUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutInstanceInput | ContactUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput> | DailyConversationCreateWithoutInstanceInput[] | DailyConversationUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyConversationCreateOrConnectWithoutInstanceInput | DailyConversationCreateOrConnectWithoutInstanceInput[]
    upsert?: DailyConversationUpsertWithWhereUniqueWithoutInstanceInput | DailyConversationUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: DailyConversationCreateManyInstanceInputEnvelope
    set?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    disconnect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    delete?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    connect?: DailyConversationWhereUniqueInput | DailyConversationWhereUniqueInput[]
    update?: DailyConversationUpdateWithWhereUniqueWithoutInstanceInput | DailyConversationUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: DailyConversationUpdateManyWithWhereWithoutInstanceInput | DailyConversationUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: DailyConversationScalarWhereInput | DailyConversationScalarWhereInput[]
  }

  export type DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput> | DailyMetricCreateWithoutInstanceInput[] | DailyMetricUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: DailyMetricCreateOrConnectWithoutInstanceInput | DailyMetricCreateOrConnectWithoutInstanceInput[]
    upsert?: DailyMetricUpsertWithWhereUniqueWithoutInstanceInput | DailyMetricUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: DailyMetricCreateManyInstanceInputEnvelope
    set?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    disconnect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    delete?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    connect?: DailyMetricWhereUniqueInput | DailyMetricWhereUniqueInput[]
    update?: DailyMetricUpdateWithWhereUniqueWithoutInstanceInput | DailyMetricUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: DailyMetricUpdateManyWithWhereWithoutInstanceInput | DailyMetricUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: DailyMetricScalarWhereInput | DailyMetricScalarWhereInput[]
  }

  export type ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput> | ProcessedMessageCreateWithoutInstanceInput[] | ProcessedMessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ProcessedMessageCreateOrConnectWithoutInstanceInput | ProcessedMessageCreateOrConnectWithoutInstanceInput[]
    upsert?: ProcessedMessageUpsertWithWhereUniqueWithoutInstanceInput | ProcessedMessageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ProcessedMessageCreateManyInstanceInputEnvelope
    set?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    disconnect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    delete?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    connect?: ProcessedMessageWhereUniqueInput | ProcessedMessageWhereUniqueInput[]
    update?: ProcessedMessageUpdateWithWhereUniqueWithoutInstanceInput | ProcessedMessageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ProcessedMessageUpdateManyWithWhereWithoutInstanceInput | ProcessedMessageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ProcessedMessageScalarWhereInput | ProcessedMessageScalarWhereInput[]
  }

  export type EvolutionInstanceCreateNestedOneWithoutMetricsInput = {
    create?: XOR<EvolutionInstanceCreateWithoutMetricsInput, EvolutionInstanceUncheckedCreateWithoutMetricsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutMetricsInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type EvolutionInstanceUpdateOneRequiredWithoutMetricsNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutMetricsInput, EvolutionInstanceUncheckedCreateWithoutMetricsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutMetricsInput
    upsert?: EvolutionInstanceUpsertWithoutMetricsInput
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutMetricsInput, EvolutionInstanceUpdateWithoutMetricsInput>, EvolutionInstanceUncheckedUpdateWithoutMetricsInput>
  }

  export type EvolutionInstanceCreateNestedOneWithoutContactsInput = {
    create?: XOR<EvolutionInstanceCreateWithoutContactsInput, EvolutionInstanceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutContactsInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type LeadCreateNestedOneWithoutContactInput = {
    create?: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUncheckedCreateNestedOneWithoutContactInput = {
    create?: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactInput
    connect?: LeadWhereUniqueInput
  }

  export type EvolutionInstanceUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutContactsInput, EvolutionInstanceUncheckedCreateWithoutContactsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutContactsInput
    upsert?: EvolutionInstanceUpsertWithoutContactsInput
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutContactsInput, EvolutionInstanceUpdateWithoutContactsInput>, EvolutionInstanceUncheckedUpdateWithoutContactsInput>
  }

  export type LeadUpdateOneWithoutContactNestedInput = {
    create?: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactInput
    upsert?: LeadUpsertWithoutContactInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutContactInput, LeadUpdateWithoutContactInput>, LeadUncheckedUpdateWithoutContactInput>
  }

  export type LeadUncheckedUpdateOneWithoutContactNestedInput = {
    create?: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactInput
    upsert?: LeadUpsertWithoutContactInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutContactInput, LeadUpdateWithoutContactInput>, LeadUncheckedUpdateWithoutContactInput>
  }

  export type ContactCreateNestedOneWithoutLeadInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput
    connect?: ContactWhereUniqueInput
  }

  export type NoteCreateNestedManyWithoutLeadInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ContactUpdateOneRequiredWithoutLeadNestedInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput
    upsert?: ContactUpsertWithoutLeadInput
    connect?: ContactWhereUniqueInput
    update?: XOR<XOR<ContactUpdateToOneWithWhereWithoutLeadInput, ContactUpdateWithoutLeadInput>, ContactUncheckedUpdateWithoutLeadInput>
  }

  export type NoteUpdateManyWithoutLeadNestedInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutLeadInput | NoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutLeadInput | NoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutLeadInput | NoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutLeadInput | NoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutLeadInput | NoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutLeadInput | NoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutNotesInput = {
    create?: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutNotesInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutNotesInput
    upsert?: LeadUpsertWithoutNotesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutNotesInput, LeadUpdateWithoutNotesInput>, LeadUncheckedUpdateWithoutNotesInput>
  }

  export type EvolutionInstanceCreateNestedOneWithoutConversationsInput = {
    create?: XOR<EvolutionInstanceCreateWithoutConversationsInput, EvolutionInstanceUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutConversationsInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type EvolutionInstanceUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutConversationsInput, EvolutionInstanceUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutConversationsInput
    upsert?: EvolutionInstanceUpsertWithoutConversationsInput
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutConversationsInput, EvolutionInstanceUpdateWithoutConversationsInput>, EvolutionInstanceUncheckedUpdateWithoutConversationsInput>
  }

  export type EvolutionInstanceCreateNestedOneWithoutProcessedMessagesInput = {
    create?: XOR<EvolutionInstanceCreateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedCreateWithoutProcessedMessagesInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutProcessedMessagesInput
    connect?: EvolutionInstanceWhereUniqueInput
  }

  export type EvolutionInstanceUpdateOneRequiredWithoutProcessedMessagesNestedInput = {
    create?: XOR<EvolutionInstanceCreateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedCreateWithoutProcessedMessagesInput>
    connectOrCreate?: EvolutionInstanceCreateOrConnectWithoutProcessedMessagesInput
    upsert?: EvolutionInstanceUpsertWithoutProcessedMessagesInput
    connect?: EvolutionInstanceWhereUniqueInput
    update?: XOR<XOR<EvolutionInstanceUpdateToOneWithWhereWithoutProcessedMessagesInput, EvolutionInstanceUpdateWithoutProcessedMessagesInput>, EvolutionInstanceUncheckedUpdateWithoutProcessedMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CallLogCreateWithoutDeviceInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CallLogUncheckedCreateWithoutDeviceInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CallLogCreateOrConnectWithoutDeviceInput = {
    where: CallLogWhereUniqueInput
    create: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput>
  }

  export type CallLogCreateManyDeviceInputEnvelope = {
    data: CallLogCreateManyDeviceInput | CallLogCreateManyDeviceInput[]
  }

  export type EvolutionInstanceCreateWithoutDeviceInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateWithoutDeviceInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationUncheckedCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricUncheckedCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceCreateOrConnectWithoutDeviceInput = {
    where: EvolutionInstanceWhereUniqueInput
    create: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
  }

  export type CallLogUpsertWithWhereUniqueWithoutDeviceInput = {
    where: CallLogWhereUniqueInput
    update: XOR<CallLogUpdateWithoutDeviceInput, CallLogUncheckedUpdateWithoutDeviceInput>
    create: XOR<CallLogCreateWithoutDeviceInput, CallLogUncheckedCreateWithoutDeviceInput>
  }

  export type CallLogUpdateWithWhereUniqueWithoutDeviceInput = {
    where: CallLogWhereUniqueInput
    data: XOR<CallLogUpdateWithoutDeviceInput, CallLogUncheckedUpdateWithoutDeviceInput>
  }

  export type CallLogUpdateManyWithWhereWithoutDeviceInput = {
    where: CallLogScalarWhereInput
    data: XOR<CallLogUpdateManyMutationInput, CallLogUncheckedUpdateManyWithoutDeviceInput>
  }

  export type CallLogScalarWhereInput = {
    AND?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    OR?: CallLogScalarWhereInput[]
    NOT?: CallLogScalarWhereInput | CallLogScalarWhereInput[]
    id?: StringFilter<"CallLog"> | string
    person?: StringFilter<"CallLog"> | string
    duration?: IntFilter<"CallLog"> | number
    type?: StringFilter<"CallLog"> | string
    status?: StringFilter<"CallLog"> | string
    timestamp?: DateTimeFilter<"CallLog"> | Date | string
    deviceId?: StringFilter<"CallLog"> | string
    createdAt?: DateTimeFilter<"CallLog"> | Date | string
  }

  export type EvolutionInstanceUpsertWithoutDeviceInput = {
    update: XOR<EvolutionInstanceUpdateWithoutDeviceInput, EvolutionInstanceUncheckedUpdateWithoutDeviceInput>
    create: XOR<EvolutionInstanceCreateWithoutDeviceInput, EvolutionInstanceUncheckedCreateWithoutDeviceInput>
    where?: EvolutionInstanceWhereInput
  }

  export type EvolutionInstanceUpdateToOneWithWhereWithoutDeviceInput = {
    where?: EvolutionInstanceWhereInput
    data: XOR<EvolutionInstanceUpdateWithoutDeviceInput, EvolutionInstanceUncheckedUpdateWithoutDeviceInput>
  }

  export type EvolutionInstanceUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type DeviceCreateWithoutCallsInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    evolutionInstance?: EvolutionInstanceCreateNestedOneWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutCallsInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    evolutionInstance?: EvolutionInstanceUncheckedCreateNestedOneWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutCallsInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutCallsInput, DeviceUncheckedCreateWithoutCallsInput>
  }

  export type DeviceUpsertWithoutCallsInput = {
    update: XOR<DeviceUpdateWithoutCallsInput, DeviceUncheckedUpdateWithoutCallsInput>
    create: XOR<DeviceCreateWithoutCallsInput, DeviceUncheckedCreateWithoutCallsInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutCallsInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutCallsInput, DeviceUncheckedUpdateWithoutCallsInput>
  }

  export type DeviceUpdateWithoutCallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evolutionInstance?: EvolutionInstanceUpdateOneWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutCallsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evolutionInstance?: EvolutionInstanceUncheckedUpdateOneWithoutDeviceNestedInput
  }

  export type ContactCreateWithoutInstanceInput = {
    id?: string
    jid: string
    firstSeen?: Date | string
    lead?: LeadCreateNestedOneWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutInstanceInput = {
    id?: string
    jid: string
    firstSeen?: Date | string
    lead?: LeadUncheckedCreateNestedOneWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput>
  }

  export type ContactCreateManyInstanceInputEnvelope = {
    data: ContactCreateManyInstanceInput | ContactCreateManyInstanceInput[]
  }

  export type DailyConversationCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    jid: string
    createdAt?: Date | string
  }

  export type DailyConversationUncheckedCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    jid: string
    createdAt?: Date | string
  }

  export type DailyConversationCreateOrConnectWithoutInstanceInput = {
    where: DailyConversationWhereUniqueInput
    create: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput>
  }

  export type DailyConversationCreateManyInstanceInputEnvelope = {
    data: DailyConversationCreateManyInstanceInput | DailyConversationCreateManyInstanceInput[]
  }

  export type DailyMetricCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMetricUncheckedCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMetricCreateOrConnectWithoutInstanceInput = {
    where: DailyMetricWhereUniqueInput
    create: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput>
  }

  export type DailyMetricCreateManyInstanceInputEnvelope = {
    data: DailyMetricCreateManyInstanceInput | DailyMetricCreateManyInstanceInput[]
  }

  export type DeviceCreateWithoutEvolutionInstanceInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CallLogCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutEvolutionInstanceInput = {
    id: string
    name?: string | null
    lastSeen?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calls?: CallLogUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutEvolutionInstanceInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutEvolutionInstanceInput, DeviceUncheckedCreateWithoutEvolutionInstanceInput>
  }

  export type ProcessedMessageCreateWithoutInstanceInput = {
    id?: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ProcessedMessageUncheckedCreateWithoutInstanceInput = {
    id?: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ProcessedMessageCreateOrConnectWithoutInstanceInput = {
    where: ProcessedMessageWhereUniqueInput
    create: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput>
  }

  export type ProcessedMessageCreateManyInstanceInputEnvelope = {
    data: ProcessedMessageCreateManyInstanceInput | ProcessedMessageCreateManyInstanceInput[]
  }

  export type ContactUpsertWithWhereUniqueWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutInstanceInput, ContactUncheckedUpdateWithoutInstanceInput>
    create: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutInstanceInput, ContactUncheckedUpdateWithoutInstanceInput>
  }

  export type ContactUpdateManyWithWhereWithoutInstanceInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutInstanceInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    id?: StringFilter<"Contact"> | string
    instanceId?: StringFilter<"Contact"> | string
    jid?: StringFilter<"Contact"> | string
    firstSeen?: DateTimeFilter<"Contact"> | Date | string
  }

  export type DailyConversationUpsertWithWhereUniqueWithoutInstanceInput = {
    where: DailyConversationWhereUniqueInput
    update: XOR<DailyConversationUpdateWithoutInstanceInput, DailyConversationUncheckedUpdateWithoutInstanceInput>
    create: XOR<DailyConversationCreateWithoutInstanceInput, DailyConversationUncheckedCreateWithoutInstanceInput>
  }

  export type DailyConversationUpdateWithWhereUniqueWithoutInstanceInput = {
    where: DailyConversationWhereUniqueInput
    data: XOR<DailyConversationUpdateWithoutInstanceInput, DailyConversationUncheckedUpdateWithoutInstanceInput>
  }

  export type DailyConversationUpdateManyWithWhereWithoutInstanceInput = {
    where: DailyConversationScalarWhereInput
    data: XOR<DailyConversationUpdateManyMutationInput, DailyConversationUncheckedUpdateManyWithoutInstanceInput>
  }

  export type DailyConversationScalarWhereInput = {
    AND?: DailyConversationScalarWhereInput | DailyConversationScalarWhereInput[]
    OR?: DailyConversationScalarWhereInput[]
    NOT?: DailyConversationScalarWhereInput | DailyConversationScalarWhereInput[]
    id?: StringFilter<"DailyConversation"> | string
    date?: DateTimeFilter<"DailyConversation"> | Date | string
    instanceId?: StringFilter<"DailyConversation"> | string
    jid?: StringFilter<"DailyConversation"> | string
    createdAt?: DateTimeFilter<"DailyConversation"> | Date | string
  }

  export type DailyMetricUpsertWithWhereUniqueWithoutInstanceInput = {
    where: DailyMetricWhereUniqueInput
    update: XOR<DailyMetricUpdateWithoutInstanceInput, DailyMetricUncheckedUpdateWithoutInstanceInput>
    create: XOR<DailyMetricCreateWithoutInstanceInput, DailyMetricUncheckedCreateWithoutInstanceInput>
  }

  export type DailyMetricUpdateWithWhereUniqueWithoutInstanceInput = {
    where: DailyMetricWhereUniqueInput
    data: XOR<DailyMetricUpdateWithoutInstanceInput, DailyMetricUncheckedUpdateWithoutInstanceInput>
  }

  export type DailyMetricUpdateManyWithWhereWithoutInstanceInput = {
    where: DailyMetricScalarWhereInput
    data: XOR<DailyMetricUpdateManyMutationInput, DailyMetricUncheckedUpdateManyWithoutInstanceInput>
  }

  export type DailyMetricScalarWhereInput = {
    AND?: DailyMetricScalarWhereInput | DailyMetricScalarWhereInput[]
    OR?: DailyMetricScalarWhereInput[]
    NOT?: DailyMetricScalarWhereInput | DailyMetricScalarWhereInput[]
    id?: StringFilter<"DailyMetric"> | string
    date?: DateTimeFilter<"DailyMetric"> | Date | string
    instanceId?: StringFilter<"DailyMetric"> | string
    activeConversations?: IntFilter<"DailyMetric"> | number
    newContacts?: IntFilter<"DailyMetric"> | number
    messagesSent?: IntFilter<"DailyMetric"> | number
    messagesReceived?: IntFilter<"DailyMetric"> | number
    callsMade?: IntFilter<"DailyMetric"> | number
    callsReceived?: IntFilter<"DailyMetric"> | number
    callDuration?: IntFilter<"DailyMetric"> | number
    createdAt?: DateTimeFilter<"DailyMetric"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMetric"> | Date | string
  }

  export type DeviceUpsertWithoutEvolutionInstanceInput = {
    update: XOR<DeviceUpdateWithoutEvolutionInstanceInput, DeviceUncheckedUpdateWithoutEvolutionInstanceInput>
    create: XOR<DeviceCreateWithoutEvolutionInstanceInput, DeviceUncheckedCreateWithoutEvolutionInstanceInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutEvolutionInstanceInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutEvolutionInstanceInput, DeviceUncheckedUpdateWithoutEvolutionInstanceInput>
  }

  export type DeviceUpdateWithoutEvolutionInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CallLogUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutEvolutionInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calls?: CallLogUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type ProcessedMessageUpsertWithWhereUniqueWithoutInstanceInput = {
    where: ProcessedMessageWhereUniqueInput
    update: XOR<ProcessedMessageUpdateWithoutInstanceInput, ProcessedMessageUncheckedUpdateWithoutInstanceInput>
    create: XOR<ProcessedMessageCreateWithoutInstanceInput, ProcessedMessageUncheckedCreateWithoutInstanceInput>
  }

  export type ProcessedMessageUpdateWithWhereUniqueWithoutInstanceInput = {
    where: ProcessedMessageWhereUniqueInput
    data: XOR<ProcessedMessageUpdateWithoutInstanceInput, ProcessedMessageUncheckedUpdateWithoutInstanceInput>
  }

  export type ProcessedMessageUpdateManyWithWhereWithoutInstanceInput = {
    where: ProcessedMessageScalarWhereInput
    data: XOR<ProcessedMessageUpdateManyMutationInput, ProcessedMessageUncheckedUpdateManyWithoutInstanceInput>
  }

  export type ProcessedMessageScalarWhereInput = {
    AND?: ProcessedMessageScalarWhereInput | ProcessedMessageScalarWhereInput[]
    OR?: ProcessedMessageScalarWhereInput[]
    NOT?: ProcessedMessageScalarWhereInput | ProcessedMessageScalarWhereInput[]
    id?: StringFilter<"ProcessedMessage"> | string
    instanceId?: StringFilter<"ProcessedMessage"> | string
    messageId?: StringFilter<"ProcessedMessage"> | string
    jid?: StringFilter<"ProcessedMessage"> | string
    direction?: StringFilter<"ProcessedMessage"> | string
    timestamp?: DateTimeFilter<"ProcessedMessage"> | Date | string
    createdAt?: DateTimeFilter<"ProcessedMessage"> | Date | string
  }

  export type EvolutionInstanceCreateWithoutMetricsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationCreateNestedManyWithoutInstanceInput
    device?: DeviceCreateNestedOneWithoutEvolutionInstanceInput
    processedMessages?: ProcessedMessageCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateWithoutMetricsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationUncheckedCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceCreateOrConnectWithoutMetricsInput = {
    where: EvolutionInstanceWhereUniqueInput
    create: XOR<EvolutionInstanceCreateWithoutMetricsInput, EvolutionInstanceUncheckedCreateWithoutMetricsInput>
  }

  export type EvolutionInstanceUpsertWithoutMetricsInput = {
    update: XOR<EvolutionInstanceUpdateWithoutMetricsInput, EvolutionInstanceUncheckedUpdateWithoutMetricsInput>
    create: XOR<EvolutionInstanceCreateWithoutMetricsInput, EvolutionInstanceUncheckedCreateWithoutMetricsInput>
    where?: EvolutionInstanceWhereInput
  }

  export type EvolutionInstanceUpdateToOneWithWhereWithoutMetricsInput = {
    where?: EvolutionInstanceWhereInput
    data: XOR<EvolutionInstanceUpdateWithoutMetricsInput, EvolutionInstanceUncheckedUpdateWithoutMetricsInput>
  }

  export type EvolutionInstanceUpdateWithoutMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUpdateManyWithoutInstanceNestedInput
    device?: DeviceUpdateOneWithoutEvolutionInstanceNestedInput
    processedMessages?: ProcessedMessageUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateWithoutMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceCreateWithoutContactsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: DailyConversationCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricCreateNestedManyWithoutInstanceInput
    device?: DeviceCreateNestedOneWithoutEvolutionInstanceInput
    processedMessages?: ProcessedMessageCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateWithoutContactsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: DailyConversationUncheckedCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricUncheckedCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceCreateOrConnectWithoutContactsInput = {
    where: EvolutionInstanceWhereUniqueInput
    create: XOR<EvolutionInstanceCreateWithoutContactsInput, EvolutionInstanceUncheckedCreateWithoutContactsInput>
  }

  export type LeadCreateWithoutContactInput = {
    id?: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutContactInput = {
    id?: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutContactInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
  }

  export type EvolutionInstanceUpsertWithoutContactsInput = {
    update: XOR<EvolutionInstanceUpdateWithoutContactsInput, EvolutionInstanceUncheckedUpdateWithoutContactsInput>
    create: XOR<EvolutionInstanceCreateWithoutContactsInput, EvolutionInstanceUncheckedCreateWithoutContactsInput>
    where?: EvolutionInstanceWhereInput
  }

  export type EvolutionInstanceUpdateToOneWithWhereWithoutContactsInput = {
    where?: EvolutionInstanceWhereInput
    data: XOR<EvolutionInstanceUpdateWithoutContactsInput, EvolutionInstanceUncheckedUpdateWithoutContactsInput>
  }

  export type EvolutionInstanceUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: DailyConversationUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUpdateManyWithoutInstanceNestedInput
    device?: DeviceUpdateOneWithoutEvolutionInstanceNestedInput
    processedMessages?: ProcessedMessageUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type LeadUpsertWithoutContactInput = {
    update: XOR<LeadUpdateWithoutContactInput, LeadUncheckedUpdateWithoutContactInput>
    create: XOR<LeadCreateWithoutContactInput, LeadUncheckedCreateWithoutContactInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutContactInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutContactInput, LeadUncheckedUpdateWithoutContactInput>
  }

  export type LeadUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type ContactCreateWithoutLeadInput = {
    id?: string
    jid: string
    firstSeen?: Date | string
    instance: EvolutionInstanceCreateNestedOneWithoutContactsInput
  }

  export type ContactUncheckedCreateWithoutLeadInput = {
    id?: string
    instanceId: string
    jid: string
    firstSeen?: Date | string
  }

  export type ContactCreateOrConnectWithoutLeadInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
  }

  export type NoteCreateWithoutLeadInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type NoteUncheckedCreateWithoutLeadInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type NoteCreateOrConnectWithoutLeadInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput>
  }

  export type NoteCreateManyLeadInputEnvelope = {
    data: NoteCreateManyLeadInput | NoteCreateManyLeadInput[]
  }

  export type ContactUpsertWithoutLeadInput = {
    update: XOR<ContactUpdateWithoutLeadInput, ContactUncheckedUpdateWithoutLeadInput>
    create: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
    where?: ContactWhereInput
  }

  export type ContactUpdateToOneWithWhereWithoutLeadInput = {
    where?: ContactWhereInput
    data: XOR<ContactUpdateWithoutLeadInput, ContactUncheckedUpdateWithoutLeadInput>
  }

  export type ContactUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: EvolutionInstanceUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUpsertWithWhereUniqueWithoutLeadInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutLeadInput, NoteUncheckedUpdateWithoutLeadInput>
    create: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutLeadInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutLeadInput, NoteUncheckedUpdateWithoutLeadInput>
  }

  export type NoteUpdateManyWithWhereWithoutLeadInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutLeadInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    leadId?: StringFilter<"Note"> | string
    content?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
  }

  export type LeadCreateWithoutNotesInput = {
    id?: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    contact: ContactCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutNotesInput = {
    id?: string
    contactId: string
    status?: string
    score?: number
    contextSummary?: string | null
    lastInteraction?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadCreateOrConnectWithoutNotesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
  }

  export type LeadUpsertWithoutNotesInput = {
    update: XOR<LeadUpdateWithoutNotesInput, LeadUncheckedUpdateWithoutNotesInput>
    create: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutNotesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutNotesInput, LeadUncheckedUpdateWithoutNotesInput>
  }

  export type LeadUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contact?: ContactUpdateOneRequiredWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    contactId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    contextSummary?: NullableStringFieldUpdateOperationsInput | string | null
    lastInteraction?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvolutionInstanceCreateWithoutConversationsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricCreateNestedManyWithoutInstanceInput
    device?: DeviceCreateNestedOneWithoutEvolutionInstanceInput
    processedMessages?: ProcessedMessageCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateWithoutConversationsInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricUncheckedCreateNestedManyWithoutInstanceInput
    processedMessages?: ProcessedMessageUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceCreateOrConnectWithoutConversationsInput = {
    where: EvolutionInstanceWhereUniqueInput
    create: XOR<EvolutionInstanceCreateWithoutConversationsInput, EvolutionInstanceUncheckedCreateWithoutConversationsInput>
  }

  export type EvolutionInstanceUpsertWithoutConversationsInput = {
    update: XOR<EvolutionInstanceUpdateWithoutConversationsInput, EvolutionInstanceUncheckedUpdateWithoutConversationsInput>
    create: XOR<EvolutionInstanceCreateWithoutConversationsInput, EvolutionInstanceUncheckedCreateWithoutConversationsInput>
    where?: EvolutionInstanceWhereInput
  }

  export type EvolutionInstanceUpdateToOneWithWhereWithoutConversationsInput = {
    where?: EvolutionInstanceWhereInput
    data: XOR<EvolutionInstanceUpdateWithoutConversationsInput, EvolutionInstanceUncheckedUpdateWithoutConversationsInput>
  }

  export type EvolutionInstanceUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUpdateManyWithoutInstanceNestedInput
    device?: DeviceUpdateOneWithoutEvolutionInstanceNestedInput
    processedMessages?: ProcessedMessageUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput
    processedMessages?: ProcessedMessageUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type EvolutionInstanceCreateWithoutProcessedMessagesInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricCreateNestedManyWithoutInstanceInput
    device?: DeviceCreateNestedOneWithoutEvolutionInstanceInput
  }

  export type EvolutionInstanceUncheckedCreateWithoutProcessedMessagesInput = {
    id?: string
    name: string
    instanceId: string
    phoneNumber?: string | null
    apiKey?: string | null
    endpointUrl?: string | null
    webhookSecret?: string | null
    deviceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutInstanceInput
    conversations?: DailyConversationUncheckedCreateNestedManyWithoutInstanceInput
    metrics?: DailyMetricUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type EvolutionInstanceCreateOrConnectWithoutProcessedMessagesInput = {
    where: EvolutionInstanceWhereUniqueInput
    create: XOR<EvolutionInstanceCreateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedCreateWithoutProcessedMessagesInput>
  }

  export type EvolutionInstanceUpsertWithoutProcessedMessagesInput = {
    update: XOR<EvolutionInstanceUpdateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedUpdateWithoutProcessedMessagesInput>
    create: XOR<EvolutionInstanceCreateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedCreateWithoutProcessedMessagesInput>
    where?: EvolutionInstanceWhereInput
  }

  export type EvolutionInstanceUpdateToOneWithWhereWithoutProcessedMessagesInput = {
    where?: EvolutionInstanceWhereInput
    data: XOR<EvolutionInstanceUpdateWithoutProcessedMessagesInput, EvolutionInstanceUncheckedUpdateWithoutProcessedMessagesInput>
  }

  export type EvolutionInstanceUpdateWithoutProcessedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUpdateManyWithoutInstanceNestedInput
    device?: DeviceUpdateOneWithoutEvolutionInstanceNestedInput
  }

  export type EvolutionInstanceUncheckedUpdateWithoutProcessedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    endpointUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookSecret?: NullableStringFieldUpdateOperationsInput | string | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
    conversations?: DailyConversationUncheckedUpdateManyWithoutInstanceNestedInput
    metrics?: DailyMetricUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type CallLogCreateManyDeviceInput = {
    id?: string
    person: string
    duration: number
    type: string
    status: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type CallLogUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallLogUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    person?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInstanceInput = {
    id?: string
    jid: string
    firstSeen?: Date | string
  }

  export type DailyConversationCreateManyInstanceInput = {
    id?: string
    date: Date | string
    jid: string
    createdAt?: Date | string
  }

  export type DailyMetricCreateManyInstanceInput = {
    id?: string
    date: Date | string
    activeConversations?: number
    newContacts?: number
    messagesSent?: number
    messagesReceived?: number
    callsMade?: number
    callsReceived?: number
    callDuration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedMessageCreateManyInstanceInput = {
    id?: string
    messageId: string
    jid: string
    direction: string
    timestamp: Date | string
    createdAt?: Date | string
  }

  export type ContactUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUncheckedUpdateOneWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyConversationUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    jid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMetricUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    activeConversations?: IntFieldUpdateOperationsInput | number
    newContacts?: IntFieldUpdateOperationsInput | number
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    callsMade?: IntFieldUpdateOperationsInput | number
    callsReceived?: IntFieldUpdateOperationsInput | number
    callDuration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedMessageUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    jid?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyLeadInput = {
    id?: string
    content: string
    createdAt?: Date | string
  }

  export type NoteUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DeviceCountOutputTypeDefaultArgs instead
     */
    export type DeviceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EvolutionInstanceCountOutputTypeDefaultArgs instead
     */
    export type EvolutionInstanceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EvolutionInstanceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeadCountOutputTypeDefaultArgs instead
     */
    export type LeadCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceDefaultArgs instead
     */
    export type DeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CallLogDefaultArgs instead
     */
    export type CallLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CallLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EvolutionInstanceDefaultArgs instead
     */
    export type EvolutionInstanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EvolutionInstanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyMetricDefaultArgs instead
     */
    export type DailyMetricArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyMetricDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContactDefaultArgs instead
     */
    export type ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContactDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeadDefaultArgs instead
     */
    export type LeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeadDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NoteDefaultArgs instead
     */
    export type NoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DailyConversationDefaultArgs instead
     */
    export type DailyConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DailyConversationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProcessedMessageDefaultArgs instead
     */
    export type ProcessedMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProcessedMessageDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}