import * as React from "react"
import { Button } from "@/components/ui/button"

interface DropdownMenuProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DropdownMenu = ({ children, open, onOpenChange }: DropdownMenuProps) => {
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child, { onClick: () => onOpenChange(!open) })
          }
          if (child.type === DropdownMenuContent) {
            return open ? child : null
          }
        }
        return child
      })}
    </div>
  )
}

const DropdownMenuTrigger = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return React.cloneElement(children as React.ReactElement, { onClick })
}

const DropdownMenuContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}>{children}</div>
}

const DropdownMenuLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 py-2 text-sm font-medium text-gray-700">{children}</div>
}

const DropdownMenuSeparator = () => {
  return <hr className="my-1 border-gray-200" />
}

const DropdownMenuCheckboxItem = ({ children, checked, onCheckedChange }: { children: React.ReactNode, checked: boolean, onCheckedChange: (checked: boolean) => void }) => {
  return (
    <div className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" onClick={() => onCheckedChange(!checked)}>
      <input type="checkbox" className="mr-2" checked={checked} onChange={() => {}} />
      {children}
    </div>
  )
}

const DropdownMenuItem = ({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) => {
  return <div className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" onClick={onSelect}>{children}</div>
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
}