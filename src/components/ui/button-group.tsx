import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

interface ButtonGroupProps<T> {
    items: T[];
    selectedItem: T;
    onSelect: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
    className?: string;
}

export function ButtonGroup<T>({
    items,
    selectedItem,
    onSelect,
    renderItem,
    className,
}: ButtonGroupProps<T>) {
    return (
        <div
            className={twMerge(
                "flex flex-wrap w-full",
                "rounded-lg overflow-clip",
                className
            )}
        >
            {items.map((item, index) => {
                return (
                    <Button
                        key={index}
                        variant="default"
                        onClick={() => onSelect(item)}
                        className={twMerge(
                            clsx(
                                "flex-1 min-w-fit h-10 px-3 py-2 text-sm font-medium transition-colors",
                                "whitespace-nowrap",
                                "bg-gray-700 border-0",
                                "hover:bg-gray-600 hover:text-white",
                                "focus:outline-none focus:ring-none",
                                selectedItem === item
                                    ? "bg-white text-gray-900 hover:bg-gray-100"
                                    : "text-gray-300"
                            )
                        )}
                    >
                        {renderItem(item)}
                    </Button>
                );
            })}
        </div>
    );
}
