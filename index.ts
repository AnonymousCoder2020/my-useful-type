import { Dispatch, MutableRefObject, PropsWithoutRef, PropsWithRef, ReactChild, SetStateAction } from 'react'
import { DefaultTheme, FlattenInterpolation, FlattenSimpleInterpolation, ThemeProps } from 'styled-components'

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

export interface PlainAnyObject {
  [key: string]: any
}
