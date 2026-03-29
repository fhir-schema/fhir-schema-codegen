/**
 * AST builders for type-safe TypeScript code generation
 *
 * This module provides a clean, composable API for generating TypeScript code
 * without manual string concatenation. All builders are type-safe and produce
 * valid TypeScript code.
 *
 * @example
 * ```typescript
 * import { Project } from 'ts-morph';
 * import { Decl, Type, Expr, Stmt } from './ast';
 *
 * const project = new Project();
 * const sourceFile = project.createSourceFile('example.ts');
 *
 * // Add import
 * Decl.import(sourceFile, './types', ['Patient', 'Observation']);
 *
 * // Add interface
 * Decl.interface(sourceFile, {
 *   name: 'ContactPoint',
 *   extends: ['Element'],
 *   properties: [
 *     { name: 'system', type: Type.union([
 *       Type.stringLiteral('phone'),
 *       Type.stringLiteral('email')
 *     ]), optional: true },
 *     { name: 'value', type: 'string', optional: true },
 *   ]
 * });
 *
 * // Add function
 * Decl.arrowFunction(sourceFile, 'attachProfile', {
 *   parameters: [
 *     { name: 'resource', type: 'Patient' },
 *     { name: 'profile', type: 'ProfileData' }
 *   ],
 *   returnType: 'Patient',
 *   body: [
 *     Stmt.return(Expr.object({
 *       ...Expr.spread('resource'),
 *       meta: Expr.object({
 *         profile: Expr.array([Expr.string('http://example.com/profile')])
 *       })
 *     }))
 *   ]
 * });
 *
 * sourceFile.saveSync();
 * ```
 */

export { Expr, type Expression, type SpreadExpression } from './expressions';
export { Type, type TypeNode, CommonTypes } from './types';
export { Stmt, type StatementWriter } from './statements';
export {
    Decl,
    type PropertyConfig,
    type ParameterConfig,
} from './declarations';
