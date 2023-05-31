import { Schema } from "./types";

export function isObject(thing: any) {
  return typeof thing === "object" && thing !== null && !Array.isArray(thing);
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key);
}


// function resolveSchema(schema: any, data: any = {}) {}
export function resolveSchema(schema: Schema, rootSchema = {}, formData = {}) {
  if (hasOwnProperty(schema, '$ref')) {
    // return resolveReference(schema, rootSchema, formData)
  } else if (hasOwnProperty(schema, 'dependencies')) {
    // const resolvedSchema = resolveDependencies(schema, rootSchema, formData)
    // return retrieveSchema(resolvedSchema, rootSchema, formData)
  } else if (hasOwnProperty(schema, 'allOf') && Array.isArray(schema.allOf)) {
    // return {
    //   ...schema,
    //   allOf: schema.allOf.map((allOfSubschema) =>
    //     retrieveSchema(allOfSubschema, rootSchema, formData),
    //   ),
    // }
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema
  }
}

export function retrieveSchema(
  schema: any,
  rootSchema = {},
  formData: any = {}
): Schema {
  if (!isObject(schema)) {
    return {} as Schema;
  }
  let resolvedSchema = resolveSchema(schema, rootSchema, formData);

  // TODO: allOf and additionalProperties not implemented
  if ("allOf" in schema) {
    // try {
    //   resolvedSchema = mergeAllOf({
    //     // TODO: Schema type not suitable
    //     ...resolvedSchema,
    //     allOf: resolvedSchema.allOf,
    //   } as any) as Schema;
    // } catch (e) {
    //   console.warn("could not merge subschemas in allOf:\n" + e);
    //   const { allOf, ...resolvedSchemaWithoutAllOf } = resolvedSchema;
    //   return resolvedSchemaWithoutAllOf;
    // }
  }
  const hasAdditionalProperties =
    resolvedSchema?.hasOwnProperty("additionalProperties") &&
    resolvedSchema?.additionalProperties !== false;
  if (hasAdditionalProperties) {
    // put formData existing additional properties into schema
    // return stubExistingAdditionalProperties(
    //   resolvedSchema,
    //   rootSchema,
    //   formData
    // );
  }
  return resolvedSchema || {};
}

