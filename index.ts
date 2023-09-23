import { Dispatch, MutableRefObject, PropsWithoutRef, PropsWithRef, ReactChild, SetStateAction } from 'react'
import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  StyledComponent,
  StyledComponentInnerAttrs,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentPropsWithRef,
  ThemedStyledProps,
  ThemeProps
} from 'styled-components'
import type { Bookmarks } from 'webextension-polyfill'

// util
export type OrPromise<T> = T | Promise<T>
export type OrArray<T> = T | T[]
export type SplitStr<T extends string, S extends string> = T extends `${infer A}${S}${infer B}` ? [A, ...SplitStr<B, S>] : [T]
export type SplitPeriod<T extends string> = SplitStr<T, '.'>
export type AccessByPath<T extends PlainAnyObj, P extends string[]> = P extends [infer A, ...infer B]
  ? A extends keyof T
    ? B extends string[]
      ? AccessByPath<T[A], B>
      : T[A]
    : never
  : T
export type AccessByPeriodPath<T extends PlainAnyObj, P extends string> = AccessByPath<T, SplitPeriod<P>>
export type Cast<X, Y> = X extends Y ? X : Y
export type ArrEl<A> = A extends readonly (infer T)[] ? T : never

// obj
export interface PlainObj<T> {
  [key: string]: T
}
export type PlainAnyObj = PlainObj<any>
export type EmptyObj = { [key: string]: never }
export type PartialPick<T extends object, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
export type PartialOmit<T extends object, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>
export type ExtractVal<T extends PlainAnyObj, U> = {
  [P in keyof T]: Extract<T[P], U>
}
export type RemoveVals<T extends PlainAnyObj, U> = {
  [P in keyof T as Extract<T[P], U> extends never ? T[P] : never]: T[P]
}
export type MapProps<K extends string, V> = { [P in K]: V }

// function
export type AnyFunc = (...args: any[]) => any
export type IsAsyncFunc<F extends AnyFunc> = F extends (...args: unknown[]) => Promise<unknown> ? true : false
export type AlsoAsyncFunc<F extends AnyFunc> = (...args: Parameters<F>) => OrPromise<ReturnType<F>>

// class
export type ClassProps<C> = { [P in keyof C]: C[P] extends Function ? never : C[P] }
export type ClassPropsPartial<C> = Partial<ClassProps<C>>

// webextension-polyfill
export type BookmarkNode = Bookmarks.BookmarkTreeNode
export type BookmarkDir = Omit<BookmarkNode, 'url'>
export type BookmarkLink = Omit<BookmarkNode & { url: string }, 'children'>

// React
export type TranslateTxt = Exclude<ReactChild, string>
export type HTMLProps<T extends keyof JSX.IntrinsicElements> = PropsWithRef<JSX.IntrinsicElements[T]>
export type HTMLPropsWithoutRef<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<JSX.IntrinsicElements[T]>
export type MutableRef<T extends HTMLElement> = MutableRefObject<T | null> | ((instance: T | null) => void) | null
export type UseStateReturnType<S> = [S, Dispatch<SetStateAction<S>>]

// styled components
export type InjectStyle = string | FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>
export type StyledCompProps<C extends StyledComponent<any, DefaultTheme, object>> = ThemedStyledProps<
  StyledComponentPropsWithRef<StyledComponentInnerComponent<C>> & StyledComponentInnerOtherProps<C>,
  DefaultTheme
>
export type StyledCompExtendProps<C extends StyledComponent<any, DefaultTheme, object>, P extends object> = StyledComponent<
  StyledComponentInnerComponent<C>,
  DefaultTheme,
  StyledComponentInnerOtherProps<C> & P,
  StyledComponentInnerAttrs<C>
>

// sortable
interface SortableCustomEventType {
  from: HTMLElement
  to: HTMLElement
  item: HTMLElement
}
interface MandatorySortableCustomEventType {
  newIndex: number
  oldIndex: number
}
export type SortableCustomEvent<T extends Partial<SortableCustomEventType>> = T & MandatorySortableCustomEventType

// svelte
export namespace Svelte {
  export type Subscriber<T> = (value: T) => void
  export type Unsubscriber = () => void
  export type Invalidator<T> = (value?: T) => void
  export type Subscribe<T> = (run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber
}
