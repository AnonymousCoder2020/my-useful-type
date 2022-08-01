import { Dispatch, MutableRefObject, PropsWithoutRef, PropsWithRef, ReactChild, SetStateAction } from 'react'
import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  StyledComponent,
  ThemedStyledProps,
  StyledComponentPropsWithRef,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentInnerAttrs,
} from 'styled-components'

export type ClassProps<C> = { [P in keyof C]: C[P] extends Function ? never : C[P] }
export type ClassPropsPartial<C> = Partial<ClassProps<C>>

export type TranslateText = Exclude<ReactChild, string>

export type HTMLProps<T extends keyof JSX.IntrinsicElements> = PropsWithRef<JSX.IntrinsicElements[T]>
export type HTMLPropsWithoutRef<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<JSX.IntrinsicElements[T]>

export type BookmarkNode = chrome.bookmarks.BookmarkTreeNode
export type BookmarkFolder = Omit<BookmarkNode, 'url'>
export type BookmarkLink = Omit<BookmarkNode & { url: string }, 'children'>

export type MutableRef<T extends HTMLElement> = MutableRefObject<T | null> | ((instance: T | null) => void) | null

export type InjectionStyle = string | FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>

export type UseStateReturnType<S> = [S, Dispatch<SetStateAction<S>>]

export type PartialPick<T extends object, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
export type PartialOmit<T extends object, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

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

export type AlsoPromise<T> = T | Promise<T>

export interface PlainObject<T> {
  [key: string]: T
}
export type PlainAnyObject = PlainObject<any>

export type SplitString<T extends string, S extends string> = T extends `${infer A}${S}${infer B}` ? [A, ...SplitString<B, S>] : [T]
export type SplitComma<T extends string> = SplitString<T, '.'>

export type AccessByPath<T extends PlainAnyObject, P extends string[]> = P extends [infer A, ...infer B]
  ? A extends keyof T
    ? B extends string[]
      ? AccessByPath<T[A], B>
      : T[A]
    : never
  : T
export type AccessByCommaPath<T extends PlainAnyObject, P extends string> = AccessByPath<T, SplitComma<P>>

export type Cast<X, Y> = X extends Y ? X : Y
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

export type BundleProps<K extends string, V> = { [P in K]: V }

export type AnyFunction = (...args: any[]) => any
export type IsAsyncFunction<F extends AnyFunction> = F extends (...args: unknown[]) => Promise<unknown> ? true : false

export type EmptyObject = { [key: string]: never }

export type ExtractValue<T extends PlainAnyObject, U> = {
  [P in keyof T]: Extract<T[P], U>
}

export type RemoveValues<T extends PlainAnyObject, U> = {
  [P in keyof T as Extract<T[P], U> extends never ? T[P] : never]: T[P]
}

export type StyledComponentProps<C extends StyledComponent<any, DefaultTheme, object>> = ThemedStyledProps<
  StyledComponentPropsWithRef<StyledComponentInnerComponent<C>> & StyledComponentInnerOtherProps<C>,
  DefaultTheme
>

export type StyledComponentExtendProps<C extends StyledComponent<any, DefaultTheme, object>, P extends object> = StyledComponent<
  StyledComponentInnerComponent<C>,
  DefaultTheme,
  StyledComponentInnerOtherProps<C> & P,
  StyledComponentInnerAttrs<C>
>

export type OrArray<T> = T | T[]

export type AlsoAsyncFunction<F extends AnyFunction> = (...args: Parameters<F>) => AlsoPromise<ReturnType<F>>

export namespace Svelte {
  export type Subscriber<T> = (value: T) => void
  export type Unsubscriber = () => void
  export type Invalidator<T> = (value?: T) => void
  export type Subscribe<T> = (run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber
}
