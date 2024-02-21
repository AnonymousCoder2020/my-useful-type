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
