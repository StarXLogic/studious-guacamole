import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 本地存储工具函数
export function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getFromLocalStorage(key: string) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
